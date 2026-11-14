import { describe, expect, it } from "vitest";
import { printf as printfNotes } from "../data/notes/printf";
import { javaDoubleToString, parseArgs, printfOutput, runPrintf } from "./javaPrintf";
import { parsePrompt, parseTable } from "./parsePrompt";

function shown(format: string, args: string): string {
  const result = runPrintf(format, args);
  if (result.kind === "output") return `OUT ${printfOutput(result).replace(/\n/g, "\\n")}`;
  if (result.kind === "exception") return `EXC ${result.exception}: ${result.message}`;
  return `${result.kind.toUpperCase()} ${result.message}`;
}

// Each row is [format string, arguments, what Java 25 printed or threw]. The answers
// were produced by running String.format with the same arguments in Java. %n prints
// \r\n on Windows and \n elsewhere; both are written \n here.
const JAVA_ANSWERS: [string, string, string][] = [
    ["%d", "42", "OUT 42"],
    ["%5d", "42", "OUT    42"],
    ["%-5d", "42", "OUT 42   "],
    ["%05d", "42", "OUT 00042"],
    ["%05d", "-1234567", "OUT -1234567"],
    ["%,d", "-1234567", "OUT -1,234,567"],
    ["%,12d", "-1234567", "OUT   -1,234,567"],
    ["%,08d", "1234", "OUT 0001,234"],
    ["%,010d", "-1234", "OUT -00001,234"],
    ["%1d", "-1234567", "OUT -1234567"],
    ["%f", "3.14159", "OUT 3.141590"],
    ["%.2f", "3.14159", "OUT 3.14"],
    ["%.2f", "2.675", "OUT 2.68"],
    ["%.2f", "1.005", "OUT 1.01"],
    ["%.2f", "0.125", "OUT 0.13"],
    ["%.2f", "-0.001", "OUT -0.00"],
    ["%.0f", "0.5", "OUT 1"],
    ["%.0f", "2.5", "OUT 3"],
    ["%.0f", "-2.5", "OUT -3"],
    ["%.2f", "999.995", "OUT 1000.00"],
    ["%12.2f", "-1234567.891", "OUT  -1234567.89"],
    ["%,.2f", "1234567.891", "OUT 1,234,567.89"],
    ["%-12.2f", "3.14159", "OUT 3.14        "],
    ["%012.2f", "3.14159", "OUT 000000003.14"],
    ["%08.2f", "-3.14159", "OUT -0003.14"],
    ["%f", "1e-5", "OUT 0.000010"],
    ["%.5f", "0.0000000005", "OUT 0.00000"],
    ["%.2f", "123456789012345.0", "OUT 123456789012345.00"],
    ["%f", "-0.0", "OUT -0.000000"],
    ["%.2f", ".5", "OUT 0.50"],
    ["%.0f", "5.", "OUT 5"],
    ["%.5f", "9.9999995", "OUT 10.00000"],
    ["%.20f", "0.1", "OUT 0.10000000000000000000"],
    ["%s", "\"Bob\"", "OUT Bob"],
    ["%-12s", "\"Bob\"", "OUT Bob         "],
    ["%12s", "\"Bob\"", "OUT          Bob"],
    ["%.2s", "\"Hello, World\"", "OUT He"],
    ["%5.2s", "\"Hello, World\"", "OUT    He"],
    ["%s", "3.14159", "OUT 3.14159"],
    ["%s", "100.0", "OUT 100.0"],
    ["%s", "12345678.9", "OUT 1.23456789E7"],
    ["%s", "1e-5", "OUT 1.0E-5"],
    ["%s", "0.0001", "OUT 1.0E-4"],
    ["%s", "-0.0", "OUT -0.0"],
    ["%s", "true", "OUT true"],
    ["%s", "'x'", "OUT x"],
    ["%s", "42", "OUT 42"],
    ["%1s", "\"Bob\"", "OUT Bob"],
    ["%c", "'x'", "OUT x"],
    ["%5c", "'x'", "OUT     x"],
    ["%c", "65", "OUT A"],
    ["%d", "3.14159", "EXC IllegalFormatConversionException: d != java.lang.Double"],
    ["%f", "42", "EXC IllegalFormatConversionException: f != java.lang.Integer"],
    ["%d", "\"Bob\"", "EXC IllegalFormatConversionException: d != java.lang.String"],
    ["%d", "'x'", "EXC IllegalFormatConversionException: d != java.lang.Character"],
    ["%d", "true", "EXC IllegalFormatConversionException: d != java.lang.Boolean"],
    ["%f", "\"Bob\"", "EXC IllegalFormatConversionException: f != java.lang.String"],
    ["%c", "\"Bob\"", "EXC IllegalFormatConversionException: c != java.lang.String"],
    ["%c", "3.14159", "EXC IllegalFormatConversionException: c != java.lang.Double"],
    ["%c", "true", "EXC IllegalFormatConversionException: c != java.lang.Boolean"],
    ["%.2d", "42", "EXC IllegalFormatPrecisionException: 2"],
    ["%-d", "42", "EXC MissingFormatWidthException: %-d"],
    ["%0d", "42", "EXC MissingFormatWidthException: %0d"],
    ["%-05d", "42", "EXC IllegalFormatFlagsException: Flags = '-0'"],
    ["%0-5d", "42", "EXC IllegalFormatFlagsException: Flags = '-0'"],
    ["%-.2d", "42", "EXC MissingFormatWidthException: %-.2d"],
    ["%-05.2d", "42", "EXC IllegalFormatFlagsException: Flags = '-0'"],
    ["%05s", "\"Bob\"", "EXC FormatFlagsConversionMismatchException: Conversion = s, Flags = 0"],
    ["%,s", "\"Bob\"", "EXC FormatFlagsConversionMismatchException: Conversion = s, Flags = ,"],
    ["%0,5s", "\"Bob\"", "EXC FormatFlagsConversionMismatchException: Conversion = s, Flags = 0,"],
    ["%-s", "\"Bob\"", "EXC MissingFormatWidthException: %-s"],
    ["%0-s", "\"Bob\"", "EXC MissingFormatWidthException: %-0s"],
    ["%.2c", "'x'", "EXC IllegalFormatPrecisionException: 2"],
    ["%-0c", "'x'", "EXC FormatFlagsConversionMismatchException: Conversion = c, Flags = 0"],
    ["%-c", "'x'", "EXC MissingFormatWidthException: %-c"],
    ["%--5d", "42", "EXC DuplicateFormatFlagsException: Flags = '-'"],
    ["%00d", "42", "EXC DuplicateFormatFlagsException: Flags = '0'"],
    ["%", "", "EXC UnknownFormatConversionException: Conversion = '%'"],
    ["abc%", "", "EXC UnknownFormatConversionException: Conversion = '%'"],
    ["%5", "1", "EXC UnknownFormatConversionException: Conversion = '5'"],
    ["%-", "1", "EXC UnknownFormatConversionException: Conversion = '-'"],
    ["%.2", "1.0", "EXC UnknownFormatConversionException: Conversion = '.'"],
    ["%!", "", "EXC UnknownFormatConversionException: Conversion = '!'"],
    ["%q", "1", "EXC UnknownFormatConversionException: Conversion = 'q'"],
    ["%i", "1", "EXC UnknownFormatConversionException: Conversion = 'i'"],
    ["%%", "", "OUT %"],
    ["100%%", "", "OUT 100%"],
    ["%d%%", "50", "OUT 50%"],
    ["%d %d", "1", "EXC MissingFormatArgumentException: Format specifier '%d'"],
    ["%s %s %s", "\"a\", \"b\"", "EXC MissingFormatArgumentException: Format specifier '%s'"],
    ["%d", "", "EXC MissingFormatArgumentException: Format specifier '%d'"],
    ["%d", "1, 2, 3", "OUT 1"],
    ["|%10.2f|%-10s|", "-3.5, \"hi\"", "OUT |     -3.50|hi        |"],
    ["%s and %s", "true, 'c'", "OUT true and c"],
    ["%c%c%c", "'J', 97, 'v'", "OUT Jav"],
    ["Name: %s, Age: %d, GPA: %.2f", "\"Ana\", 19, 3.456", "OUT Name: Ana, Age: 19, GPA: 3.46"],
    ["Total: %d items%n", "5", "OUT Total: 5 items\\n"],
    ["%-15s%8.2f%n", "\"Bob\", 3.14159", "OUT Bob                3.14\\n"],
];

