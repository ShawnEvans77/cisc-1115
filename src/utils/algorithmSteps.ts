// Step-by-step recordings of the four note algorithms, used by the notes visualizer.
// Each recorder follows the matching implementation in src/data/notes line for line,
// and every step names the lines it is on by a piece of their text (an "anchor").

import type { AlgorithmId } from "../types";

export type { AlgorithmId };

export type BarState = "compare" | "swap" | "min" | "sorted" | "found" | "out";

export type Pointer = { index: number; label: string };

export type AlgorithmStep = {
  // ids of the original elements, left to right, so a bar can follow its value when it moves
  order: number[];
  values: number[];
  states: Partial<Record<number, BarState>>;
  pointers: Pointer[];
  lines: string[];
  message: string;
  vars: [string, string][];
  rowCount: number;
  comparisons: number;
  swaps: number;
};

export type AlgorithmRun = {
  steps: AlgorithmStep[];
  header: string[];
  rows: string[][];
};

type StepDetails = Pick<AlgorithmStep, "states" | "pointers" | "lines" | "message" | "vars">;

export function formatArray(values: number[]): string {
  return `{${values.join(", ")}}`;
}

function createRecorder(input: number[], header: string[]) {
  const values = [...input];
  const order = input.map((_, i) => i);
  const rows: string[][] = [];
  const steps: AlgorithmStep[] = [];
  let comparisons = 0;
  let swaps = 0;

  return {
    values,
    rows,
    compare() {
      comparisons++;
    },
    swap(a: number, b: number) {
      [values[a], values[b]] = [values[b], values[a]];
      [order[a], order[b]] = [order[b], order[a]];
      swaps++;
    },
    step(details: StepDetails) {
      steps.push({
        ...details,
        order: [...order],
        values: [...values],
        rowCount: rows.length,
        comparisons,
        swaps,
      });
    },
    finish(): AlgorithmRun {
      return { steps, header, rows };
    },
  };
}

function statesFor(length: number, pick: (index: number) => BarState | undefined) {
  const states: Partial<Record<number, BarState>> = {};
  for (let i = 0; i < length; i++) {
    const state = pick(i);
    if (state) states[i] = state;
  }
  return states;
}

function onlyInRange(pointers: Pointer[], length: number): Pointer[] {
  return pointers.filter(pointer => pointer.index >= 0 && pointer.index < length);
}

