import type { Stepper } from "../../hooks/useStepper";
import { cx } from "../../utils/ui";

type StepCounterProps = {
  stepper: Stepper;
};

type StepControlsProps = {
  stepper: Stepper;
  className?: string;
  // shows Play and Pause; without it, Next is the main button
  playable?: boolean;
  // label of a button that jumps to the last step, such as "Show answer"
  endLabel?: string;
};

export function StepCounter({ stepper }: StepCounterProps) {
  return <p className="tool-counter">Step {stepper.index + 1} / {stepper.stepCount}</p>;
}

export function StepControls({ stepper, className, playable = false, endLabel }: StepControlsProps) {
  const { atStart, atEnd, playing } = stepper;

  return (
    <div className={cx("tool-transport", className)}>
      <button type="button" className="tool-btn" onClick={() => stepper.goTo(0)} disabled={atStart}>⏮ Start over</button>
      <button type="button" className="tool-btn" onClick={() => stepper.stepBy(-1)} disabled={atStart}>◀ Back</button>
      {playable && (
        <button type="button" className="tool-btn tool-btn--solid tool-btn--play" onClick={stepper.togglePlay}>
          {playing ? "❚❚ Pause" : atEnd ? "↻ Replay" : "▶ Play"}
        </button>
      )}
      <button
        type="button"
        className={cx("tool-btn", !playable && "tool-btn--solid")}
        onClick={() => stepper.stepBy(1)}
        disabled={atEnd}
      >
        Next ▶
      </button>
      {endLabel && (
        <button type="button" className="tool-btn" onClick={() => stepper.goTo(stepper.stepCount - 1)} disabled={atEnd}>
          {endLabel}
        </button>
      )}
    </div>
  );
}