describe("runPrintf", () => {
  it("prints exactly what Java prints, and throws what Java throws", () => {
    for (const [format, args, expected] of JAVA_ANSWERS) {
      expect(shown(format, args), `printf("${format}", ${args})`).toBe(expected);
    }
  });

  it("explains each specifier", () => {
    const result = runPrintf("%-15s%8.2f%n", "\"Bob\", 3.14159");
    if (result.kind !== "output") throw new Error(result.kind);
    const specs = result.segments.flatMap(segment => (segment.kind === "spec" ? [segment] : []));
    expect(specs.map(spec => spec.output)).toEqual(["Bob            ", "    3.14", "\n"]);
    expect(specs[0].explanation).toContain("12 spaces are added on the right");
    expect(specs[1].explanation).toContain("3.14159 becomes 3.14, rounding half up");
    expect(specs[1].explanation).toContain("4 spaces are added on the left");
  });

  it("says when a width is too small to matter", () => {
    const result = runPrintf("%3d", "12345");
    if (result.kind !== "output" || result.segments[0].kind !== "spec") throw new Error("expected output");
    expect(result.segments[0].explanation).toContain("A width never cuts anything off");
  });

  it("knows what System.out.printf prints before it throws, as Java does", () => {
    expect(runPrintf("x=%d %d!", "1, 2.5")).toMatchObject({ kind: "exception", printedBefore: "x=1 " });
    expect(runPrintf("a %d b %d c", "1")).toMatchObject({ kind: "exception", printedBefore: "a 1 b " });
    expect(runPrintf("abc %-d", "1")).toMatchObject({ kind: "exception", printedBefore: "" });
    expect(runPrintf("start %s %05s", "1, 2")).toMatchObject({ kind: "exception", printedBefore: "" });
  });

  it("counts arguments left over", () => {
    const result = runPrintf("%d", "1, 2, 3");
    expect(result.kind === "output" && result.extraArgs).toBe(2);
  });

  it("reads escapes in the format string", () => {
    expect(shown("a\\nb", "")).toBe("OUT a\\nb");
    expect(shown("say \\\"hi\\\"", "")).toBe("OUT say \"hi\"");
    expect(runPrintf("tab\\t", "")).toMatchObject({ kind: "error" });
  });

  it("says what it does not cover instead of guessing", () => {
    for (const format of ["%x", "%e", "%b", "%S", "%+d", "%1$d", "%5n", "%tY"]) {
      expect(runPrintf(format, "1").kind, format).toBe("unsupported");
    }
  });

  it("rejects arguments it cannot read", () => {
    expect(runPrintf("%d", "010")).toMatchObject({ kind: "error" });
    expect(runPrintf("%f", "3.5f")).toMatchObject({ kind: "error" });
    expect(runPrintf("%f", "1.2345678901234567")).toMatchObject({ kind: "error" });
    expect(runPrintf("%s", "\"unclosed")).toMatchObject({ kind: "error" });
    expect(runPrintf("%s", "hello")).toMatchObject({ kind: "error" });
  });
});

