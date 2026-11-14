// Formats a printf call the way Java does, for the parts of printf the course uses:
// %d, %f, %s, %c, %n, and %%, with a width, a precision, and the - 0 , flags.
// Anything outside that is reported as not covered rather than guessed at.
// Numbers are kept to 15 significant digits so every double is exactly the
// decimal that was typed, which lets %f round digit by digit the way Java does.

import { checkStringText, parseJavaIntArg } from "./stringMethods";

export type JavaArg =
  | { type: "int"; literal: string; value: number }
  // the value is digits × 10^exponent; digits has no leading or trailing zeros ("0" for zero)
  | { type: "double"; literal: string; negative: boolean; digits: string; exponent: number }
  | { type: "String"; literal: string; value: string }
  | { type: "char"; literal: string; value: string }
  | { type: "boolean"; literal: string; value: boolean };

export type FormatSpec = {
  raw: string;
  flags: string;
  width: number | null;
  precision: number | null;
  conversion: string;
};

export type PrintfSegment =
  | { kind: "text"; text: string }
  // argument is the literal that was typed, or null for %n and %%
  | { kind: "spec"; spec: FormatSpec; output: string; argument: string | null; explanation: string };

export type PrintfResult =
  | { kind: "output"; segments: PrintfSegment[]; extraArgs: number }
  // printedBefore is what System.out.printf has already printed when it throws:
  // nothing for a bad format string, everything before the specifier for a bad argument
  | { kind: "exception"; exception: string; message: string; explanation: string; printedBefore: string }
  | { kind: "unsupported"; message: string }
  | { kind: "error"; message: string };

const JAVA_CLASS: Record<JavaArg["type"], string> = {
  int: "java.lang.Integer",
  double: "java.lang.Double",
  String: "java.lang.String",
  char: "java.lang.Character",
  boolean: "java.lang.Boolean",
};

// The conversions Java knows. Anything else after % is an unknown conversion.
const JAVA_CONVERSIONS = "bBhHsScCdoxXeEfgGaAtTn%";
const SUPPORTED_CONVERSIONS = "dfscn%";
const SPEC_PATTERN = /%(\d+\$)?([-#+ 0,(<]*)?(\d+)?(\.\d+)?([tT])?([a-zA-Z%])/y;
const FLAG_ORDER = "-#+ 0,(<";
const MAX_SIGNIFICANT = 15;
const MAX_WIDTH = 60;
const MAX_PRECISION = 20;

const COVERED = "This playground covers %d, %f, %s, %c, %n, and %%, with a width, a precision, and the - 0 , flags.";

function exception(name: string, message: string, explanation: string, printedBefore = ""): PrintfResult {
  return { kind: "exception", exception: name, message, explanation, printedBefore };
}

function plural(count: number, word: string): string {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}

const MAX_FORMAT_LENGTH = 80;

export function parseFormatLiteral(text: string): { format: string } | { error: string } {
  if (text.length > MAX_FORMAT_LENGTH) return { error: `Keep the format string to ${MAX_FORMAT_LENGTH} characters or fewer.` };
  if (/[^\x20-\x7E]/.test(text)) return { error: "Use only the letters, digits, spaces, and symbols on a US keyboard in the format string." };
  let format = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === "\"") return { error: "A quote inside the format string ends it early. Write \\\" for a quote." };
    if (ch !== "\\") {
      format += ch;
      continue;
    }
    const next = text[i + 1];
    if (next === "n") format += "\n";
    else if (next === "\\") format += "\\";
    else if (next === "\"") format += "\"";
    else return { error: "This playground understands the escapes \\n, \\\", and \\\\ in the format string." };
    i++;
  }
  return { format };
}

function parseDouble(literal: string, body: string): JavaArg | { error: string } {
  const match = /^(-?)(\d*)(?:\.(\d*))?(?:[eE]([+-]?\d+))?$/.exec(body);
  if (!match || (match[2] === "" && (match[3] ?? "") === "")) return { error: `${literal} is not a number Java can read.` };
  const negative = match[1] === "-";
  const intPart = match[2];
  const fracPart = match[3] ?? "";
  let digits = (intPart + fracPart).replace(/^0+/, "");
  let exponent = Number(match[4] ?? "0") - fracPart.length;
  if (digits === "") return { type: "double", literal, negative, digits: "0", exponent: 0 };
  const trailing = digits.length - digits.replace(/0+$/, "").length;
  digits = digits.slice(0, digits.length - trailing);
  exponent += trailing;
  if (digits.length > MAX_SIGNIFICANT) return { error: `Keep doubles to ${MAX_SIGNIFICANT} significant digits here; ${literal} has ${digits.length}.` };
  const magnitude = digits.length + exponent;
  if (magnitude > 15 || magnitude < -9) return { error: `Keep doubles between 0.0000000001 and 1,000,000,000,000,000 here.` };
  return { type: "double", literal, negative, digits, exponent };
}

