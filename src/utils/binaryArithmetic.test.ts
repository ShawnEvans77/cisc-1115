import { describe, expect, it } from "vitest";
import { numberSystems } from "../data/notes/numberSystems";
import { MAX_BITS, parseBinaryInput, runArithmetic, type ArithmeticOp, type ArithmeticRun } from "./binaryArithmetic";
import { parsePrompt, parseTable } from "./parsePrompt";

function run(op: ArithmeticOp, top: string, bottom: string): ArithmeticRun {
  const result = runArithmetic(op, top, bottom);
  if ("error" in result) throw new Error(`${top} ${op} ${bottom} failed: ${result.error}`);
  return result;
}

function last<T>(items: T[]): T {
  return items[items.length - 1];
}

// Every column of the sheet must stay a column: same width in every row of every step.
function expectConsistentShape(result: ArithmeticRun, where: string) {
  for (const step of result.steps) {
    for (const row of [step.marks, step.top, step.struck, step.bottom, step.result]) {
      expect(row.length, where).toBe(result.width);
    }
    if (step.column !== null) {
      expect(step.column, where).toBeGreaterThanOrEqual(0);
      expect(step.column, where).toBeLessThan(result.width);
    }
  }
}

describe("binary addition", () => {
  // Answers published in the exam solutions in src/data/exams.
  it("matches the exam answers", () => {
    expect(run("add", "101", "111").answer).toBe("1100");
    expect(run("add", "101", "110").answer).toBe("1011");
    expect(run("add", "101", "001").answer).toBe("110");
  });

  it("matches real addition for every pair up to 8 bits, with leading zeros too", () => {
    for (let a = 0; a < 256; a++) {
      for (let b = 0; b < 256; b++) {
        for (const [top, bottom] of [[a.toString(2), b.toString(2)], [a.toString(2).padStart(8, "0"), b.toString(2)]]) {
          const result = run("add", top, bottom);
          const where = `${top} + ${bottom}`;
          if (result.resultValue !== a + b || result.answer !== (a + b).toString(2)) {
            throw new Error(`${where} gave ${result.answer}`);
          }
          if (last(result.steps).result.join("").replace(/^0+(?=.)/, "") !== result.answer) {
            throw new Error(`${where}: the answer row does not read ${result.answer}`);
          }
        }
      }
    }
  });

  it("carries like the hand-written exam solution", () => {
    const result = run("add", "101", "111");
    const final = last(result.steps);
    expect(final.marks).toEqual(["1", "1", "1", ""]);
    expect(final.result).toEqual(["1", "1", "0", "0"]);
    expect(final.message).toBe("Check in base 10: 5 + 7 = 12, and 1100 is 12.");
    expectConsistentShape(result, "101 + 111");

    const columns = result.steps.filter(step => step.column !== null).map(step => step.math);
    expect(columns).toEqual(["1 + 1 = 10", "0 + 1 + 1 = 10", "1 + 1 + 1 = 11", "1"]);
    expect(result.steps[3].message).toContain("The sum is 3, which is 11 in binary.");
  });

  it("does not add a carry step when nothing is carried out", () => {
    const result = run("add", "101", "10");
    expect(result.answer).toBe("111");
    expect(result.steps.map(step => step.title)).not.toContain("Bring down the last carry");
    expect(last(result.steps).result).toEqual(["", "1", "1", "1"]);
  });

  it("works through the note's example, 1011 + 110", () => {
    const result = run("add", "1011", "110");
    expect(result.answer).toBe("10001");
    expect(last(result.steps).marks).toEqual(["1", "1", "1", "", ""]);
  });
});