// Expects nums to be sorted, like the real method.
export function recordBinarySearch(nums: number[], target: number): AlgorithmRun {
  const rec = createRecorder(nums, ["Start", "Mid", "End", "A[mid]"]);
  const n = nums.length;
  let start = 0;
  let end = n - 1;
  const outside = (s: number, e: number) => (i: number) => (i < s || i > e ? "out" : undefined);

  rec.step({
    lines: ["int start = 0;", "int end = nums.length - 1;"],
    message: `We are looking for ${target}. start begins at index 0 and end at the last index, ${end}.`,
    states: {},
    pointers: onlyInRange([{ index: start, label: "start" }, { index: end, label: "end" }], n),
    vars: [["target", String(target)], ["start", String(start)], ["end", String(end)]],
  });

  while (start <= end) {
    const mid = Math.trunc((start + end) / 2);
    const sum = start + end;
    const truncated = sum % 2 !== 0 ? `, which is ${sum / 2} truncated to ${mid}` : ` = ${mid}`;
    const rangePointers = [
      { index: start, label: "start" },
      { index: mid, label: "mid" },
      { index: end, label: "end" },
    ];

    rec.step({
      lines: ["while (start <= end)", "int mid = (start + end) / 2;"],
      message: `start (${start}) <= end (${end}), so we keep going. mid = (${start} + ${end}) / 2${truncated}.`,
      states: { ...statesFor(n, outside(start, end)), [mid]: "compare" },
      pointers: rangePointers,
      vars: [["target", String(target)], ["start", String(start)], ["mid", String(mid)], ["end", String(end)], ["nums[mid]", String(nums[mid])]],
    });

    rec.compare();
    const midValue = nums[mid];

    if (target === midValue) {
      rec.rows.push([String(start), String(mid), String(end), `${midValue} (found)`]);
      rec.step({
        lines: ["if (target == nums[mid])", "return mid;"],
        message: `nums[${mid}] is ${midValue}, which is the target. The method returns ${mid}.`,
        states: { ...statesFor(n, outside(start, end)), [mid]: "found" },
        pointers: rangePointers,
        vars: [["target", String(target)], ["start", String(start)], ["mid", String(mid)], ["end", String(end)], ["returns", String(mid)]],
      });
      return rec.finish();
    }

    rec.rows.push([String(start), String(mid), String(end), String(midValue)]);

    if (target < midValue) {
      end = mid - 1;
      rec.step({
        lines: ["else if (target < nums[mid])", "end = mid - 1;"],
        message: `${target} < ${midValue}, so the middle is too big. Ignore the right half: end = mid - 1 = ${end}.`,
        states: statesFor(n, outside(start, end)),
        pointers: onlyInRange([{ index: start, label: "start" }, { index: end, label: "end" }], n),
        vars: [["target", String(target)], ["start", String(start)], ["end", String(end)]],
      });
    } else {
      start = mid + 1;
      rec.step({
        lines: ["else if (target > nums[mid])", "start = mid + 1;"],
        message: `${target} > ${midValue}, so the middle is too small. Ignore the left half: start = mid + 1 = ${start}.`,
        states: statesFor(n, outside(start, end)),
        pointers: onlyInRange([{ index: start, label: "start" }, { index: end, label: "end" }], n),
        vars: [["target", String(target)], ["start", String(start)], ["end", String(end)]],
      });
    }
  }

  rec.rows.push([String(start), "-", String(end), "-"]);
  rec.step({
    lines: ["while (start <= end)", "return -1;"],
    message: `start (${start}) is now past end (${end}), so the loop stops. ${target} is not in the array and the method returns -1.`,
    states: statesFor(n, () => "out"),
    pointers: onlyInRange([{ index: start, label: "start" }, { index: end, label: "end" }], n),
    vars: [["target", String(target)], ["start", String(start)], ["end", String(end)], ["returns", "-1"]],
  });
  return rec.finish();
}

export function recordLinearSearch(nums: number[], target: number): AlgorithmRun {
  const rec = createRecorder(nums, ["i", "nums[i]", "Match?"]);
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    rec.compare();
    const checked = (index: number) => (index < i ? "out" : undefined);

    if (nums[i] === target) {
      rec.rows.push([String(i), String(nums[i]), "yes"]);
      rec.step({
        lines: ["if (nums[i] == target)", "return i;"],
        message: `nums[${i}] is ${nums[i]}, which matches the target. The method returns ${i}.`,
        states: { ...statesFor(n, checked), [i]: "found" },
        pointers: [{ index: i, label: "i" }],
        vars: [["target", String(target)], ["i", String(i)], ["nums[i]", String(nums[i])], ["returns", String(i)]],
      });
      return rec.finish();
    }

    rec.rows.push([String(i), String(nums[i]), "no"]);
    rec.step({
      lines: ["for (int i = 0; i < nums.length; i++)", "if (nums[i] == target)"],
      message: `nums[${i}] is ${nums[i]}, not ${target}. Move on to the next index.`,
      states: { ...statesFor(n, checked), [i]: "compare" },
      pointers: [{ index: i, label: "i" }],
      vars: [["target", String(target)], ["i", String(i)], ["nums[i]", String(nums[i])]],
    });
  }

  rec.step({
    lines: ["return -1;"],
    message: `Every element has been checked and none of them is ${target}, so the method returns -1.`,
    states: statesFor(n, () => "out"),
    pointers: [],
    vars: [["target", String(target)], ["i", String(n)], ["returns", "-1"]],
  });
  return rec.finish();
}