function parseArg(literal: string): JavaArg | { error: string } {
  if (literal === "") return { error: "There is an empty argument between two commas." };
  if (literal.startsWith("\"")) {
    const match = /^"([^"\\]*)"$/.exec(literal);
    if (!match) return { error: `${literal} is not a simple string. Put text in double quotes, without \\ or quotes inside.` };
    const problem = checkStringText(match[1], "a string argument");
    if (problem) return { error: problem };
    return { type: "String", literal, value: match[1] };
  }
  if (literal.startsWith("'")) {
    const match = /^'([^'\\])'$/.exec(literal);
    if (!match) return { error: `${literal} is not a simple char. Put one character in single quotes, such as 'A'.` };
    const problem = checkStringText(match[1], "a char argument");
    if (problem) return { error: problem };
    return { type: "char", literal, value: match[1] };
  }
  if (literal === "true" || literal === "false") return { type: "boolean", literal, value: literal === "true" };
  if (/^-?\d+$/.test(literal)) {
    const parsed = parseJavaIntArg(literal);
    if ("error" in parsed) return { error: `${literal}: ${parsed.error}` };
    return { type: "int", literal, value: parsed.value };
  }
  if (/^-?[\d.]+(?:[eE][+-]?\d+)?[dDfFlL]$/.test(literal)) {
    return { error: `Leave off the letter at the end of ${literal}. This playground reads 3.5 as a double and 7 as an int.` };
  }
  if (/^-?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(literal)) return parseDouble(literal, literal);
  return { error: `Cannot read ${literal}. Write a whole number such as 42, a double such as 3.5, text in double quotes, a char in single quotes, or true or false.` };
}

