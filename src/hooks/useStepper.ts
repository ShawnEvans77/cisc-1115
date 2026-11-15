import { useEffect, useState, type KeyboardEvent } from "react";
import { initialStepperState, stepperReducer, stepperView, type StepperAction, type StepperView } from "../utils/stepper";

export type Stepper = StepperView & {
  stepCount: number;
  goTo: (index: number) => void;
  stepBy: (delta: number) => void;
  togglePlay: () => void;
  // arrow keys step and space plays, unless the key was typed into a control
  handleKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
};

const IGNORED_KEY_TARGETS = new Set(["INPUT", "SELECT", "TEXTAREA", "BUTTON"]);

// Shared playback for the note tools that walk through a run one step at a time.
// `key` identifies the run, so changing the input starts over at step 1, paused.
export function useStepper(stepCount: number, key: string, playDelay = 1000): Stepper {
  const [state, setState] = useState(() => initialStepperState(key));
  const view = stepperView(state, key, stepCount);

  // Updates go through the latest state, so quick repeated clicks are not lost.
  const dispatch = (action: StepperAction) => setState(current => stepperReducer(current, action, key, stepCount));

  useEffect(() => {
    if (!view.playing) return;
    const timer = window.setTimeout(
      () => setState(current => stepperReducer(current, { type: "tick" }, key, stepCount)),
      playDelay,
    );
    return () => window.clearTimeout(timer);
  }, [view.playing, view.index, key, stepCount, playDelay]);

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (IGNORED_KEY_TARGETS.has((event.target as HTMLElement).tagName)) return;
    if (event.key === "ArrowRight") dispatch({ type: "stepBy", delta: 1 });
    else if (event.key === "ArrowLeft") dispatch({ type: "stepBy", delta: -1 });
    else if (event.key === " ") dispatch({ type: "togglePlay" });
    else return;
    event.preventDefault();
  }

  return {
    ...view,
    stepCount,
    goTo: index => dispatch({ type: "goTo", index }),
    stepBy: delta => dispatch({ type: "stepBy", delta }),
    togglePlay: () => dispatch({ type: "togglePlay" }),
    handleKeyDown,
  };
}
