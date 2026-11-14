import { useEffect, useMemo, useState, type KeyboardEvent } from "react";
import type { ArithmeticPreset } from "../../types";
import { runArithmetic, type ArithmeticOp, type ArithmeticStep } from "../../utils/binaryArithmetic";
import { cx } from "../../utils/ui";
import { ContentBlock } from "../ui/ContentBlock";

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

const IGNORED_KEY_TARGETS = new Set(["INPUT", "SELECT", "TEXTAREA", "BUTTON"]);

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
  // Position in the walkthrough, tied to the problem it belongs to, so changing the
  // numbers or the operation starts over at the first step, paused.
  const [view, setView] = useState({ key: "", index: 0, playing: false });

  const run = useMemo(() => runArithmetic(op, topText, bottomText), [op, topText, bottomText]);
  const steps = "error" in run ? [] : run.steps;
  const lastIndex = steps.length - 1;
  const key = `${op}|${topText}|${bottomText}`;
  const current = view.key === key ? view : { index: 0, playing: false };
  const index = Math.min(current.index, Math.max(lastIndex, 0));
  const isPlaying = current.playing && index < lastIndex;
  const done = steps.length > 0 && index === lastIndex;

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setTimeout(
      () => setView(v => ({ key, index: Math.min(v.index + 1, lastIndex), playing: true })),
      PLAY_DELAY,
    );
    return () => window.clearTimeout(timer);
  }, [isPlaying, index, key, lastIndex]);

  function goTo(next: number) {
    setView({ key, index: Math.max(0, Math.min(lastIndex, next)), playing: false });
  }

  function togglePlay() {
    if (isPlaying) {
      setView({ key, index, playing: false });
      return;
    }
    setView({ key, index: index >= lastIndex ? 0 : index, playing: true });
  }

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

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (IGNORED_KEY_TARGETS.has((event.target as HTMLElement).tagName)) return;
    if (event.key === "ArrowRight") goTo(index + 1);
    else if (event.key === "ArrowLeft") goTo(index - 1);
    else if (event.key === " ") togglePlay();
    else return;
    event.preventDefault();
  }

  const step = steps[index];

  return (
    <ContentBlock
      label="Binary calculator"
      headerSlot={steps.length > 0 && <p className="viz-counter">Step {index + 1} / {steps.length}</p>}
    >
      <div className="arith" tabIndex={0} onKeyDown={handleKeyDown} aria-label="Binary calculator. Use the arrow keys to step and space to play.">
        <div className="arith-inputs">
          <div className="viz-field">
            <span className="viz-field-label">operation</span>
            <div className="viz-speed arith-ops" role="group" aria-label="Operation">
              {OPERATIONS.map(option => (
                <button
                  key={option.op}
                  type="button"
                  className={cx("viz-speed-btn", option.op === op && "viz-speed-btn--active")}
                  aria-pressed={option.op === op}
                  onClick={() => setOp(option.op)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <label className="viz-field arith-field">
            <span className="viz-field-label">top number</span>
            <input
              className="viz-input"
              value={topText}
              onChange={event => setTopText(event.target.value)}
              placeholder="e.g. 1011"
              inputMode="numeric"
              spellCheck={false}
              autoComplete="off"
            />
          </label>
          <label className="viz-field arith-field">
            <span className="viz-field-label">bottom number</span>
            <input
              className="viz-input"
              value={bottomText}
              onChange={event => setBottomText(event.target.value)}
              placeholder="e.g. 110"
              inputMode="numeric"
              spellCheck={false}
              autoComplete="off"
            />
          </label>
          <div className="arith-input-actions">
            <button type="button" className="viz-btn arith-action" onClick={swap}>⇅ Swap</button>
            <button type="button" className="viz-btn arith-action" onClick={loadRandom}>Random</button>
          </div>
        </div>

        {"error" in run ? (
          <p className="viz-notice viz-notice--error" role="alert">{run.error}</p>
        ) : (
          <>
            <Sheet op={op} step={step} previous={steps[index - 1]} done={done} />

            <div className="arith-explain" aria-live="polite">
              <p className="arith-step-title">{step.title}</p>
              {step.math && <p className="arith-math">{step.math}</p>}
              <p className="arith-message">{step.message}</p>
            </div>

            {done && (
              <p className="conv-answer">
                <span className="conv-answer-side">{run.topDigits} {SYMBOLS[op]} {run.bottomDigits}</span>
                <span className="conv-answer-equals">=</span>
                <strong className="conv-answer-side">{run.answer}<small>binary</small></strong>
                <span className="arith-answer-decimal">{run.resultValue} in base 10</span>
              </p>
            )}

            <div className="viz-transport arith-transport">
              <button type="button" className="viz-btn" onClick={() => goTo(0)} disabled={index === 0}>⏮ Start over</button>
              <button type="button" className="viz-btn" onClick={() => goTo(index - 1)} disabled={index === 0}>◀ Back</button>
              <button type="button" className="viz-btn viz-btn--solid viz-btn--play" onClick={togglePlay}>
                {isPlaying ? "❚❚ Pause" : done ? "↻ Replay" : "▶ Play"}
              </button>
              <button type="button" className="viz-btn" onClick={() => goTo(index + 1)} disabled={done}>Next ▶</button>
              <button type="button" className="viz-btn" onClick={() => goTo(lastIndex)} disabled={done}>Show answer</button>
            </div>
          </>
        )}
      </div>
    </ContentBlock>
  );
}
