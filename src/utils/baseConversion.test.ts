import { describe, expect, it } from "vitest";
import { numberSystems } from "../data/notes/numberSystems";
import type { NumberBase } from "../types";
import { convertNumber, MAX_VALUE, NUMBER_BASES, parseNumber, superscript, toBase, type Conversion } from "./baseConversion";
import { parsePrompt, parseTable } from "./parsePrompt";

function converted(text: string, from: NumberBase, to: NumberBase): Conversion {
  const conversion = convertNumber(text, from, to);
  if ("error" in conversion) throw new Error(`${text} (base ${from}) failed: ${conversion.error}`);
  return conversion;
}

function errorFor(text: string, from: NumberBase): string {
  const parsed = parseNumber(text, from);
  if (!("error" in parsed)) throw new Error(`${text} (base ${from}) should be rejected`);
  return parsed.error;
}

function count(text: string, token: string): number {
  return text.split(token).length - 1;
}

// The same rules content.test.ts applies to hand-written content.
function expectValidMarkup(text: string, where: string) {
  for (const block of ["code", "text", "table"]) {
    expect(count(text, `[[${block}]]`), `unbalanced [[${block}]] in ${where}`).toBe(count(text, `[[/${block}]]`));
  }
  for (const segment of parsePrompt(text)) {
    const lines = segment.type === "table" ? parseTable(segment.content).flat() : segment.content.split("\n");
    if (segment.type === "table") {
      const [header, ...rows] = parseTable(segment.content);
      expect(rows.length, `table without rows in ${where}`).toBeGreaterThan(0);
      for (const row of rows) expect(row.length, `ragged table row in ${where}`).toBe(header.length);
    }
    for (const line of lines) {
      expect(count(line, "**") % 2, `unpaired ** in ${where}: ${line}`).toBe(0);
      expect(count(line.replaceAll("**", ""), "*") % 2, `unpaired * in ${where}: ${line}`).toBe(0);
    }
  }
}

