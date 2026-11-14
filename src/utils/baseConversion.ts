import type { NumberBase } from "../types";

// Converts whole numbers between binary, decimal, and hexadecimal and records the
// work as steps. Each step body is content markup for PromptBody, written the way
// the exam solutions show it: place value tables, subtracting powers of 2,
// dividing by 16, and four-bit groups.

export const NUMBER_BASES: NumberBase[] = [2, 10, 16];

export const BASE_NAMES: Record<NumberBase, string> = {
  2: "binary",
  10: "decimal",
  16: "hexadecimal",
};

// Keeps every table at 16 columns or fewer: FFFF in hex, sixteen 1s in binary.
export const MAX_VALUE = 65535;

const DIGITS = "0123456789ABCDEF";
const SUPERSCRIPTS = "⁰¹²³⁴⁵⁶⁷⁸⁹";
const LETTER_VALUES = "A = 10, B = 11, C = 12, D = 13, E = 14, F = 15";

const DIGIT_RULES: Record<NumberBase, string> = {
  2: "Binary only uses the digits 0 and 1",
  10: "Decimal only uses the digits 0 to 9",
  16: "Hexadecimal only uses the digits 0 to 9 and the letters A to F",
};

export type ConversionStep = {
  title: string;
  body: string;
};

export type Conversion = {
  // the input as converted: no spaces, uppercase, no leading zeros
  digits: string;
  value: number;
  result: string;
  steps: ConversionStep[];
};

type ParsedNumber = {
  cleaned: string;
  digits: string;
  value: number;
};

export function superscript(n: number): string {
  return [...String(n)].map(d => SUPERSCRIPTS[Number(d)]).join("");
}

function digitValue(digit: string): number {
  return DIGITS.indexOf(digit);
}

export function toBase(value: number, base: NumberBase): string {
  if (value === 0) return "0";
  let digits = "";
  for (let n = value; n > 0; n = Math.floor(n / base)) digits = DIGITS[n % base] + digits;
  return digits;
}

// Step bodies butt tables against the prose around them: a newline next to a
// [[table]] renders as an empty line, which spreads out the compact step cards.
function table(rows: (string | number)[][]): string {
  return `[[table]]\n${rows.map(row => row.join(" | ")).join("\n")}\n[[/table]]`;
}

function plural(count: number, word: string): string {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}

