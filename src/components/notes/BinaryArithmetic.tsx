import { useMemo, useState } from "react";
import { useStepper } from "../../hooks/useStepper";
import type { ArithmeticPreset } from "../../types";
import { runArithmetic, type ArithmeticOp, type ArithmeticStep } from "../../utils/binaryArithmetic";
import { cx } from "../../utils/ui";
import { ContentBlock } from "../ui/ContentBlock";
import { StepControls, StepCounter } from "./StepControls";

type BinaryArithmeticProps = ArithmeticPreset;

type SheetProps = {
  op: ArithmeticOp;
  step: ArithmeticStep;
  previous: ArithmeticStep | undefined;
  done: boolean;
};

const OPERATIONS: { op: ArithmeticOp; label: string }[] = [
  { op: "add", label: "Add +" },
  { op: "subtract", label: "Subtract −" },
];

const SYMBOLS: Record<ArithmeticOp, string> = { add: "+", subtract: "−" };

const PLAY_DELAY = 1400;

// Random inputs stay small enough to read: up to six binary digits.
const RANDOM_MAX = 63;

function randomInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

// The four rows of the problem as it would be written on paper, one table column
// per binary place, with the column being worked on lit up.
function Sheet({ op, step, previous, done }: SheetProps) {
  const leadingZeros = done ? (step.result.join("").match(/^0+(?=.)/)?.[0].length ?? 0) : 0;
  const firstWritten = step.result.findIndex(digit => digit !== "");

  const cell = (column: number, content: string, extra?: string | false) => (
    <td key={column} className={cx("arith-cell", column === step.column && "arith-cell--active", extra)}>
      {content}
    </td>
  );

  return (
    <div className="arith-stage">
      <table className={cx("arith-sheet", done && "arith-sheet--done")}>
        <tbody>
          <tr className="arith-row--marks">
            <th scope="row">{op === "add" ? "carry" : "borrow"}</th>
            {step.marks.map((mark, column) => cell(column, mark, mark !== "" && previous?.marks[column] !== mark && "arith-cell--new"))}
          </tr>
          <tr className="arith-row--top">
            <th scope="row" aria-label="top number" />
            {step.top.map((digit, column) => cell(column, digit, step.struck[column] && "arith-cell--struck"))}
          </tr>
          <tr className="arith-row--bottom">
            <th scope="row" aria-label={op === "add" ? "plus" : "minus"}>{SYMBOLS[op]}</th>
            {step.bottom.map((digit, column) => cell(column, digit))}
          </tr>
          <tr className="arith-row--result">
            <th scope="row" aria-label="answer" />
            {step.result.map((digit, column) => cell(
              column,
              digit,
              cx(
                digit !== "" && previous?.result[column] === "" && "arith-cell--new",
                column >= firstWritten && column < firstWritten + leadingZeros && "arith-cell--dim",
              ),
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function BinaryArithmetic({ op: initialOp, top: initialTop, bottom: initialBottom }: BinaryArithmeticProps) {
  const [op, setOp] = useState(initialOp);
  const [topText, setTopText] = useState(initialTop);
  const [bottomText, setBottomText] = useState(initialBottom);
  const run = useMemo(() => runArithmetic(op, topText, bottomText), [op, topText, bottomText]);
  const steps = "error" in run ? [] : run.steps;
  // changing the numbers or the operation starts the walkthrough over, paused
  const stepper = useStepper(steps.length, `${op}|${topText}|${bottomText}`, PLAY_DELAY);
  const { index } = stepper;
  const done = steps.length > 0 && stepper.atEnd;

  function swap() {
    setTopText(bottomText);
    setBottomText(topText);
  }

  function loadRandom() {
    const a = randomInt(op === "add" ? 1 : 2, RANDOM_MAX);
    const b = randomInt(1, op === "add" ? RANDOM_MAX : a);
    setTopText(a.toString(2));
    setBottomText(b.toString(2));
  }

  const step = steps[index];

  return (
    <ContentBlock
      label="Binary calculator"
      headerSlot={steps.length > 0 && <StepCounter stepper={stepper} />}
    >
      <div className="arith tool-keys" tabIndex={0} onKeyDown={stepper.handleKeyDown} aria-label="Binary calculator. Use the arrow keys to step and space to play.">
        <div className="arith-inputs">
          <div className="tool-field">
            <span className="tool-field-label">operation</span>
            <div className="tool-segmented arith-ops" role="group" aria-label="Operation">
              {OPERATIONS.map(option => (
                <button
                  key={option.op}
                  type="button"
                  className={cx("tool-segmented-btn", option.op === op && "tool-segmented-btn--active")}
                  aria-pressed={option.op === op}
                  onClick={() => setOp(option.op)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <label className="tool-field arith-field">
            <span className="tool-field-label">top number</span>
            <input
              className="tool-input"
              value={topText}
              onChange={event => setTopText(event.target.value)}
              placeholder="e.g. 1011"
              inputMode="numeric"
              spellCheck={false}
              autoComplete="off"
            />
          </label>
          <label className="tool-field arith-field">
            <span className="tool-field-label">bottom number</span>
            <input
              className="tool-input"
              value={bottomText}
              onChange={event => setBottomText(event.target.value)}
              placeholder="e.g. 110"
              inputMode="numeric"
              spellCheck={false}
              autoComplete="off"
            />
          </label>
          <div className="arith-input-actions">
            <button type="button" className="tool-btn arith-action" onClick={swap}>⇅ Swap</button>
            <button type="button" className="tool-btn arith-action" onClick={loadRandom}>Random</button>
          </div>
        </div>

        {"error" in run ? (
          <p className="tool-notice tool-notice--error" role="alert">{run.error}</p>
        ) : (
          <>
            <Sheet op={op} step={step} previous={steps[index - 1]} done={done} />

            <div className="arith-explain" aria-live="polite">
              <p className="arith-step-title">{step.title}</p>
              {step.math && <p className="arith-math">{step.math}</p>}
              <p className="arith-message">{step.message}</p>
            </div>

            {done && (
              <p className="tool-answer">
                <span className="tool-answer-side">{run.topDigits} {SYMBOLS[op]} {run.bottomDigits}</span>
                <span className="tool-answer-equals">=</span>
                <strong className="tool-answer-side">{run.answer}<small>binary</small></strong>
                <span className="arith-answer-decimal">{run.resultValue} in base 10</span>
              </p>
            )}

            <StepControls stepper={stepper} className="arith-transport" playable endLabel="Show answer" />
          </>
        )}
      </div>
    </ContentBlock>
  );
}
