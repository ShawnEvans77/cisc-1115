import { describe, expect, it } from "vitest";
import { notes } from "../data/notes";
import { stripJavaComments } from "./javaComments";
import { parsePrompt, parseTable } from "./parsePrompt";
import {
  ALGORITHMS,
  findLine,
  formatArray,
  parseJavaInt,
  parseNumberList,
  recordBinarySearch,
  recordBubbleSort,
  recordLinearSearch,
  recordSelectionSort,
  type AlgorithmId,
  type AlgorithmRun,
} from "./algorithmSteps";

const entries = notes.flatMap(topic => topic.entries);

function noteFor(id: AlgorithmId) {
  const entry = entries.find(e => e.visualizer === id);
  if (!entry) throw new Error(`no note uses the ${id} visualizer`);
  const code = entry.sections.find(section => section.type === "code")?.content ?? "";
  const overview = entry.sections.find(section => section.type === "text")?.content ?? "";
  return { code, overview };
}

function firstTable(text: string): string[][] {
  const table = parsePrompt(text).find(segment => segment.type === "table");
  if (!table) throw new Error("no table");
  return parseTable(table.content);
}

// Small deterministic generator so the random cases are the same on every run.
function seeded(seed: number) {
  let state = seed;
  return (max: number) => {
    state = (state * 1103515245 + 12345) % 2147483648;
    return state % max;
  };
}

function randomArrays(count: number): number[][] {
  const next = seeded(7);
  return Array.from({ length: count }, () =>
    Array.from({ length: 2 + next(15) }, () => next(40) - 5),
  );
}

const ascending = (values: number[]) => [...values].sort((a, b) => a - b);

function runsFor(id: AlgorithmId): AlgorithmRun[] {
  const config = ALGORITHMS[id];
  const arrays = [config.defaultArray, ...randomArrays(40)];
  return arrays.flatMap(values => {
    const input = id === "binarysearch" ? ascending(values) : values;
    return [config.record(input, config.defaultTarget ?? 0), config.record(input, input[input.length - 1]), config.record(input, 1000)];
  });
}

describe("algorithm steps line up with the note code", () => {
  for (const id of Object.keys(ALGORITHMS) as AlgorithmId[]) {
    it(`${id}: every highlighted line exists exactly once in the implementation`, () => {
      const { code } = noteFor(id);
      const lines = code.split("\n");
      const anchors = new Set(runsFor(id).flatMap(run => run.steps.flatMap(step => step.lines)));

      // the code panel can hide comments, so the anchors must work both ways
      const strippedLines = stripJavaComments(code).split("\n");

      for (const anchor of anchors) {
        expect(lines.filter(line => line.includes(anchor)), `anchor "${anchor}"`).toHaveLength(1);
        expect(strippedLines.filter(line => line.includes(anchor)), `anchor "${anchor}" without comments`).toHaveLength(1);
        expect(findLine(code, anchor)).toBeGreaterThanOrEqual(0);
      }
    });

    it(`${id}: every step is well formed`, () => {
      const problems: string[] = [];
      for (const run of runsFor(id)) {
        if (run.steps.length === 0) problems.push("a run with no steps");
        if (run.rows.some(row => row.length !== run.header.length)) problems.push("a trace row with the wrong number of cells");
        if (run.steps.at(-1)?.rowCount !== run.rows.length) problems.push("the last step hides trace rows");
        for (const step of run.steps) {
          if (step.values.length !== step.order.length) problems.push("values and order differ in length");
          if (step.rowCount > run.rows.length) problems.push("rowCount past the end of the table");
          if (step.pointers.some(p => p.index < 0 || p.index >= step.values.length)) problems.push("a pointer outside the array");
        }
      }
      expect(problems).toEqual([]);
    });
  }
});

