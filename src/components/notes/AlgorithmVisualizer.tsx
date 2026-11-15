import { useMemo, useState, type FormEvent } from "react";
import { useStepper } from "../../hooks/useStepper";
import {
  ALGORITHMS,
  findLine,
  formatArray,
  parseJavaInt,
  parseNumberList,
  type AlgorithmId,
  type BarState,
} from "../../utils/algorithmSteps";
import { highlightJava } from "../../utils/highlightJava";
import { hasJavaComments, stripJavaComments } from "../../utils/javaComments";
import { cx } from "../../utils/ui";
import { ContentBlock } from "../ui/ContentBlock";
import { StepControls, StepCounter } from "./StepControls";
import { VisualizerBars } from "./VisualizerBars";

type AlgorithmVisualizerProps = {
  algorithm: AlgorithmId;
  // the note's implementation, shown beside the bars with the current lines lit up
  code: string;
};

const SPEEDS = [
  { label: "Slow", delay: 1500 },
  { label: "Normal", delay: 850 },
  { label: "Fast", delay: 350 },
] as const;

const LEGENDS: Record<AlgorithmId, [BarState, string][]> = {
  binarysearch: [["compare", "mid"], ["found", "found"], ["out", "ruled out"]],
  linearsearch: [["compare", "checking"], ["found", "found"], ["out", "already checked"]],
  bubblesort: [["compare", "comparing"], ["swap", "just swapped"], ["sorted", "locked in"]],
  selectionsort: [["min", "smallest so far"], ["compare", "checking"], ["swap", "just swapped"], ["sorted", "final position"]],
};