describe("convertNumber", () => {
  // Answers published in the exam solutions in src/data/exams.
  const examAnswers: [string, NumberBase, NumberBase, string][] = [
    ["111001", 2, 10, "57"],
    ["C4", 16, 10, "196"],
    ["1101001", 2, 16, "69"],
    ["34", 10, 2, "100010"],
    ["E8", 16, 2, "11101000"],
    ["101010", 2, 10, "42"],
    ["CA", 16, 10, "202"],
    ["10101011", 2, 16, "AB"],
    ["50", 10, 2, "110010"],
    ["F8", 16, 2, "11111000"],
    ["1100110", 2, 10, "102"],
    ["AB", 16, 10, "171"],
    ["65", 10, 2, "1000001"],
    ["1011111", 2, 10, "95"],
    ["246", 10, 2, "11110110"],
    ["BA", 16, 2, "10111010"],
    ["10101001", 2, 10, "169"],
    ["1E", 16, 10, "30"],
    ["10001101", 2, 16, "8D"],
    ["77", 10, 16, "4D"],
  ];

  for (const [input, from, to, answer] of examAnswers) {
    it(`converts ${input} from base ${from} to base ${to}`, () => {
      expect(converted(input, from, to).result).toBe(answer);
    });
  }

  // every small value, both sides of every power of 2, and a spread up to the limit
  const sampleValues = new Set<number>();
  for (let value = 0; value <= 600; value++) sampleValues.add(value);
  for (let power = 1; power <= MAX_VALUE + 1; power *= 2) {
    for (const value of [power - 1, power, power + 1]) if (value <= MAX_VALUE) sampleValues.add(value);
  }
  for (let value = 601; value <= MAX_VALUE; value += 97) sampleValues.add(value);
  sampleValues.add(MAX_VALUE);

  it("matches JavaScript's own conversion for every base pair, with valid markup", () => {
    for (const value of sampleValues) {
      for (const from of NUMBER_BASES) {
        for (const to of NUMBER_BASES) {
          const input = value.toString(from).toUpperCase();
          const conversion = converted(input, from, to);
          const where = `${input} (base ${from} to ${to})`;

          expect(conversion.value, where).toBe(value);
          expect(conversion.result, where).toBe(value.toString(to).toUpperCase());
          expect(conversion.steps.length, where).toBeGreaterThan(0);
          for (const step of conversion.steps) expectValidMarkup(step.body, where);
          expect(conversion.steps[conversion.steps.length - 1].body, `${where} last step`).toContain(`**${conversion.result}**`);
        }
      }
    }
  }, 30_000);

  it("handles the largest value", () => {
    expect(converted("65535", 10, 16).result).toBe("FFFF");
    expect(converted("FFFF", 16, 2).result).toBe("1111111111111111");
    expect(converted("1111111111111111", 2, 10).result).toBe("65535");
  });

  it("shows the place value table and sum for binary to decimal", () => {
    const [places, sum] = converted("111001", 2, 10).steps;
    expect(places.body).toContain("Place | 2⁵ | 2⁴ | 2³ | 2² | 2¹ | 2⁰\nValue | 32 | 16 | 8 | 4 | 2 | 1\nDigit | 1 | 1 | 1 | 0 | 0 | 1");
    expect(sum.body).toContain("32 + 16 + 8 + 1 = **57**");
  });

  it("expands hex digits by their place values", () => {
    const [places, sum] = converted("C4", 16, 10).steps;
    expect(places.body).toContain("Digit value | 12 | 4");
    expect(places.body).toContain("Here C = 12.");
    expect(sum.body).toContain("C×16¹ + 4×16⁰ = 12×16 + 4×1 = 192 + 4 = **196**");
    expect(converted("A", 16, 10).steps[1].body).toContain("A×16⁰ = 10×1 = **10**");
  });

  it("subtracts powers of 2 for decimal to binary", () => {
    const [powers, fits, digits] = converted("34", 10, 2).steps;
    expect(powers.body).toContain("Value | 32 | 16 | 8 | 4 | 2 | 1");
    expect(powers.body).toContain("the next power, 64, is too big");
    expect(fits.body).toContain("32 | 34 | yes: 34 - 32 = 2 | 1");
    expect(fits.body).toContain("16 | 2 | no: 16 > 2 | 0");
    expect(digits.body).toContain("Used? | 1 | 0 | 0 | 0 | 1 | 0");
    expect(digits.body).toContain("32 + 2 = 34, so the answer is **100010**.");
    expect(converted("64", 10, 2).steps[2].body).toContain("64 is itself a power of 2");
  });

  it("fills in the hex places for decimal to hex", () => {
    const [places, fill, digits] = converted("300", 10, 16).steps;
    expect(places.body).toContain("Place | 16² | 16¹ | 16⁰\nValue | 256 | 16 | 1");
    expect(places.body).toContain("the next place, 4096, is too big");
    expect(fill.body).toContain("256 | 300 | 1 | 300 - 1×256 = 44 | 1\n16 | 44 | 2 | 44 - 2×16 = 12 | 2\n1 | 12 | 12 | 12 - 12×1 = 0 | C");
    expect(fill.body).toContain("Here C = 12.");
    expect(digits.body).toContain("Place | 256 | 16 | 1\nDigit | 1 | 2 | C");
    expect(digits.body).toContain("1×16² + 2×16¹ + C×16⁰ = 1×256 + 2×16 + 12×1 = 256 + 32 + 12 = 300, so the answer is **12C**.");

    const zeros = converted("4100", 10, 16).steps[1].body;
    expect(zeros).toContain("256 | 4 | 0 | 4 - 0×256 = 4 | 0");
    for (const step of converted("77", 10, 16).steps) {
      expect(step.body, "no division or remainder in hex steps").not.toMatch(/%|\/ 16/);
    }
  });

  it("pads binary into groups of four from the right", () => {
    const [split, groups, joined] = converted("1101001", 2, 16).steps;
    expect(split.body).toContain("7 digits, so add 1 zero on the left");
    expect(split.body).toContain("**0110 1001**");
    expect(groups.body).toContain("Binary group | 0110 | 1001\nAdd up | 4 + 2 | 8 + 1\nDecimal | 6 | 9\nHex digit | 6 | 9");
    expect(joined.body).toContain("**69**");
    expect(converted("10101011", 2, 16).steps[0].body).toContain("already splits evenly");
  });

  it("drops the leading zeros of a hex to binary answer", () => {
    const [groups, joined] = converted("1E", 16, 2).steps;
    expect(groups.body).toContain("Binary group | 0001 | 1110");
    expect(joined.body).toContain("read 00011110");
    expect(joined.body).toContain("**11110**");
  });

  it("cleans up the input", () => {
    expect(converted(" 1010 1011 ", 2, 16).result).toBe("AB");
    expect(converted("ff", 16, 10).result).toBe("255");

    const padded = converted("00101", 2, 10);
    expect(padded.digits).toBe("101");
    expect(padded.steps[0].title).toBe("Drop the leading zeros");
    expect(padded.result).toBe("5");
  });

  it("explains zero and same-base conversions", () => {
    expect(converted("000", 2, 16).steps).toHaveLength(1);
    expect(converted("0", 10, 2).result).toBe("0");
    expect(converted("2A", 16, 16).steps[0].title).toBe("Nothing to convert");
  });
});

