// Adds or subtracts two binary numbers the way it is done by hand, one column at a
// time from the right, and records every column as a step. Addition carries;
// subtraction borrows from the nearest 1 to the left.

export type ArithmeticOp = "add" | "subtract";

export const MAX_BITS = 16;

export type ArithmeticStep = {
  title: string;
  message: string;
  // the column arithmetic, such as "1 + 1 + 1 = 11"
  math: string | null;
  // display column being worked on, 0 = leftmost; null before and after the columns
  column: number | null;
  // carries (addition) or the new value of a borrowed-from column (subtraction)
  marks: string[];
  top: string[];
  // top digits changed by a borrow, shown crossed out under their new value
  struck: boolean[];
  bottom: string[];
  result: string[];
};

export type ArithmeticRun = {
  op: ArithmeticOp;
  topDigits: string;
  bottomDigits: string;
  topValue: number;
  bottomValue: number;
  resultValue: number;
  // the answer without leading zeros
  answer: string;
  width: number;
  steps: ArithmeticStep[];
};

const OP_SYMBOL: Record<ArithmeticOp, string> = { add: "+", subtract: "-" };

function placeName(place: number): string {
  return `${2 ** place}s`;
}

function toBinary(value: number): string {
  return value.toString(2);
}

function parseValue(digits: string): number {
  return [...digits].reduce((total, digit) => total * 2 + Number(digit), 0);
}

export function parseBinaryInput(text: string, which: "top" | "bottom"): { digits: string } | { error: string } {
  const digits = text.replace(/\s+/g, "");
  if (digits === "") return { error: `Type a binary number for the ${which} row.` };
  if (/[^01]/.test(digits)) return { error: `The ${which} number can only use the digits 0 and 1.` };
  if (digits.length > MAX_BITS) return { error: `Use at most ${MAX_BITS} digits for the ${which} number.` };
  return { digits };
}

// Lines a number up on the right inside `width` columns, with blanks on the left.
function padRow(digits: string, width: number): string[] {
  return [...Array(width - digits.length).fill(""), ...digits];
}

function snapshot(step: ArithmeticStep): ArithmeticStep {
  return {
    ...step,
    marks: [...step.marks],
    top: [...step.top],
    struck: [...step.struck],
    bottom: [...step.bottom],
    result: [...step.result],
  };
}

function stripLeadingZeros(digits: string): string {
  return digits.replace(/^0+(?=.)/, "");
}

function finish(run: Omit<ArithmeticRun, "answer" | "resultValue">, state: ArithmeticStep, written: string): ArithmeticRun {
  const answer = stripLeadingZeros(written);
  const resultValue = parseValue(answer);
  const symbol = OP_SYMBOL[run.op];
  const dropped = answer !== written
    ? `Zeros at the front do not change the value, so ${written} is written as ${answer}. `
    : "";

  run.steps.push(snapshot({
    ...state,
    title: "The answer",
    column: null,
    math: `${run.topDigits} ${symbol} ${run.bottomDigits} = ${answer}`,
    message: `${dropped}Check in base 10: ${run.topValue} ${symbol} ${run.bottomValue} = ${resultValue}, and ${answer} is ${resultValue}.`,
  }));

  return { ...run, answer, resultValue };
}

function addSteps(topDigits: string, bottomDigits: string): ArithmeticRun {
  const columns = Math.max(topDigits.length, bottomDigits.length);
  const width = columns + 1;
  const run = {
    op: "add" as const,
    topDigits,
    bottomDigits,
    topValue: parseValue(topDigits),
    bottomValue: parseValue(bottomDigits),
    width,
    steps: [] as ArithmeticStep[],
  };

  const state: ArithmeticStep = {
    title: "Line up the numbers",
    message: "Line the numbers up on the right, then add one column at a time, starting from the right. Just like in base 10, a column that adds up to more than one digit carries into the next column.",
    math: null,
    column: null,
    marks: Array(width).fill(""),
    top: padRow(topDigits, width),
    struck: Array(width).fill(false),
    bottom: padRow(bottomDigits, width),
    result: Array(width).fill(""),
  };
  run.steps.push(snapshot(state));

  let carry = 0;
  for (let place = 0; place < columns; place++) {
    const column = width - 1 - place;
    const a = Number(state.top[column] || "0");
    const b = Number(state.bottom[column] || "0");
    const sum = a + b + carry;
    const digit = sum >= 2 ? sum - 2 : sum;
    const carryOut = sum >= 2 ? 1 : 0;

    state.result[column] = String(digit);
    if (carryOut) state.marks[column - 1] = "1";

    const blank = state.top[column] === "" || state.bottom[column] === "" ? "An empty spot counts as 0. " : "";
    const parts = carry ? "Add the two digits and the 1 carried in." : "Add the two digits.";
    const outcome = [
      "The sum is 0, so write 0.",
      "The sum is 1, so write 1.",
      "The sum is 2, which is 10 in binary. Write the 0 and carry the 1 to the next column.",
      "The sum is 3, which is 11 in binary. Write a 1 and carry the other 1 to the next column.",
    ][sum];

    run.steps.push(snapshot({
      ...state,
      title: `The ${placeName(place)} column`,
      column,
      math: `${[a, b, ...(carry ? [1] : [])].join(" + ")} = ${toBinary(sum)}`,
      message: `${blank}${parts} ${outcome}`,
    }));
    carry = carryOut;
  }

  if (carry) {
    state.result[0] = "1";
    run.steps.push(snapshot({
      ...state,
      title: "Bring down the last carry",
      column: 0,
      math: "1",
      message: "There are no digits left to add, but a 1 was carried out of the last column. Write it at the front of the answer.",
    }));
  }

  return finish(run, state, state.result.join(""));
}

