// Position in a step-by-step walkthrough. The state remembers the key of the run it
// was saved for, so when the input changes (and with it the key), the walkthrough
// starts over at the first step, paused, without an effect to reset it.
export type StepperState = {
  key: string;
  index: number;
  playing: boolean;
};

export type StepperAction =
  | { type: "goTo"; index: number }
  | { type: "stepBy"; delta: number }
  | { type: "togglePlay" }
  | { type: "tick" };

export type StepperView = {
  index: number;
  playing: boolean;
  atStart: boolean;
  atEnd: boolean;
};

export function initialStepperState(key: string): StepperState {
  return { key, index: 0, playing: false };
}

function clampIndex(index: number, stepCount: number): number {
  return Math.max(0, Math.min(stepCount - 1, index));
}

export function stepperView(state: StepperState, key: string, stepCount: number): StepperView {
  const current = state.key === key ? state : initialStepperState(key);
  const index = clampIndex(current.index, stepCount);
  const atEnd = index >= stepCount - 1;
  return { index, playing: current.playing && !atEnd, atStart: index === 0, atEnd };
}

export function stepperReducer(
  state: StepperState,
  action: StepperAction,
  key: string,
  stepCount: number,
): StepperState {
  const { index, playing, atEnd } = stepperView(state, key, stepCount);

  switch (action.type) {
    case "goTo":
      return { key, index: clampIndex(action.index, stepCount), playing: false };
    case "stepBy":
      return { key, index: clampIndex(index + action.delta, stepCount), playing: false };
    case "togglePlay":
      if (playing) return { key, index, playing: false };
      // Play from the last step replays from the first.
      return { key, index: atEnd ? 0 : index, playing: true };
    case "tick":
      if (!playing) return state;
      return { key, index: index + 1, playing: index + 1 < stepCount - 1 };
  }
}
