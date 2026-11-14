import { describe, expect, it } from "vitest";
import {
  javaCompareTo,
  javaSplit,
  parseJavaIntArg,
  runStringMethod,
  type StringMethodId,
  type StringOutcome,
} from "./stringMethods";

function outcome(s: string, id: StringMethodId, args: string[]): StringOutcome {
  const result = runStringMethod(s, id, args);
  if ("error" in result) throw new Error(`${id}(${args.join(", ")}) on ${JSON.stringify(s)}: ${result.error}`);
  return result;
}

// Each row is [method, string, arguments, what Java 25 returned]. The answers were
// produced by running the same calls in Java. "EXC" means Java threw that exception.
const JAVA_ANSWERS: [StringMethodId, string, string[], string][] = [
    ["length", "Hello, World", [], "12"],
    ["length", "", [], "0"],
    ["charAt", "Hello, World", ["0"], "'H'"],
    ["charAt", "Hello, World", ["7"], "'W'"],
    ["charAt", "Hello, World", ["11"], "'d'"],
    ["charAt", "Hello, World", ["12"], "EXC StringIndexOutOfBoundsException"],
    ["charAt", "Hello, World", ["-1"], "EXC StringIndexOutOfBoundsException"],
    ["charAt", "", ["0"], "EXC StringIndexOutOfBoundsException"],
    ["charAt", "it's \"ok\"", ["2"], "'\\''"],
    ["substring1", "Hello, World", ["7"], "\"World\""],
    ["substring1", "Hello, World", ["12"], "\"\""],
    ["substring1", "Hello, World", ["13"], "EXC StringIndexOutOfBoundsException"],
    ["substring1", "Hello, World", ["-1"], "EXC StringIndexOutOfBoundsException"],
    ["substring2", "Hello, World", ["0", "5"], "\"Hello\""],
    ["substring2", "Hello, World", ["7", "12"], "\"World\""],
    ["substring2", "Hello, World", ["3", "3"], "\"\""],
    ["substring2", "Hello, World", ["5", "3"], "EXC StringIndexOutOfBoundsException"],
    ["substring2", "Hello, World", ["0", "13"], "EXC StringIndexOutOfBoundsException"],
    ["substring2", "Hello, World", ["-1", "5"], "EXC StringIndexOutOfBoundsException"],
    ["substring2", "", ["0", "0"], "\"\""],
    ["indexOf", "banana", ["a"], "1"],
    ["indexOf", "banana", ["na"], "2"],
    ["indexOf", "banana", ["z"], "-1"],
    ["indexOf", "banana", [], "0"],
    ["indexOf", "Mississippi", ["ss"], "2"],
    ["indexOfFrom", "banana", ["a", "2"], "3"],
    ["indexOfFrom", "banana", ["a", "-3"], "1"],
    ["indexOfFrom", "banana", ["a", "6"], "-1"],
    ["indexOfFrom", "banana", ["", "9"], "6"],
    ["indexOfFrom", "Mississippi", ["ss", "3"], "5"],
    ["lastIndexOf", "banana", ["a"], "5"],
    ["lastIndexOf", "banana", ["an"], "3"],
    ["lastIndexOf", "banana", [], "6"],
    ["lastIndexOf", "Mississippi", ["i"], "10"],
    ["lastIndexOf", "banana", ["z"], "-1"],
    ["equals", "Java", ["Java"], "true"],
    ["equals", "Java", ["java"], "false"],
    ["equals", "ABC", ["AB"], "false"],
    ["compareTo", "Java", ["java"], "-32"],
    ["compareTo", "banana", ["band"], "-3"],
    ["compareTo", "ABC", ["AB"], "1"],
    ["compareTo", "x", ["y"], "-1"],
    ["compareTo", "Java", ["Java"], "0"],
    ["compareTo", "", ["Hello"], "-5"],
    ["toUpperCase", "Hello, World", [], "\"HELLO, WORLD\""],
    ["toLowerCase", "Hello, World", [], "\"hello, world\""],
    ["split", "a,,b,,", [","], "{\"a\", \"\", \"b\"}"],
    ["split", ",a,b", [","], "{\"\", \"a\", \"b\"}"],
    ["split", ",", [","], "{}"],
    ["split", "", [","], "{\"\"}"],
    ["split", "a b  c", [" "], "{\"a\", \"b\", \"\", \"c\"}"],
    ["split", "a b  c", ["  "], "{\"a b\", \"c\"}"],
    ["split", "banana", ["an"], "{\"b\", \"\", \"a\"}"],
    ["split", "banana", ["a"], "{\"b\", \"n\", \"n\"}"],
    ["split", "Mississippi", ["ss"], "{\"Mi\", \"i\", \"ippi\"}"],
    ["split", "Hello, World", ["x"], "{\"Hello, World\"}"],
];