export function recordBubbleSort(nums: number[]): AlgorithmRun {
  const rec = createRecorder(nums, ["Pass", "Swaps", "Array afterwards"]);
  const values = rec.values;
  const n = values.length;
  // positions at or after this index are already in their final place
  let lockedFrom = n;
  const locked = (i: number) => (i >= lockedFrom ? "sorted" : undefined);

  for (let i = 0; i < n; i++) {
    let swapped = false;
    let passSwaps = 0;

    rec.step({
      lines: ["for (int i = 0; i < nums.length; i++)", "boolean swapped = false;"],
      message: n - i - 1 > 0
        ? `Pass ${i + 1} begins. j walks from 0 up to index ${n - i - 2}, comparing each pair of neighbors.`
        : `Pass ${i + 1} begins, but there are no unsorted neighbors left to compare.`,
      states: statesFor(n, locked),
      pointers: [],
      vars: [["i", String(i)], ["swapped", "false"]],
    });

    for (let j = 0; j < n - i - 1; j++) {
      rec.compare();
      const pair = (index: number) => (index === j || index === j + 1 ? "compare" : locked(index));
      const bigger = values[j] > values[j + 1];

      rec.step({
        lines: ["for (int j = 0; j < nums.length - i - 1; j++)", "if (nums[j] > nums[j+1])"],
        message: bigger
          ? `Is nums[${j}] (${values[j]}) > nums[${j + 1}] (${values[j + 1]})? Yes, they are out of order.`
          : `Is nums[${j}] (${values[j]}) > nums[${j + 1}] (${values[j + 1]})? No, leave them alone.`,
        states: statesFor(n, pair),
        pointers: [{ index: j, label: "j" }, { index: j + 1, label: "j+1" }],
        vars: [["i", String(i)], ["j", String(j)], ["swapped", String(swapped)]],
      });

      if (bigger) {
        rec.swap(j, j + 1);
        swapped = true;
        passSwaps++;
        rec.step({
          lines: ["int temp = nums[j+1];", "nums[j+1] = nums[j];", "nums[j] = temp;", "swapped = true;"],
          message: `Swap them using temp. ${values[j + 1]} moves right and ${values[j]} moves left. swapped is now true.`,
          states: statesFor(n, index => (index === j || index === j + 1 ? "swap" : locked(index))),
          pointers: [{ index: j, label: "j" }, { index: j + 1, label: "j+1" }],
          vars: [["i", String(i)], ["j", String(j)], ["temp", String(values[j])], ["swapped", "true"]],
        });
      }
    }

    rec.rows.push([String(i + 1), String(passSwaps), formatArray(values)]);

    if (!swapped) {
      lockedFrom = 0;
      rec.step({
        lines: ["if (swapped == false)", "break;"],
        message: `No swaps happened in pass ${i + 1}, so the array is already sorted and the loop breaks early.`,
        states: statesFor(n, () => "sorted"),
        pointers: [],
        vars: [["i", String(i)], ["swapped", "false"]],
      });
      break;
    }

    lockedFrom = n - i - 1;
    rec.step({
      lines: ["if (swapped == false)"],
      message: `End of pass ${i + 1}. The biggest remaining value, ${values[lockedFrom]}, has bubbled to index ${lockedFrom} and is locked in. swapped is true, so we need another pass.`,
      states: statesFor(n, locked),
      pointers: [],
      vars: [["i", String(i)], ["swapped", "true"]],
    });
  }

  return rec.finish();
}