// Splits the arguments on commas outside quotes.
export function parseArgs(text: string): { args: JavaArg[] } | { error: string } {
  if (text.trim() === "") return { args: [] };
  const pieces: string[] = [];
  let current = "";
  let quote: string | null = null;
  for (const ch of text) {
    if (quote) {
      current += ch;
      if (ch === quote) quote = null;
    } else if (ch === "\"" || ch === "'") {
      quote = ch;
      current += ch;
    } else if (ch === ",") {
      pieces.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  if (quote) return { error: `A ${quote === "\"" ? "string" : "char"} argument is missing its closing quote.` };
  pieces.push(current.trim());

  const args: JavaArg[] = [];
  for (const piece of pieces) {
    const arg = parseArg(piece);
    if ("error" in arg) return arg;
    args.push(arg);
  }
  return { args };
}

// Double.toString: plain decimals from 0.001 up to 10,000,000, scientific notation outside that.
export function javaDoubleToString(arg: Extract<JavaArg, { type: "double" }>): string {
  const sign = arg.negative ? "-" : "";
  if (arg.digits === "0") return `${sign}0.0`;
  const { digits } = arg;
  const point = digits.length + arg.exponent;
  if (point >= -2 && point <= 7) {
    if (point <= 0) return `${sign}0.${"0".repeat(-point)}${digits}`;
    if (point < digits.length) return `${sign}${digits.slice(0, point)}.${digits.slice(point)}`;
    return `${sign}${digits}${"0".repeat(point - digits.length)}.0`;
  }
  const mantissa = digits.length === 1 ? `${digits}.0` : `${digits[0]}.${digits.slice(1)}`;
  return `${sign}${mantissa}E${point - 1}`;
}

function javaToString(arg: JavaArg): string {
  switch (arg.type) {
    case "int": return String(arg.value);
    case "double": return javaDoubleToString(arg);
    case "String": return arg.value;
    case "char": return arg.value;
    case "boolean": return String(arg.value);
  }
}

function group(intDigits: string): string {
  return intDigits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Rounds digits × 10^exponent to `places` decimal places, half up, and returns the
// integer and fraction digits.
function roundHalfUp(digits: string, exponent: number, places: number): { int: string; frac: string } {
  const shift = exponent + places;
  let scaled: bigint;
  if (shift >= 0) {
    scaled = BigInt(digits + "0".repeat(shift));
  } else {
    const drop = -shift;
    const keep = digits.length > drop ? digits.slice(0, digits.length - drop) : "0";
    const firstDropped = digits.length >= drop ? digits[digits.length - drop] : "0";
    scaled = BigInt(keep) + (firstDropped >= "5" ? 1n : 0n);
  }
  const text = scaled.toString().padStart(places + 1, "0");
  return places === 0
    ? { int: text, frac: "" }
    : { int: text.slice(0, text.length - places), frac: text.slice(text.length - places) };
}

function pad(body: string, sign: string, spec: FormatSpec): string {
  const length = sign.length + body.length;
  if (spec.width === null || length >= spec.width) return sign + body;
  const fill = spec.width - length;
  if (spec.flags.includes("-")) return sign + body + " ".repeat(fill);
  if (spec.flags.includes("0")) return sign + "0".repeat(fill) + body;
  return " ".repeat(fill) + sign + body;
}

function describePadding(spec: FormatSpec, length: number, what: string): string {
  if (spec.width === null) return "";
  if (length >= spec.width) {
    return ` The width is ${spec.width}, but ${what} already takes ${plural(length, "character")}, so nothing is added. A width never cuts anything off.`;
  }
  const fill = spec.width - length;
  if (spec.flags.includes("-")) return ` The - flag left-aligns it: ${plural(fill, "space")} ${fill === 1 ? "is" : "are"} added on the right to fill a width of ${spec.width}.`;
  if (spec.flags.includes("0")) return ` The 0 flag fills with zeros: ${plural(fill, "zero")} ${fill === 1 ? "is" : "are"} added after any minus sign to fill a width of ${spec.width}.`;
  return ` ${plural(fill, "space")} ${fill === 1 ? "is" : "are"} added on the left to fill a width of ${spec.width}, so it lines up on the right.`;
}

function formatOne(spec: FormatSpec, arg: JavaArg): { output: string; explanation: string } {
  switch (spec.conversion) {
    case "d": {
      const value = (arg as Extract<JavaArg, { type: "int" }>).value;
      const sign = value < 0 ? "-" : "";
      const plain = String(Math.abs(value));
      const body = spec.flags.includes(",") ? group(plain) : plain;
      const output = pad(body, sign, spec);
      const commas = spec.flags.includes(",") && body !== plain ? " The , flag puts a comma every three digits." : "";
      return { output, explanation: `%d prints the int ${value}.${commas}${describePadding(spec, sign.length + body.length, "the number")}` };
    }

    case "f": {
      const double = arg as Extract<JavaArg, { type: "double" }>;
      const places = spec.precision ?? 6;
      const rounded = roundHalfUp(double.digits, double.exponent, places);
      const intPart = spec.flags.includes(",") ? group(rounded.int) : rounded.int;
      const body = places === 0 ? intPart : `${intPart}.${rounded.frac}`;
      const sign = double.negative ? "-" : "";
      const output = pad(body, sign, spec);
      const precision = spec.precision === null
        ? "With no precision, %f always shows 6 digits after the decimal point."
        : `The .${places} keeps ${plural(places, "digit")} after the decimal point.`;
      const exact = javaDoubleToString(double);
      const rounding = exact.includes("E") || body.replace(/,/g, "") === exact.replace(/^-/, "")
        ? ""
        : ` ${exact.replace(/^-/, "")} becomes ${body.replace(/,/g, "")}${spec.precision !== null && places < (exact.split(".")[1]?.length ?? 0) ? ", rounding half up" : ""}.`;
      const commas = spec.flags.includes(",") && intPart !== rounded.int ? " The , flag puts a comma every three digits." : "";
      return { output, explanation: `${precision}${rounding}${commas}${describePadding(spec, sign.length + body.length, "the number")}` };
    }

    case "s": {
      const full = javaToString(arg);
      const body = spec.precision === null ? full : full.slice(0, spec.precision);
      const output = pad(body, "", spec);
      const kind = arg.type === "String" ? "the text" : `the ${arg.type} as text, ${JSON.stringify(full)}`;
      const cut = spec.precision !== null && full.length > spec.precision
        ? ` The .${spec.precision} keeps only the first ${plural(spec.precision, "character")}.`
        : "";
      return { output, explanation: `%s prints ${kind}.${cut}${describePadding(spec, body.length, "it")}` };
    }

    case "c": {
      const ch = arg.type === "char" ? arg.value : String.fromCharCode((arg as Extract<JavaArg, { type: "int" }>).value);
      const output = pad(ch, "", spec);
      const from = arg.type === "int" ? ` The int ${arg.value} is the character code for ${JSON.stringify(ch)}.` : "";
      return { output, explanation: `%c prints one character.${from}${describePadding(spec, 1, "it")}` };
    }

    default:
      throw new Error(`unexpected conversion ${spec.conversion}`);
  }
}

function acceptsArg(conversion: string, arg: JavaArg): boolean {
  switch (conversion) {
    case "d": return arg.type === "int";
    case "f": return arg.type === "double";
    case "s": return true;
    case "c": return arg.type === "char" || arg.type === "int";
    default: return false;
  }
}

// The checks Java runs on each specifier before it formats anything, in the order
// Java runs them. Java's messages write the flags in its own fixed order.
function checkSpec(spec: FormatSpec): PrintfResult | null {
  const { flags, conversion: c } = spec;
  const ordered = (set: string) => FLAG_ORDER.split("").filter(f => set.includes(f)).join("");
  const flagText = ordered(flags);
  const canonical = `%${flagText}${spec.width ?? ""}${spec.precision === null ? "" : `.${spec.precision}`}${c}`;

  const missingWidth = () => exception(
    "MissingFormatWidthException",
    canonical,
    `The ${flags.includes("-") ? "-" : "0"} flag needs a width to fill, such as %${flags.includes("-") ? "-" : "0"}10${c}.`,
  );

  if (c === "d" || c === "f") {
    if (spec.width === null && (flags.includes("-") || flags.includes("0"))) return missingWidth();
    if (flags.includes("-") && flags.includes("0")) {
      return exception("IllegalFormatFlagsException", `Flags = '${flagText}'`, "The - flag pads with spaces on the right and the 0 flag pads with zeros on the left, so they cannot be used together.");
    }
    if (c === "d" && spec.precision !== null) {
      return exception("IllegalFormatPrecisionException", String(spec.precision), "%d prints whole numbers, so it cannot take a precision like .2. Use %f for decimals.");
    }
    return null;
  }

  const badFlags = ordered(flags.replace(/-/g, ""));
  const mismatch = () => exception(
    "FormatFlagsConversionMismatchException",
    `Conversion = ${c}, Flags = ${badFlags}`,
    `The ${badFlags.split("").join(" and ")} flag${badFlags.length > 1 ? "s only work" : " only works"} with numbers, not %${c}.`,
  );

  if (c === "c") {
    if (spec.precision !== null) {
      return exception("IllegalFormatPrecisionException", String(spec.precision), "%c prints a single character, so it cannot take a precision.");
    }
    if (badFlags) return mismatch();
    if (spec.width === null && flags.includes("-")) return missingWidth();
    return null;
  }

  // %s
  if (spec.width === null && flags.includes("-")) return missingWidth();
  if (badFlags) return mismatch();
  return null;
}

export function runPrintf(formatText: string, argsText: string): PrintfResult {
  const literal = parseFormatLiteral(formatText);
  if ("error" in literal) return { kind: "error", message: literal.error };
  const parsedArgs = parseArgs(argsText);
  if ("error" in parsedArgs) return { kind: "error", message: parsedArgs.error };
  const { format } = literal;
  const { args } = parsedArgs;

  // Java reads the whole format string, checking every specifier, before it prints anything.
  type Piece = { kind: "text"; text: string } | { kind: "spec"; spec: FormatSpec };
  const pieces: Piece[] = [];
  let text = "";
  let i = 0;
  while (i < format.length) {
    if (format[i] !== "%") {
      text += format[i];
      i++;
      continue;
    }
    SPEC_PATTERN.lastIndex = i;
    const match = SPEC_PATTERN.exec(format);
    if (!match) {
      const next = format[i + 1];
      const shown = next === undefined ? "%" : next;
      return exception("UnknownFormatConversionException", `Conversion = '${shown}'`, next === undefined
        ? "The format string ends with a % that has no conversion after it. Write %% to print a percent sign."
        : `% must be followed by a conversion such as d, f, or s. Write %% to print a percent sign.`);
    }
    const [raw, argIndex, flags = "", width, precision, time, conversion] = match;
    if (text) pieces.push({ kind: "text", text });
    text = "";
    i += raw.length;

    if (time) return { kind: "unsupported", message: `${raw} formats a date or time. ${COVERED}` };
    if (!JAVA_CONVERSIONS.includes(conversion)) {
      return exception("UnknownFormatConversionException", `Conversion = '${conversion}'`, `Java has no %${conversion} conversion. Use %d for an int, %f for a double, %s for text, and %c for a char.`);
    }
    if (argIndex || flags.includes("<")) return { kind: "unsupported", message: `${raw} picks its argument by position. ${COVERED}` };
    if (!SUPPORTED_CONVERSIONS.includes(conversion)) return { kind: "unsupported", message: `${raw} is not covered here. ${COVERED}` };
    const duplicate = flags.split("").find((f, k) => flags.indexOf(f) !== k);
    if (duplicate) return exception("DuplicateFormatFlagsException", `Flags = '${duplicate}'`, `The ${duplicate} flag appears twice in ${raw}.`);
    if (/[#+ (]/.test(flags)) return { kind: "unsupported", message: `${raw} uses a flag that is not covered here. ${COVERED}` };
    if ((conversion === "n" || conversion === "%") && raw.length > 2) {
      return { kind: "unsupported", message: `Write %${conversion} on its own, with no flags, width, or precision.` };
    }

    const spec: FormatSpec = {
      raw,
      flags,
      width: width ? Number(width) : null,
      precision: precision ? Number(precision.slice(1)) : null,
      conversion,
    };
    if ((spec.width ?? 0) > MAX_WIDTH) return { kind: "unsupported", message: `Keep widths to ${MAX_WIDTH} or less here.` };
    if ((spec.precision ?? 0) > MAX_PRECISION) return { kind: "unsupported", message: `Keep precisions to ${MAX_PRECISION} or less here.` };
    if (conversion !== "n" && conversion !== "%") {
      const problem = checkSpec(spec);
      if (problem) return problem;
    }
    pieces.push({ kind: "spec", spec });
  }
  if (text) pieces.push({ kind: "text", text });

  // Then it formats each specifier in order, taking the next argument each time.
  const segments: PrintfSegment[] = [];
  const printedSoFar = () => segments.map(segment => (segment.kind === "text" ? segment.text : segment.output)).join("");
  let next = 0;
  for (const piece of pieces) {
    if (piece.kind === "text") {
      segments.push(piece);
      continue;
    }
    const { spec } = piece;
    if (spec.conversion === "n") {
      segments.push({ kind: "spec", spec, output: "\n", argument: null, explanation: "%n ends the line, like \\n." });
      continue;
    }
    if (spec.conversion === "%") {
      segments.push({ kind: "spec", spec, output: "%", argument: null, explanation: "%% prints one percent sign." });
      continue;
    }
    const arg = args[next];
    if (!arg) {
      return exception("MissingFormatArgumentException", `Format specifier '${spec.raw}'`, `${spec.raw} needs an argument, but there ${next === 1 ? "is" : "are"} only ${plural(next, "argument")} after the format string. Every specifier except %n and %% uses up one argument.`, printedSoFar());
    }
    if (!acceptsArg(spec.conversion, arg)) {
      const hint = spec.conversion === "d"
        ? (arg.type === "double" ? " Use %f for a double, or cast it with (int)." : " %d only takes an int.")
        : spec.conversion === "f"
          ? (arg.type === "int" ? " Use %d for an int, or write the number with a decimal point, such as 7.0." : " %f only takes a double.")
          : " %c takes a char.";
      return exception("IllegalFormatConversionException", `${spec.conversion} != ${JAVA_CLASS[arg.type]}`, `${spec.raw} cannot print the ${arg.type} ${arg.literal}.${hint}`, printedSoFar());
    }
    if (spec.conversion === "c" && arg.type === "int" && (arg.value < 32 || arg.value > 126)) {
      return { kind: "unsupported", message: "This playground prints %c with an int only for the character codes 32 to 126." };
    }
    const formatted = formatOne(spec, arg);
    segments.push({ kind: "spec", spec, argument: arg.literal, ...formatted });
    next++;
  }

  return { kind: "output", segments, extraArgs: args.length - next };
}

export function printfOutput(result: Extract<PrintfResult, { kind: "output" }>): string {
  return result.segments.map(segment => (segment.kind === "text" ? segment.text : segment.output)).join("");
}
