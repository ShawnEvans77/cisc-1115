import { useMemo, useState } from "react";
import { useStepper } from "../../hooks/useStepper";
import type { ConverterPreset, NumberBase } from "../../types";
import { BASE_NAMES, convertNumber, NUMBER_BASES, toBase } from "../../utils/baseConversion";
import { cx } from "../../utils/ui";
import { ContentBlock } from "../ui/ContentBlock";
import { PromptBody } from "../ui/PromptBody";
import { StepControls, StepCounter } from "./StepControls";

type BaseConverterProps = Omit<ConverterPreset, "above">;

type BasePickerProps = {
  label: string;
  value: NumberBase;
  onChange: (base: NumberBase) => void;
};

const SHORT_NAMES: Record<NumberBase, string> = { 2: "Binary", 10: "Decimal", 16: "Hex" };

const PLACEHOLDERS: Record<NumberBase, string> = { 2: "e.g. 101101", 10: "e.g. 45", 16: "e.g. 2F" };

// Random inputs stay in the range the exams use: up to 255, two hex digits.
const RANDOM_MAX = 255;

function BasePicker({ label, value, onChange }: BasePickerProps) {
  return (
    <div className="tool-field">
      <span className="tool-field-label">{label}</span>
      <div className="tool-segmented conv-bases" role="group" aria-label={`Convert ${label}`}>
        {NUMBER_BASES.map(base => (
          <button
            key={base}
            type="button"
            className={cx("tool-segmented-btn", base === value && "tool-segmented-btn--active")}
            aria-pressed={base === value}
            onClick={() => onChange(base)}
          >
            {SHORT_NAMES[base]}
          </button>
        ))}
      </div>
    </div>
  );
}

export function BaseConverter({ from: initialFrom, to: initialTo, value: initialValue }: BaseConverterProps) {
  const [text, setText] = useState(initialValue);
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const conversion = useMemo(() => convertNumber(text, from, to), [text, from, to]);
  const isEmpty = text.trim() === "";
  const steps = "error" in conversion ? [] : conversion.steps;
  // Steps up to the current one stay on screen. Any change to the number or the
  // bases starts the walkthrough over at step 1.
  const stepper = useStepper(steps.length, `${text}|${from}|${to}`);
  const shown = stepper.index + 1;
  const done = steps.length > 0 && stepper.atEnd;

  // Picking the base on the other side swaps the two, so from and to never match.
  function chooseFrom(base: NumberBase) {
    if (base === to) setTo(from);
    setFrom(base);
  }

  function chooseTo(base: NumberBase) {
    if (base === from) setFrom(to);
    setTo(base);
  }

  // Swapping also carries the answer over, so it converts straight back.
  function swap() {
    if (!("error" in conversion)) setText(conversion.result);
    setFrom(to);
    setTo(from);
  }

  function loadRandom() {
    setText(toBase(1 + Math.floor(Math.random() * RANDOM_MAX), from));
  }

  return (
    <ContentBlock
      label="Number converter"
      headerSlot={steps.length > 0 && <StepCounter stepper={stepper} />}
    >
      <div className="conv">
        <div className="conv-inputs">
          <label className="tool-field conv-field--number">
            <span className="tool-field-label">number in {BASE_NAMES[from]}</span>
            <input
              className="tool-input"
              value={text}
              onChange={event => setText(event.target.value)}
              placeholder={PLACEHOLDERS[from]}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="characters"
            />
          </label>
          <BasePicker label="from" value={from} onChange={chooseFrom} />
          <button type="button" className="tool-btn conv-swap" onClick={swap} aria-label="Swap from and to">⇄</button>
          <BasePicker label="to" value={to} onChange={chooseTo} />
          <button type="button" className="tool-btn conv-random" onClick={loadRandom}>Random</button>
        </div>

        {"error" in conversion ? (
          <p className={cx("tool-notice", !isEmpty && "tool-notice--error")} role={isEmpty ? undefined : "alert"}>
            {conversion.error}
          </p>
        ) : (
          <>
            <ol className="conv-steps" aria-live="polite">
              {steps.slice(0, shown).map((step, i) => (
                <li key={i} className={cx("conv-step", i === shown - 1 && "conv-step--latest")}>
                  <p className="conv-step-title">
                    <span className="conv-step-number">{i + 1}</span>
                    {step.title}
                  </p>
                  <div className="conv-step-body">
                    <PromptBody text={step.body} />
                  </div>
                </li>
              ))}
            </ol>

            {done && (
              <p className="tool-answer">
                <span className="tool-answer-side">{conversion.digits}<small>{BASE_NAMES[from]}</small></span>
                <span className="tool-answer-equals">=</span>
                <strong className="tool-answer-side">{conversion.result}<small>{BASE_NAMES[to]}</small></strong>
              </p>
            )}

            <StepControls stepper={stepper} className="conv-transport" endLabel="Show all" />
          </>
        )}
      </div>
    </ContentBlock>
  );
}