export function recordSelectionSort(nums: number[]): AlgorithmRun {
  const rec = createRecorder(nums, ["Position", "Min", "Array afterwards"]);
  const values = rec.values;
  const n = values.length;

  for (let i = 0; i < n; i++) {
    let min = values[i];
    let minIndex = i;
    const done = (index: number) => (index < i ? "sorted" : undefined);

    rec.step({
      lines: ["int min = nums[i];", "int minIndex = i;"],
      message: `Fill position ${i}. Start by assuming nums[${i}] (${min}) is the smallest value from here on.`,
      states: { ...statesFor(n, done), [i]: "min" },
      pointers: [{ index: i, label: "i" }],
      vars: [["i", String(i)], ["min", String(min)], ["minIndex", String(minIndex)]],
    });

    for (let j = i + 1; j < n; j++) {
      rec.compare();
      const smaller = values[j] < min;
      const previousMin = min;
      if (smaller) {
        min = values[j];
        minIndex = j;
      }

      rec.step({
        lines: smaller
          ? ["if (nums[j] < min)", "min = nums[j];", "minIndex = j;"]
          : ["for (int j = i + 1; j < nums.length; j++)", "if (nums[j] < min)"],
        message: smaller
          ? `Is nums[${j}] (${values[j]}) < min (${previousMin})? Yes, so ${values[j]} is the new smallest and minIndex = ${j}.`
          : `Is nums[${j}] (${values[j]}) < min (${previousMin})? No, the smallest is still ${min}.`,
        states: { ...statesFor(n, done), [minIndex]: "min", ...(smaller ? {} : { [j]: "compare" as const }) },
        pointers: [{ index: i, label: "i" }, { index: j, label: "j" }],
        vars: [["i", String(i)], ["j", String(j)], ["min", String(min)], ["minIndex", String(minIndex)]],
      });
    }

    const moved = minIndex !== i;
    const fromValue = values[i];
    if (moved) rec.swap(i, minIndex);
    rec.rows.push([String(i), String(min), formatArray(values)]);

    rec.step({
      lines: ["nums[minIndex] = nums[i];", "nums[i] = min;"],
      message: moved
        ? `Swap the smallest, ${min}, into position ${i}. ${fromValue} goes to index ${minIndex}. Position ${i} is now final.`
        : `The smallest, ${min}, is already at position ${i}, so the swap leaves it in place. Position ${i} is now final.`,
      states: statesFor(n, index => (index <= i ? "sorted" : moved && index === minIndex ? "swap" : undefined)),
      pointers: [{ index: i, label: "i" }],
      vars: [["i", String(i)], ["min", String(min)], ["minIndex", String(minIndex)]],
    });
  }

  return rec.finish();
}

export type AlgorithmConfig = {
  kind: "search" | "sort";
  defaultArray: number[];
  defaultTarget?: number;
  record: (nums: number[], target: number) => AlgorithmRun;
};

// Default inputs are the examples traced in each note, so the visual and the
// written trace line up.
export const ALGORITHMS: Record<AlgorithmId, AlgorithmConfig> = {
  binarysearch: {
    kind: "search",
    defaultArray: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 30, 36, 40, 45, 47, 49, 100],
    defaultTarget: 36,
    record: recordBinarySearch,
  },
  linearsearch: {
    kind: "search",
    defaultArray: [14, 3, 27, 8, 19, 42, 5, 31],
    defaultTarget: 19,
    record: recordLinearSearch,
  },
  bubblesort: {
    kind: "sort",
    defaultArray: [10, 9, 8, 7, 6, 50],
    record: nums => recordBubbleSort(nums),
  },
  selectionsort: {
    kind: "sort",
    defaultArray: [29, 10, 14, 37, 13],
    record: nums => recordSelectionSort(nums),
  },
};

// More bars than this get too thin on a phone, and a sort takes too long to watch.
export const MIN_LENGTH = 2;
export const MAX_LENGTH = 20;

// The range of a Java int.
export const INT_MIN = -2147483648;
export const INT_MAX = 2147483647;

// Parses one whole number that fits in a Java int, or explains what is wrong.
export function parseJavaInt(text: string): { value: number } | { error: string } {
  const trimmed = text.trim();
  if (!/^-?\d+$/.test(trimmed)) return { error: `"${trimmed}" is not a whole number.` };
  const value = Number(trimmed);
  if (value < INT_MIN || value > INT_MAX) return { error: `${trimmed} does not fit in a Java int.` };
  return { value: value + 0 }; // + 0 turns -0 into 0
}

// Parses "5, 3, 8" (commas or spaces) into numbers, or explains what is wrong.
export function parseNumberList(text: string): { values: number[] } | { error: string } {
  const parts = text.split(/[\s,{}]+/).filter(Boolean);
  if (parts.length < MIN_LENGTH || parts.length > MAX_LENGTH) {
    return { error: `Enter between ${MIN_LENGTH} and ${MAX_LENGTH} numbers.` };
  }

  const values: number[] = [];
  for (const part of parts) {
    const parsed = parseJavaInt(part);
    if ("error" in parsed) return parsed;
    values.push(parsed.value);
  }
  return { values };
}

// Index of the first line containing the anchor, or -1.
export function findLine(code: string, anchor: string): number {
  return code.split("\n").findIndex(line => line.includes(anchor));
}