describe("binary subtraction", () => {
  it("matches real subtraction for every pair up to 8 bits, with leading zeros too", () => {
    for (let a = 0; a < 256; a++) {
      for (let b = 0; b <= a; b++) {
        for (const [top, bottom] of [[a.toString(2), b.toString(2)], [a.toString(2), b.toString(2).padStart(8, "0")]]) {
          const result = run("subtract", top, bottom);
          const where = `${top} - ${bottom}`;
          if (result.resultValue !== a - b || result.answer !== (a - b).toString(2)) {
            throw new Error(`${where} gave ${result.answer}`);
          }
          // after all the borrowing, each column's top value minus its bottom digit is the answer digit
          const final = last(result.steps);
          for (let column = 0; column < result.width; column++) {
            const topNow = final.struck[column] ? parseInt(final.marks[column], 2) : Number(final.top[column] || "0");
            const digit = topNow - Number(final.bottom[column] || "0");
            if (String(digit) !== final.result[column]) throw new Error(`${where}: column ${column} is wrong`);
          }
        }
      }
    }
  });

  it("borrows across zeros in the note's example, 1100 - 101", () => {
    const result = run("subtract", "1100", "101");
    const final = last(result.steps);
    expect(result.answer).toBe("111");
    expect(final.marks).toEqual(["0", "10", "1", "10"]);
    expect(final.struck).toEqual([true, true, true, true]);
    expect(final.result).toEqual(["0", "1", "1", "1"]);
    expect(final.message).toBe("Zeros at the front do not change the value, so 0111 is written as 111. Check in base 10: 12 - 5 = 7, and 111 is 7.");
    expectConsistentShape(result, "1100 - 101");

    expect(result.steps[1].message).toBe("0 - 1 cannot be done, so borrow. The nearest 1 is in the 4s column. It becomes 0, every 0 between it and this column becomes 1, and this column becomes 10, which is 2. Now 10 - 1 = 1, so write 1.");
    expect(result.steps[2].message).toBe("An earlier borrow changed this column's top digit to 1. 1 - 0 = 1, so write 1.");
    expect(result.steps[3].message).toBe("0 - 1 cannot be done, so borrow. The 1 in the next column becomes 0, and this column becomes 10, which is 2. Now 10 - 1 = 1, so write 1.");
  });

  it("refuses a negative answer", () => {
    const result = runArithmetic("subtract", "101", "110");
    expect("error" in result && result.error).toContain("bigger than the top one");
  });
});

describe("parseBinaryInput", () => {
  it("accepts spaces and rejects anything that is not binary", () => {
    expect(parseBinaryInput(" 1010 1011 ", "top")).toEqual({ digits: "10101011" });
    expect(parseBinaryInput("", "top")).toEqual({ error: "Type a binary number for the top row." });
    expect(parseBinaryInput("102", "bottom")).toEqual({ error: "The bottom number can only use the digits 0 and 1." });
    expect(parseBinaryInput("1".repeat(MAX_BITS + 1), "top")).toEqual({ error: `Use at most ${MAX_BITS} digits for the top number.` });
  });
});

// The note works one addition and one subtraction by hand. Its charts must show
// exactly what the calculator writes for the same problems.
describe("binary arithmetic note", () => {
  const entry = numberSystems.entries.find(e => e.id === "binaryarithmetic")!;
  const tables = parsePrompt(entry.sections.map(section => section.content).join("\n"))
    .filter(segment => segment.type === "table")
    .map(segment => parseTable(segment.content));

  function rows(firstCell: string): string[][] {
    const table = tables.find(t => t.some(row => row[0] === firstCell));
    if (!table) throw new Error(`no table with a ${firstCell} row`);
    return table;
  }

  function row(table: string[][], label: string): string[] {
    const found = table.find(r => r[0] === label);
    if (!found) throw new Error(`no ${label} row`);
    return found.slice(1);
  }

  it("opens the calculator on the note's addition example", () => {
    expect(entry.arithmetic).toEqual({ op: "add", top: "1011", bottom: "110" });
  });

  it("matches the addition chart", () => {
    const final = last(run("add", "1011", "110").steps);
    const table = rows("Carry");
    expect(row(table, "Carry")).toEqual(final.marks);
    expect(row(table, "Top")).toEqual(final.top);
    expect(row(table, "Bottom")).toEqual(final.bottom);
    expect(row(table, "Sum")).toEqual(final.result);
  });

  it("matches the subtraction chart", () => {
    const final = last(run("subtract", "1100", "101").steps);
    const table = rows("After borrowing");
    expect(row(table, "After borrowing")).toEqual(final.marks);
    expect(row(table, "Top")).toEqual(final.top);
    expect(row(table, "Bottom")).toEqual(final.bottom);
    expect(row(table, "Difference")).toEqual(final.result);
  });
});