describe("sorting recorders", () => {
  it("bubble sort and selection sort finish sorted", () => {
    for (const values of [ALGORITHMS.bubblesort.defaultArray, ALGORITHMS.selectionsort.defaultArray, ...randomArrays(60)]) {
      for (const run of [recordBubbleSort(values), recordSelectionSort(values)]) {
        const last = run.steps.at(-1)!;
        expect(last.values).toEqual(ascending(values));
        // the ids are a permutation that still points at the original values
        expect(last.order.map(id => values[id])).toEqual(last.values);
        expect(Object.values(last.states).every(state => state === "sorted")).toBe(true);
        expect(Object.keys(last.states)).toHaveLength(values.length);
      }
    }
  });

  it("bubble sort stops after a pass with no swaps", () => {
    const run = recordBubbleSort([1, 2, 3, 4]);
    expect(run.rows).toEqual([["1", "0", "{1, 2, 3, 4}"]]);
    expect(run.steps.at(-1)?.lines).toContain("break;");
  });

  it("bubble sort's first pass matches the note", () => {
    const run = recordBubbleSort(ALGORITHMS.bubblesort.defaultArray);
    expect(run.rows[0]).toEqual(["1", "4", "{9, 8, 7, 6, 10, 50}"]);
    expect(run.rows.at(-1)?.[2]).toBe("{6, 7, 8, 9, 10, 50}");
  });

  it("selection sort reproduces the table in the note", () => {
    const [, ...noteRows] = firstTable(noteFor("selectionsort").overview);
    expect(recordSelectionSort(ALGORITHMS.selectionsort.defaultArray).rows).toEqual(noteRows);
  });
});

describe("search recorders", () => {
  it("binary search reproduces the table in the note", () => {
    const [, ...noteRows] = firstTable(noteFor("binarysearch").overview);
    const { defaultArray, defaultTarget } = ALGORITHMS.binarysearch;
    expect(recordBinarySearch(defaultArray, defaultTarget!).rows).toEqual(noteRows);
  });

  it("binary search returns the same index as the Java method would", () => {
    for (const values of randomArrays(60).map(ascending)) {
      for (const target of [...values, -100, 1000, 7]) {
        const run = recordBinarySearch(values, target);
        const returned = run.steps.at(-1)!.vars.find(([name]) => name === "returns")?.[1];
        expect(returned).toBeDefined();
        if (values.includes(target)) {
          expect(values[Number(returned)]).toBe(target);
        } else {
          expect(returned).toBe("-1");
          expect(run.rows.at(-1)?.[1]).toBe("-");
        }
      }
    }
  });

  it("linear search returns the first match or -1", () => {
    for (const values of randomArrays(60)) {
      for (const target of [...values, 1000]) {
        const run = recordLinearSearch(values, target);
        const returned = run.steps.at(-1)!.vars.find(([name]) => name === "returns")?.[1];
        expect(returned).toBe(String(values.indexOf(target)));
        expect(run.steps.at(-1)!.comparisons).toBe(values.includes(target) ? values.indexOf(target) + 1 : values.length);
      }
    }
  });
});

describe("parseNumberList", () => {
  it("accepts commas, spaces, and braces", () => {
    expect(parseNumberList("{5, 3,8  -2}")).toEqual({ values: [5, 3, 8, -2] });
  });

  it("accepts anything a Java int can hold", () => {
    expect(parseNumberList("-2147483648, 2147483647, -500, 0")).toEqual({ values: [-2147483648, 2147483647, -500, 0] });
    expect(parseJavaInt(" -0 ")).toEqual({ value: 0 });
  });

  it("rejects anything that is not a short list of whole numbers", () => {
    expect(parseNumberList("4")).toHaveProperty("error");
    expect(parseNumberList("1, 2.5")).toHaveProperty("error");
    expect(parseNumberList("1, x")).toHaveProperty("error");
    expect(parseNumberList("1, 2147483648")).toHaveProperty("error");
    expect(parseNumberList("1, -2147483649")).toHaveProperty("error");
    expect(parseNumberList(Array(21).fill("1").join(","))).toHaveProperty("error");
  });
});

it("formats arrays the way the notes write them", () => {
  expect(formatArray([1, 2, 3])).toBe("{1, 2, 3}");
});
