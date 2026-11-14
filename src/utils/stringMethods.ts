// Runs one Java String method on a string and explains the result. Every method
// matches Java's behavior, including the exceptions it throws. Strings are kept to
// printable ASCII so that JavaScript and Java agree on every character.

import type { StringMethodId } from "../types";

export type { StringMethodId };

export type ParamKind = "int" | "string";

export type MethodInfo = {
  id: StringMethodId;
  name: string;
  params: { name: string; kind: ParamKind }[];
};

export const STRING_METHODS: MethodInfo[] = [
  { id: "length", name: "length", params: [] },
  { id: "charAt", name: "charAt", params: [{ name: "index", kind: "int" }] },
  { id: "substring1", name: "substring", params: [{ name: "beginIndex", kind: "int" }] },
  { id: "substring2", name: "substring", params: [{ name: "beginIndex", kind: "int" }, { name: "endIndex", kind: "int" }] },
  { id: "indexOf", name: "indexOf", params: [{ name: "str", kind: "string" }] },
  { id: "indexOfFrom", name: "indexOf", params: [{ name: "str", kind: "string" }, { name: "fromIndex", kind: "int" }] },
  { id: "lastIndexOf", name: "lastIndexOf", params: [{ name: "str", kind: "string" }] },
  { id: "equals", name: "equals", params: [{ name: "other", kind: "string" }] },
  { id: "compareTo", name: "compareTo", params: [{ name: "other", kind: "string" }] },
  { id: "toUpperCase", name: "toUpperCase", params: [] },
  { id: "toLowerCase", name: "toLowerCase", params: [] },
  { id: "split", name: "split", params: [{ name: "regex", kind: "string" }] },
];

export const MAX_STRING_LENGTH = 40;

// Characters with a special meaning in a regular expression. split takes a regex,
// so the explorer only accepts delimiters without them.
const REGEX_SPECIAL = /[.$|()[\]{}^?*+\\]/;

// How a character box is drawn: picked by the method, a split delimiter, one of the
// split pieces (alternating), or the first character that differs in a comparison.
export type CellMark = "pick" | "delim" | "piece-a" | "piece-b" | "differ";

export type StringOutcome = {
  call: string;
  // a Java literal for the result, or null when the call throws
  result: string | null;
  type: "int" | "char" | "String" | "boolean" | "String[]" | null;
  exception: string | null;
  explanation: string;
  marks: (CellMark | null)[];
  // labels under particular indexes, such as "begin" and "end"
  pointers: { index: number; label: string }[];
  // the other string for equals and compareTo
  other: { text: string; marks: (CellMark | null)[] } | null;
  // the array split returns
  pieces: string[] | null;
};

export function checkStringText(text: string, what: string): string | null {
  if (text.length > MAX_STRING_LENGTH) return `Keep ${what} to ${MAX_STRING_LENGTH} characters or fewer.`;
  if (/[^\x20-\x7E]/.test(text)) return `Use only the letters, digits, spaces, and symbols on a US keyboard in ${what}.`;
  return null;
}

export function javaStringLiteral(text: string): string {
  return `"${text.replace(/\\/g, "\\\\").replace(/"/g, "\\\"")}"`;
}

export function javaCharLiteral(ch: string): string {
  if (ch === "'" || ch === "\\") return `'\\${ch}'`;
  return `'${ch}'`;
}

export function parseJavaIntArg(text: string): { value: number } | { error: string } {
  const trimmed = text.trim();
  if (trimmed === "") return { error: "Type a whole number." };
  if (!/^-?\d+$/.test(trimmed)) return { error: `${trimmed} is not a whole number.` };
  if (/^-?0\d/.test(trimmed)) return { error: "Leave off the leading zero: Java reads a number that starts with 0 as octal." };
  const value = Number(trimmed);
  if (value > 2147483647 || value < -2147483648) return { error: `${trimmed} does not fit in an int.` };
  return { value };
}

function emptyMarks(text: string): (CellMark | null)[] {
  return Array(text.length).fill(null);
}

function charName(ch: string): string {
  return ch === " " ? "a space" : javaCharLiteral(ch);
}