function randomInt(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function distinctValues(count: number, max: number): number[] {
  const values = new Set<number>();
  while (values.size < count) values.add(randomInt(1, max));
  return [...values];
}

export function AlgorithmVisualizer({ algorithm, code }: AlgorithmVisualizerProps) {
  const config = ALGORITHMS[algorithm];
  const isSearch = config.kind === "search";
  const isBinary = algorithm === "binarysearch";

  const [input, setInput] = useState(config.defaultArray);
  const [target, setTarget] = useState(config.defaultTarget ?? 0);
  const [arrayText, setArrayText] = useState(config.defaultArray.join(", "));
  const [targetText, setTargetText] = useState(String(config.defaultTarget ?? ""));
  const [notice, setNotice] = useState<{ text: string; error: boolean } | null>(null);

  const [speed, setSpeed] = useState(1);
  const [hideComments, setHideComments] = useState(false);

  const run = useMemo(() => config.record(input, target), [config, input, target]);
  const stepper = useStepper(run.steps.length, `${input.join(",")}|${target}`, SPEEDS[speed].delay);
  const step = run.steps[stepper.index];

  // Anchors are pieces of code, never comments, so they still find their lines with comments hidden.
  const shownCode = hideComments ? stripJavaComments(code) : code;
  const codeLines = useMemo(() => highlightJava(shownCode), [shownCode]);
  const activeLines = new Set(step.lines.map(anchor => findLine(shownCode, anchor)));

  // Load and Random put the input in at step 1, paused; Play starts it.
  function load(values: number[], nextTarget: number, message: string | null) {
    setInput(values);
    setTarget(nextTarget);
    setArrayText(values.join(", "));
    setTargetText(String(nextTarget));
    setNotice(message ? { text: message, error: false } : null);
    // new numbers start over on their own; this also restarts a reload of the same ones
    stepper.goTo(0);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = parseNumberList(arrayText);
    if ("error" in parsed) {
      setNotice({ text: parsed.error, error: true });
      return;
    }

    let nextTarget = target;
    if (isSearch) {
      const parsedTarget = parseJavaInt(targetText);
      if ("error" in parsedTarget) {
        setNotice({ text: `Target: ${parsedTarget.error}`, error: true });
        return;
      }
      nextTarget = parsedTarget.value;
    }

    if (isBinary) {
      const sorted = [...parsed.values].sort((a, b) => a - b);
      const changed = sorted.some((value, i) => value !== parsed.values[i]);
      load(sorted, nextTarget, changed ? "Binary search only works on a sorted array, so your numbers were sorted first." : null);
      return;
    }
    load(parsed.values, nextTarget, null);
  }

  function loadRandom() {
    if (isBinary) {
      const values = distinctValues(randomInt(10, 16), 99).sort((a, b) => a - b);
      const missing = Math.random() < 0.25;
      load(values, missing ? randomInt(1, 99) : values[randomInt(0, values.length - 1)], null);
      return;
    }
    const values = distinctValues(randomInt(7, 10), 60);
    load(values, isSearch && Math.random() < 0.25 ? randomInt(61, 99) : values[randomInt(0, values.length - 1)], null);
  }

  const visibleRows = run.rows.slice(0, step.rowCount);

  return (
    <ContentBlock
      label="Watch it run"
      headerSlot={<StepCounter stepper={stepper} />}
    >
      <div className="viz tool-keys" tabIndex={0} onKeyDown={stepper.handleKeyDown} aria-label="Algorithm visualizer. Use the arrow keys to step and space to play.">
        <form className="viz-inputs" onSubmit={handleSubmit}>
          <label className="tool-field viz-field--array">
            <span className="tool-field-label">int[] nums</span>
            <input
              className="tool-input"
              value={arrayText}
              onChange={event => setArrayText(event.target.value)}
              spellCheck={false}
            />
          </label>
          {isSearch && (
            <label className="tool-field viz-field--target">
              <span className="tool-field-label">target</span>
              <input
                className="tool-input"
                value={targetText}
                onChange={event => setTargetText(event.target.value)}
                spellCheck={false}
              />
            </label>
          )}
          <div className="viz-input-actions">
            <button type="submit" className="tool-btn tool-btn--solid">Load</button>
            <button type="button" className="tool-btn" onClick={loadRandom}>Random</button>
          </div>
        </form>
        {notice && <p className={cx("tool-notice", notice.error && "tool-notice--error")}>{notice.text}</p>}

        <VisualizerBars step={step} input={input} />

        <p className="viz-message" aria-live="polite">{step.message}</p>

        <div className="viz-controls">
          <StepControls stepper={stepper} playable />
          <div className="tool-segmented" role="group" aria-label="Playback speed">
            {SPEEDS.map((option, i) => (
              <button
                key={option.label}
                type="button"
                className={cx("tool-segmented-btn", i === speed && "tool-segmented-btn--active")}
                aria-pressed={i === speed}
                onClick={() => setSpeed(i)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <input
          type="range"
          className="viz-scrubber"
          min={0}
          max={stepper.stepCount - 1}
          value={stepper.index}
          onChange={event => stepper.goTo(Number(event.target.value))}
          aria-label="Step"
        />

        <div className="viz-legend">
          {LEGENDS[algorithm].map(([state, label]) => (
            <span key={state} className="viz-legend-item">
              <span className={cx("viz-swatch", `viz-swatch--${state}`)} />
              {label}
            </span>
          ))}
        </div>

        <div className="viz-panels">
          <div className="viz-panel">
            <div className="viz-panel-header">
              <p className="viz-panel-label">The code, line by line</p>
              {hasJavaComments(code) && (
                <button
                  type="button"
                  className="comment-toggle"
                  aria-pressed={hideComments}
                  onClick={() => setHideComments(hidden => !hidden)}
                >
                  {hideComments ? "Show comments" : "Remove comments"}
                </button>
              )}
            </div>
            <pre className="viz-code">
              {codeLines.map((line, i) => (
                <div key={i} className={cx("viz-code-row", activeLines.has(i) && "viz-code-row--active")}>{line}</div>
              ))}
            </pre>
          </div>

          <div className="viz-panel">
            <p className="viz-panel-label">Variables</p>
            <dl className="viz-vars">
              {step.vars.map(([name, value]) => (
                <div key={name} className="viz-var">
                  <dt>{name}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            <div className="viz-stats">
              <span>Comparisons <strong>{step.comparisons}</strong></span>
              {!isSearch && <span>Swaps <strong>{step.swaps}</strong></span>}
              <span>Array <strong>{formatArray(step.values)}</strong></span>
            </div>

            <p className="viz-panel-label">Trace chart</p>
            {visibleRows.length > 0 ? (
              <div className="content-table-wrap">
                <table className="content-table viz-table">
                  <thead>
                    <tr>{run.header.map(cell => <th key={cell}>{cell}</th>)}</tr>
                  </thead>
                  <tbody>
                    {visibleRows.map((row, i) => (
                      <tr key={i} className={cx(i === visibleRows.length - 1 && "viz-row--latest")}>
                        {row.map((cell, j) => <td key={j}>{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="viz-empty">Rows appear here as the algorithm runs.</p>
            )}
          </div>
        </div>
      </div>
    </ContentBlock>
  );
}