describe("parseNumber", () => {
  it("rejects digits that do not belong to the base", () => {
    expect(errorFor("156", 2)).toBe("156 is not a valid binary number. Binary only uses the digits 0 and 1, and 156 contains 5 and 6.");
    expect(errorFor("1G", 16)).toContain("contains G");
    expect(errorFor("12A", 10)).toContain("contains A");
  });

  it("rejects empty input, symbols, and values that are too big", () => {
    expect(errorFor("   ", 10)).toBe("Type a number to convert.");
    expect(errorFor("-5", 10)).toContain("no minus signs");
    expect(errorFor("1.5", 10)).toContain("decimal points");
    expect(errorFor(String(MAX_VALUE + 1), 10)).toContain(`up to ${MAX_VALUE}`);
    expect(errorFor("1".repeat(17), 2)).toContain(`up to ${MAX_VALUE}`);
  });
});

describe("helpers", () => {
  it("writes exponents as superscripts", () => {
    expect(superscript(0)).toBe("⁰");
    expect(superscript(15)).toBe("¹⁵");
  });

  it("writes values in each base", () => {
    expect(toBase(0, 2)).toBe("0");
    expect(toBase(300, 16)).toBe("12C");
    expect(toBase(75, 2)).toBe("1001011");
  });
});

describe("number systems notes", () => {
  const withConverter = numberSystems.entries.filter(entry => entry.converter);

  it("gives every note but the overview a converter that loads without an error", () => {
    expect(numberSystems.entries.filter(entry => !entry.converter).map(entry => entry.id)).toEqual(["bases"]);
    for (const entry of withConverter) {
      const { from, to, value } = entry.converter!;
      expect(from, `${entry.id} converts to its own base`).not.toBe(to);
      converted(value, from, to);
    }
  });

  // A conversion note opens its converter on the note's own example, so every
  // table the converter draws must match the worked example in the note.
  it("matches the worked example in each conversion note", () => {
    const examples = withConverter.filter(entry => entry.id !== "bases" && entry.id !== "converter");
    expect(examples.map(entry => entry.id)).toEqual(["binarytodecimal", "hextodecimal", "decimaltobinary", "decimaltohex", "binaryhex"]);

    for (const entry of examples) {
      const { from, to, value } = entry.converter!;
      const noteText = entry.sections.map(section => section.content).join("\n");
      const noteTables = parsePrompt(noteText).filter(s => s.type === "table").map(s => s.content.trim());
      const conversion = converted(value, from, to);

      expect(noteText, `${entry.id} answer`).toContain(`**${conversion.result}**`);
      for (const step of conversion.steps) {
        for (const segment of parsePrompt(step.body)) {
          if (segment.type === "table") expect(noteTables, `${entry.id}: "${step.title}"`).toContain(segment.content.trim());
        }
      }
    }
  });
});