function subtractSteps(topDigits: string, bottomDigits: string): ArithmeticRun {
  const width = Math.max(topDigits.length, bottomDigits.length);
  const run = {
    op: "subtract" as const,
    topDigits,
    bottomDigits,
    topValue: parseValue(topDigits),
    bottomValue: parseValue(bottomDigits),
    width,
    steps: [] as ArithmeticStep[],
  };

  const state: ArithmeticStep = {
    title: "Line up the numbers",
    message: "Line the numbers up on the right, then subtract one column at a time, starting from the right. When the top digit is too small, borrow from the left, just like in base 10.",
    math: null,
    column: null,
    marks: Array(width).fill(""),
    top: padRow(topDigits, width),
    struck: Array(width).fill(false),
    bottom: padRow(bottomDigits, width),
    result: Array(width).fill(""),
  };
  run.steps.push(snapshot(state));

  // the top digits as they stand after any borrowing: 0, 1, or 2 (written 10)
  const current = state.top.map(digit => Number(digit || "0"));

  for (let place = 0; place < width; place++) {
    const column = width - 1 - place;
    const b = Number(state.bottom[column] || "0");
    const blank = state.bottom[column] === "" ? "An empty spot counts as 0. " : "";

    if (current[column] >= b) {
      const digit = current[column] - b;
      const changed = state.struck[column]
        ? `An earlier borrow changed this column's top digit to ${current[column]}. `
        : "";
      state.result[column] = String(digit);
      run.steps.push(snapshot({
        ...state,
        title: `The ${placeName(place)} column`,
        column,
        math: `${current[column]} - ${b} = ${digit}`,
        message: `${blank}${changed}${current[column]} - ${b} = ${digit}, so write ${digit}.`,
      }));
      continue;
    }

    // 0 - 1: borrow from the nearest column to the left that still has a 1
    let lender = column - 1;
    while (current[lender] === 0) lender--;

    current[lender] -= 1;
    for (let between = lender + 1; between < column; between++) current[between] = 1;
    current[column] = 2;
    for (let changed = lender; changed <= column; changed++) {
      state.struck[changed] = true;
      state.marks[changed] = toBinary(current[changed]);
    }
    state.result[column] = "1";

    const lenderPlace = width - 1 - lender;
    const borrow = lender === column - 1
      ? "The 1 in the next column becomes 0, and this column becomes 10, which is 2."
      : `The nearest 1 is in the ${placeName(lenderPlace)} column. It becomes 0, every 0 between it and this column becomes 1, and this column becomes 10, which is 2.`;

    run.steps.push(snapshot({
      ...state,
      title: `The ${placeName(place)} column`,
      column,
      math: "10 - 1 = 1",
      message: `0 - 1 cannot be done, so borrow. ${borrow} Now 10 - 1 = 1, so write 1.`,
    }));
  }

  return finish(run, state, state.result.join(""));
}

export function runArithmetic(op: ArithmeticOp, topText: string, bottomText: string): ArithmeticRun | { error: string } {
  const top = parseBinaryInput(topText, "top");
  if ("error" in top) return top;
  const bottom = parseBinaryInput(bottomText, "bottom");
  if ("error" in bottom) return bottom;

  if (op === "add") return addSteps(top.digits, bottom.digits);

  if (parseValue(bottom.digits) > parseValue(top.digits)) {
    return { error: "The bottom number is bigger than the top one, so the answer would be negative. Put the bigger number on top, or press Swap." };
  }
  return subtractSteps(top.digits, bottom.digits);
}