function plural(count: number, word: string): string {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}

function outOfBounds(call: string, s: string, explanation: string): StringOutcome {
  return {
    call,
    result: null,
    type: null,
    exception: "StringIndexOutOfBoundsException",
    explanation,
    marks: emptyMarks(s),
    pointers: [],
    other: null,
    pieces: null,
  };
}

function base(call: string, s: string): Omit<StringOutcome, "result" | "type" | "explanation"> {
  return { call, exception: null, marks: emptyMarks(s), pointers: [], other: null, pieces: null };
}

// Java's String.split for a delimiter with no regex characters: cut at every
// match from left to right, then drop the empty strings at the end. A string
// with no match comes back whole, even when it is empty.
export function javaSplit(s: string, delimiter: string): string[] {
  if (!s.includes(delimiter)) return [s];
  const parts = s.split(delimiter);
  while (parts.length > 0 && parts[parts.length - 1] === "") parts.pop();
  return parts;
}

export function javaCompareTo(a: string, b: string): number {
  const shorter = Math.min(a.length, b.length);
  for (let i = 0; i < shorter; i++) {
    if (a[i] !== b[i]) return a.charCodeAt(i) - b.charCodeAt(i);
  }
  return a.length - b.length;
}

export function runStringMethod(
  s: string,
  id: StringMethodId,
  rawArgs: string[],
): StringOutcome | { error: string } {
  const stringError = checkStringText(s, "the string");
  if (stringError) return { error: stringError };

  const info = STRING_METHODS.find(m => m.id === id)!;
  const args: (number | string)[] = [];
  for (const [i, param] of info.params.entries()) {
    const raw = rawArgs[i] ?? "";
    if (param.kind === "int") {
      const parsed = parseJavaIntArg(raw);
      if ("error" in parsed) return { error: `${param.name}: ${parsed.error}` };
      args.push(parsed.value);
    } else {
      const argError = checkStringText(raw, param.name);
      if (argError) return { error: argError };
      args.push(raw);
    }
  }

  const shownArgs = args.map(a => (typeof a === "number" ? String(a) : javaStringLiteral(a))).join(", ");
  const call = `s.${info.name}(${shownArgs})`;
  const len = s.length;
  const last = len - 1;

  switch (id) {
    case "length": {
      const marks = s.split("").map((): CellMark => "pick");
      return {
        ...base(call, s),
        marks,
        result: String(len),
        type: "int",
        explanation: len === 0
          ? "The string is empty, so its length is 0."
          : `The string has ${plural(len, "character")}, counting every space and symbol. The indexes run from 0 to ${last}, one less than the length.`,
      };
    }

    case "charAt": {
      const index = args[0] as number;
      if (index < 0 || index >= len) {
        return outOfBounds(call, s, len === 0
          ? "The string is empty, so it has no characters at all. charAt throws an exception."
          : `The indexes run from 0 to ${last}. ${index} is outside that range, so charAt throws an exception.`);
      }
      const marks = emptyMarks(s);
      marks[index] = "pick";
      return {
        ...base(call, s),
        marks,
        pointers: [{ index, label: "index" }],
        result: javaCharLiteral(s[index]),
        type: "char",
        explanation: `charAt returns the single character at index ${index}${index === 0 ? ", the first character" : index === last ? ", the last character" : ""}. Indexes start at 0, so index ${index} is character number ${index + 1}. The result is a char, written in single quotes.`,
      };
    }

    case "substring1":
    case "substring2": {
      const begin = args[0] as number;
      const end = id === "substring2" ? (args[1] as number) : len;
      if (begin < 0 || end > len || begin > end) {
        let why: string;
        if (begin < 0) why = `beginIndex ${begin} is negative.`;
        else if (end > len) why = `endIndex ${end} is past the end of the string, whose length is ${len}.`;
        else if (begin > len) why = `beginIndex ${begin} is past the end of the string, whose length is ${len}.`;
        else why = `beginIndex ${begin} is bigger than endIndex ${end}.`;
        return outOfBounds(call, s, `${why} substring throws an exception. Both indexes must be between 0 and the length, ${len}, and beginIndex cannot be bigger than endIndex.`);
      }
      const marks = emptyMarks(s);
      for (let i = begin; i < end; i++) marks[i] = "pick";
      const piece = s.slice(begin, end);
      const pointers = [{ index: begin, label: "begin" }];
      if (id === "substring2") pointers.push({ index: end, label: "end" });

      let explanation: string;
      if (id === "substring1") {
        explanation = begin === len
          ? `substring(${begin}) starts at the length of the string, so there is nothing left to take. The result is the empty string.`
          : `substring(${begin}) starts at index ${begin} and takes everything to the end of the string: ${plural(len - begin, "character")}.`;
      } else if (begin === end) {
        explanation = `beginIndex and endIndex are both ${begin}, so substring takes nothing. The result is the empty string.`;
      } else {
        explanation = `substring(${begin}, ${end}) starts at index ${begin} and stops just before index ${end}, so it takes indexes ${begin} to ${end - 1}. That is ${end} - ${begin} = ${plural(end - begin, "character")}. The character at index ${end} is not included.`;
      }
      return { ...base(call, s), marks, pointers, result: javaStringLiteral(piece), type: "String", explanation };
    }

    case "indexOf":
    case "indexOfFrom":
    case "lastIndexOf": {
      const target = args[0] as string;
      const from = id === "indexOfFrom" ? (args[1] as number) : null;
      const found = id === "lastIndexOf"
        ? s.lastIndexOf(target)
        : s.indexOf(target, from === null ? 0 : Math.max(0, from));
      const marks = emptyMarks(s);
      if (found >= 0) for (let i = found; i < found + target.length; i++) marks[i] = "pick";
      const pointers = [];
      if (from !== null && from >= 0 && from <= len) pointers.push({ index: from, label: "from" });
      if (found >= 0 && found !== from) pointers.push({ index: found, label: "found" });

      const what = target.length === 1 ? charName(target) : javaStringLiteral(target);
      let explanation: string;
      if (target === "") {
        explanation = `Every string contains the empty string, so ${info.name} finds it right away at index ${found}.`;
      } else if (found < 0) {
        explanation = id === "indexOfFrom"
          ? `${what} does not appear anywhere from index ${Math.max(0, from!)} on, so indexOf returns -1.`
          : `${what} does not appear in the string, so ${info.name} returns -1. Java uses -1 because no real index is negative.`;
      } else if (id === "lastIndexOf") {
        explanation = `lastIndexOf searches from the end of the string. The last time ${what} appears, it starts at index ${found}.`;
      } else if (id === "indexOfFrom") {
        explanation = `indexOf starts looking at index ${Math.max(0, from!)}${from! < 0 ? " (a negative fromIndex counts as 0)" : ""} and finds ${what} starting at index ${found}. Anything before index ${Math.max(0, from!)} is skipped.`;
      } else {
        explanation = `indexOf searches from the start of the string. The first time ${what} appears, it starts at index ${found}${target.length > 1 ? ", the index of its first character" : ""}.`;
      }
      return { ...base(call, s), marks, pointers, result: String(found), type: "int", explanation };
    }

    case "equals":
    case "compareTo": {
      const other = args[0] as string;
      const shorter = Math.min(len, other.length);
      let differ = -1;
      for (let i = 0; i < shorter; i++) {
        if (s[i] !== other[i]) {
          differ = i;
          break;
        }
      }
      const marks = emptyMarks(s);
      const otherMarks = emptyMarks(other);
      if (differ >= 0) {
        marks[differ] = "differ";
        otherMarks[differ] = "differ";
      }
      const pointers = differ >= 0 ? [{ index: differ, label: "differ" }] : [];

      if (id === "equals") {
        const same = s === other;
        let explanation: string;
        if (same) explanation = "Every character matches and the lengths are the same, so equals returns true.";
        else if (differ >= 0) explanation = `The strings first differ at index ${differ}: ${charName(s[differ])} and ${charName(other[differ])}. Upper and lower case count as different. equals returns false.`;
        else explanation = `The characters match as far as the shorter string goes, but the lengths are ${len} and ${other.length}. equals returns false.`;
        return {
          ...base(call, s),
          marks,
          pointers,
          other: { text: other, marks: otherMarks },
          result: String(same),
          type: "boolean",
          explanation: `${explanation} Always compare strings with equals, not ==.`,
        };
      }

      const value = javaCompareTo(s, other);
      let explanation: string;
      if (differ >= 0) {
        const a = s.charCodeAt(differ);
        const b = other.charCodeAt(differ);
        explanation = `The strings first differ at index ${differ}. compareTo subtracts the character codes there: ${charName(s[differ])} is ${a} and ${charName(other[differ])} is ${b}, so ${a} - ${b} = ${value}.`;
      } else {
        explanation = `Every character matches as far as the shorter string goes, so compareTo subtracts the lengths: ${len} - ${other.length} = ${value}.`;
      }
      const meaning = value < 0
        ? `A negative result means s comes first in dictionary order.`
        : value > 0
          ? `A positive result means s comes after the other string in dictionary order.`
          : `0 means the strings are equal.`;
      return {
        ...base(call, s),
        marks,
        pointers,
        other: { text: other, marks: otherMarks },
        result: String(value),
        type: "int",
        explanation: `${explanation} ${meaning}`,
      };
    }

    case "toUpperCase":
    case "toLowerCase": {
      const changed = id === "toUpperCase" ? s.toUpperCase() : s.toLowerCase();
      const marks = s.split("").map((ch, i): CellMark | null => (changed[i] !== ch ? "pick" : null));
      const count = marks.filter(Boolean).length;
      const upper = id === "toUpperCase";
      return {
        ...base(call, s),
        marks,
        result: javaStringLiteral(changed),
        type: "String",
        explanation: count === 0
          ? `No letters needed changing, so ${info.name} returns the same text. s itself is not changed: Java strings cannot be changed, so the method returns a new string.`
          : `${info.name} changes ${plural(count, upper ? "lowercase letter" : "uppercase letter")} to ${upper ? "uppercase" : "lowercase"} and leaves everything else alone. s itself is not changed: the method returns a new string, so save it, as in s = s.${info.name}();.`,
      };
    }

    case "split": {
      const delimiter = args[0] as string;
      if (delimiter === "") return { error: "Type a delimiter to split on, such as a space or a comma." };
      if (REGEX_SPECIAL.test(delimiter)) {
        return { error: "split takes a regular expression, where characters like . | * + ? ( ) [ ] { } ^ $ and \\ have special meanings. This explorer only splits on plain delimiters, such as a space, a comma, or a word." };
      }
      const pieces = javaSplit(s, delimiter);
      const marks = emptyMarks(s);
      let piece = 0;
      let i = 0;
      while (i < len) {
        if (s.startsWith(delimiter, i)) {
          for (let k = i; k < i + delimiter.length; k++) marks[k] = "delim";
          i += delimiter.length;
          piece++;
        } else {
          marks[i] = piece % 2 === 0 ? "piece-a" : "piece-b";
          i++;
        }
      }

      const what = delimiter.length === 1 ? charName(delimiter) : javaStringLiteral(delimiter);
      const raw = s.includes(delimiter) ? s.split(delimiter) : [s];
      const dropped = raw.length - pieces.length;
      let explanation: string;
      if (!s.includes(delimiter)) {
        explanation = `${what} does not appear in the string, so split returns an array holding the whole string.`;
      } else {
        explanation = `split cuts the string at every ${what} and returns the pieces in a String array of length ${pieces.length}. The delimiters themselves are thrown away.`;
        if (raw.slice(0, pieces.length).some(p => p === "")) {
          explanation += " Two delimiters in a row, or one at the very start, leave an empty string in the array.";
        }
        if (dropped > 0) {
          explanation += ` Java drops empty strings at the end of the array, so ${plural(dropped, "empty string")} at the end ${dropped === 1 ? "is" : "are"} left out.`;
        }
      }
      return {
        ...base(call, s),
        marks,
        pieces,
        result: `{${pieces.map(javaStringLiteral).join(", ")}}`,
        type: "String[]",
        explanation,
      };
    }
  }
}