function listWords(items: string[]): string {
  if (items.length <= 2) return items.join(" and ");
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

// The places 8, 4, 2, 1 that make up a value from 0 to 15, as "8 + 4 + 1".
function fourBitSum(value: number): string {
  const parts = [8, 4, 2, 1].filter(place => (value & place) !== 0);
  return parts.length === 0 ? "0" : parts.join(" + ");
}

function letterNote(digits: string[]): string {
  const letters = [...new Set(digits.filter(d => digitValue(d) >= 10))];
  if (letters.length === 0) return "";
  const used = letters.map(d => `${d} = ${digitValue(d)}`);
  return `\n\nHex uses letters for the digits 10 to 15: ${LETTER_VALUES}. Here ${listWords(used)}.`;
}

export function parseNumber(text: string, base: NumberBase): ParsedNumber | { error: string } {
  const cleaned = text.replace(/\s+/g, "").toUpperCase();
  if (cleaned === "") return { error: "Type a number to convert." };

  if (/[^0-9A-Z]/.test(cleaned)) {
    return {
      error: `Type a whole number using ${base === 16 ? "digits and the letters A to F" : "digits only"}: no minus signs, decimal points, or other symbols.`,
    };
  }

  const allowed = DIGITS.slice(0, base);
  const invalid = [...new Set([...cleaned].filter(d => !allowed.includes(d)))];
  if (invalid.length > 0) {
    return {
      error: `${cleaned} is not a valid ${BASE_NAMES[base]} number. ${DIGIT_RULES[base]}, and ${cleaned} contains ${listWords(invalid)}.`,
    };
  }

  const digits = cleaned.replace(/^0+(?=.)/, "");
  let value = 0;
  for (const digit of digits) {
    value = value * base + digitValue(digit);
    if (value > MAX_VALUE) {
      return {
        error: `This converter goes up to ${MAX_VALUE}, which is FFFF in hexadecimal and sixteen 1s in binary, so the tables stay readable.`,
      };
    }
  }
  return { cleaned, digits, value };
}

// "C×16¹ + 4×16⁰ = 12×16 + 4×1 = 192 + 4 = 196": the expansion of a number into
// digit × place value, from the digits down to the total.
function expansion(digits: string, base: NumberBase): string[] {
  const places = [...digits].map((digit, i) => ({
    digit,
    power: digits.length - 1 - i,
    place: base ** (digits.length - 1 - i),
  }));

  const chain = [
    places.map(p => `${p.digit}×${base}${superscript(p.power)}`).join(" + "),
    places.map(p => `${digitValue(p.digit)}×${p.place}`).join(" + "),
    places.map(p => digitValue(p.digit) * p.place).join(" + "),
  ];
  const total = String(places.reduce((sum, p) => sum + digitValue(p.digit) * p.place, 0));
  if (chain[chain.length - 1] !== total) chain.push(total);
  return chain;
}

function toDecimalSteps(digits: string, base: 2 | 16, value: number): ConversionStep[] {
  const list = [...digits];
  const powers = list.map((_, i) => list.length - 1 - i);

  const rows: (string | number)[][] = [
    ["Place", ...powers.map(power => `${base}${superscript(power)}`)],
    ["Value", ...powers.map(power => base ** power)],
    ["Digit", ...list],
  ];
  if (base === 16) rows.push(["Digit value", ...list.map(digitValue)]);

  const label: ConversionStep = {
    title: `Label each place with its power of ${base}`,
    body: `Every place is worth a power of ${base}. The rightmost digit is in the ${base}⁰ place, worth 1, and each place to its left is worth ${base} times more.${table(rows)}${base === 16 ? letterNote(list).trimStart() : ""}`,
  };

  if (base === 2) {
    const ones = list.flatMap((digit, i) => (digit === "1" ? [2 ** powers[i]] : []));
    const sum = ones.length === 1
      ? `Only the ${ones[0]} place holds a 1, so the value is **${value}**.`
      : `${ones.join(" + ")} = **${value}**`;
    return [label, {
      title: "Add up the places that hold a 1",
      body: `A 1 means the place counts and a 0 means it is skipped.\n\n${sum}`,
    }];
  }

  const chain = expansion(digits, 16);
  chain[chain.length - 1] = `**${chain[chain.length - 1]}**`;
  return [label, {
    title: "Multiply each digit by its place value, then add",
    body: `Use each digit's value, so a letter counts as 10 to 15.\n\n${chain.join(" = ")}`,
  }];
}

function decimalToBinarySteps(value: number, binary: string): ConversionStep[] {
  const powers: number[] = [];
  for (let power = 1; power <= value; power *= 2) powers.unshift(power);
  const exponents = powers.map((_, i) => powers.length - 1 - i);
  const next = powers[0] * 2;

  let left = value;
  const fitRows = powers.map(power => {
    const before = left;
    if (power <= left) {
      left -= power;
      return [power, before, `yes: ${before} - ${power} = ${left}`, 1];
    }
    return [power, before, `no: ${power} > ${before}`, 0];
  });

  const used = powers.filter((_, i) => binary[i] === "1");
  const answer = used.length === 1
    ? `${value} is itself a power of 2, so the answer is **${binary}**.`
    : `${used.join(" + ")} = ${value}, so the answer is **${binary}**.`;

  return [
    {
      title: "Write out the powers of 2",
      body: `Start at 1 and keep doubling. Stop before you pass ${value}: the next power, ${next}, is too big.${table([
  ["Place", ...exponents.map(e => `2${superscript(e)}`)],
  ["Value", ...powers],
])}`,
    },
    {
      title: "Take each power that fits, biggest first",
      body: `Start with all of ${value}. If a power fits into what is left, take it: write a 1 and subtract it. If it does not fit, write a 0 and move on.${table([["Power of 2", "Left", "Fits?", "Digit"], ...fitRows])}`,
    },
    {
      title: "Read the digits from the biggest power down",
      body: `${table([["Power of 2", ...powers], ["Used?", ...binary]])}${answer}`,
    },
  ];
}

function decimalToHexSteps(value: number, hex: string): ConversionStep[] {
  const rows: (string | number)[][] = [];
  for (let n = value; n > 0; n = Math.floor(n / 16)) {
    rows.push([n, Math.floor(n / 16), n % 16, DIGITS[n % 16]]);
  }

  const read = rows.length === 1
    ? `There is only one remainder, so the answer is **${hex}**.`
    : `The last remainder is the leftmost digit, so reading the Hex digit column from the bottom up gives **${hex}**.

Check: ${expansion(hex, 16).join(" = ")}.`;

  return [
    {
      title: "Divide by 16 and keep the remainder",
      body: `Use integer division, just like Java's / and %. The remainder n % 16 is the next hex digit, starting from the rightmost one. Then divide the quotient n / 16 again, and stop when it reaches 0.${letterNote([...hex])}${table([["n", "n / 16", "n % 16", "Hex digit"], ...rows])}`,
    },
    {
      title: "Read the remainders from bottom to top",
      body: read,
    },
  ];
}

function binaryToHexSteps(binary: string, hex: string): ConversionStep[] {
  const padding = (4 - (binary.length % 4)) % 4;
  const padded = "0".repeat(padding) + binary;
  const groups = padded.match(/.{4}/g) ?? [];
  const values = groups.map(group => parseInt(group, 2));

  const split = padding === 0
    ? `${binary} has ${plural(binary.length, "digit")}, which already splits evenly: **${groups.join(" ")}**.`
    : `${binary} has ${plural(binary.length, "digit")}, so add ${plural(padding, "zero")} on the left to fill the first group: **${groups.join(" ")}**.`;

  return [
    {
      title: "Split into groups of four, starting from the right",
      body: `One hex digit is exactly four binary digits. Group from the right so that any short group ends up on the left, where zeros do not change the value.\n\n${split}`,
    },
    {
      title: "Turn each group into one hex digit",
      body: `Inside a group, the places are worth 8, 4, 2, and 1 from left to right.${letterNote([...hex])}${table([
  ["Binary group", ...groups],
  ["Add up", ...values.map(fourBitSum)],
  ["Decimal", ...values],
  ["Hex digit", ...hex],
])}`,
    },
    {
      title: "Write the hex digits in order",
      body: `Put the hex digits side by side: **${hex}**.`,
    },
  ];
}

function hexToBinarySteps(hex: string, binary: string): ConversionStep[] {
  const list = [...hex];
  const values = list.map(digitValue);
  const groups = values.map(value => value.toString(2).padStart(4, "0"));
  const joined = groups.join("");

  const together = joined === binary
    ? `Side by side, the groups read **${binary}**.`
    : `Side by side, the groups read ${joined}. Zeros on the left do not change the value, so drop them: **${binary}**.`;

  return [
    {
      title: "Turn each hex digit into four binary digits",
      body: `Every hex digit is exactly four binary digits. Build each digit's value from the places 8, 4, 2, and 1, and pad with zeros so every group has four digits.${letterNote(list)}${table([
  ["Hex digit", ...list],
  ["Decimal", ...values],
  ["Add up", ...values.map(fourBitSum)],
  ["Binary group", ...groups],
])}`,
    },
    {
      title: "Put the groups together",
      body: together,
    },
  ];
}

export function convertNumber(text: string, from: NumberBase, to: NumberBase): Conversion | { error: string } {
  const parsed = parseNumber(text, from);
  if ("error" in parsed) return parsed;

  const { cleaned, digits, value } = parsed;
  const result = toBase(value, to);

  if (value === 0) {
    return {
      digits,
      value,
      result,
      steps: [{
        title: "Zero is zero in every base",
        body: "0 is written as **0** in binary, decimal, and hexadecimal.",
      }],
    };
  }

  const steps: ConversionStep[] = [];
  if (cleaned !== digits) {
    steps.push({
      title: "Drop the leading zeros",
      body: `Zeros on the left do not change the value, so ${cleaned} is the same number as **${digits}**.`,
    });
  }

  if (from === to) {
    steps.push({
      title: "Nothing to convert",
      body: `The number is already in ${BASE_NAMES[from]}, so the answer is **${result}**. Pick a different base to convert to.`,
    });
  } else if (to === 10) {
    steps.push(...toDecimalSteps(digits, from as 2 | 16, value));
  } else if (from === 10) {
    steps.push(...(to === 2 ? decimalToBinarySteps(value, result) : decimalToHexSteps(value, result)));
  } else if (from === 2) {
    steps.push(...binaryToHexSteps(digits, result));
  } else {
    steps.push(...hexToBinarySteps(digits, result));
  }

  return { digits, value, result, steps };
}