describe("runStringMethod", () => {
  it("returns exactly what Java returns", () => {
    for (const [id, s, args, expected] of JAVA_ANSWERS) {
      const result = outcome(s, id, args);
      const got = result.exception ? `EXC ${result.exception}` : result.result;
      expect(got, `${id}(${JSON.stringify(args)}) on ${JSON.stringify(s)}`).toBe(expected);
    }
  });

  it("marks the characters a method uses", () => {
    expect(outcome("Hello, World", "substring2", ["7", "12"]).marks.map(m => (m ? 1 : 0)).join("")).toBe("000000011111");
    expect(outcome("Hello, World", "charAt", ["4"]).marks[4]).toBe("pick");
    expect(outcome("banana", "indexOf", ["na"]).marks.map(m => (m ? 1 : 0)).join("")).toBe("001100");
    expect(outcome("a,b", "split", [","]).marks).toEqual(["piece-a", "delim", "piece-b"]);
    expect(outcome("Java", "compareTo", ["java"]).other?.marks[0]).toBe("differ");
  });

  it("explains the usual traps", () => {
    expect(outcome("Hello, World", "substring2", ["0", "5"]).explanation).toContain("stops just before index 5");
    expect(outcome("Hello, World", "charAt", ["12"]).explanation).toContain("The indexes run from 0 to 11");
    expect(outcome("banana", "indexOf", ["z"]).explanation).toContain("returns -1");
    expect(outcome("Java", "compareTo", ["java"]).explanation).toContain("74 - 106 = -32");
    expect(outcome("a,,b,,", "split", [","]).explanation).toContain("Java drops empty strings at the end");
    expect(outcome("Hi", "toUpperCase", []).explanation).toContain("s itself is not changed");
  });

  it("rejects input it cannot match Java on", () => {
    expect(runStringMethod("café", "length", [])).toEqual({ error: "Use only the letters, digits, spaces, and symbols on a US keyboard in the string." });
    expect(runStringMethod("a.b", "split", ["."])).toHaveProperty("error");
    expect(runStringMethod("abc", "split", [""])).toHaveProperty("error");
    expect(runStringMethod("abc", "charAt", ["x"])).toEqual({ error: "index: x is not a whole number." });
    expect(runStringMethod("x".repeat(41), "length", [])).toHaveProperty("error");
  });
});

describe("helpers", () => {
  it("splits like Java", () => {
    expect(javaSplit("", ",")).toEqual([""]);
    expect(javaSplit(",", ",")).toEqual([]);
    expect(javaSplit("a,,b,,", ",")).toEqual(["a", "", "b"]);
  });

  it("compares like Java", () => {
    expect(javaCompareTo("apple", "banana")).toBe(-1);
    expect(javaCompareTo("Zebra", "apple")).toBe(-7);
    expect(javaCompareTo("car", "cart")).toBe(-1);
  });

  it("reads int arguments like Java literals", () => {
    expect(parseJavaIntArg("-3")).toEqual({ value: -3 });
    expect(parseJavaIntArg("010")).toHaveProperty("error");
    expect(parseJavaIntArg("2147483648")).toHaveProperty("error");
  });
});