describe("parseArgs", () => {
  it("splits on commas outside quotes", () => {
    const parsed = parseArgs("\"a, b\", ',', 3, 2.5, true");
    expect("args" in parsed && parsed.args.map(arg => arg.type)).toEqual(["String", "char", "int", "double", "boolean"]);
  });
});

describe("javaDoubleToString", () => {
  it("switches to scientific notation outside 0.001 to 10,000,000", () => {
    const value = (text: string) => {
      const parsed = parseArgs(text);
      if ("error" in parsed || parsed.args[0].type !== "double") throw new Error(text);
      return javaDoubleToString(parsed.args[0]);
    };
    expect(value("0.001")).toBe("0.001");
    expect(value("0.0001")).toBe("1.0E-4");
    expect(value("9999999.0")).toBe("9999999.0");
    expect(value("10000000.0")).toBe("1.0E7");
    expect(value("-0.0")).toBe("-0.0");
  });
});

// The printf guide's Format | Value | Output tables were checked in Java. The
// playground must print the same thing for every row, with spaces drawn as dots.
describe("printf guide", () => {
  it("matches the playground for every row of its format tables", () => {
    const text = printfNotes.entries.flatMap(entry => entry.sections.map(section => section.content)).join("\n");
    const rows = parsePrompt(text)
      .filter(segment => segment.type === "table")
      .map(segment => parseTable(segment.content))
      .filter(table => table[0][0] === "Format")
      .flatMap(table => table.slice(1));
    expect(rows.length).toBe(15);
    for (const [format, value, expected] of rows) {
      const result = runPrintf(format, value);
      if (result.kind !== "output") throw new Error(`${format} with ${value}: ${result.kind}`);
      expect(printfOutput(result).replace(/ /g, "·"), `${format} with ${value}`).toBe(expected);
    }
  });
});
