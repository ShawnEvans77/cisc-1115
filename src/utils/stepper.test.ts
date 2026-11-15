import { describe, expect, it } from "vitest";
import { initialStepperState, stepperReducer, stepperView, type StepperAction, type StepperState } from "./stepper";

const KEY = "run";
const STEPS = 5;

function apply(state: StepperState, ...actions: StepperAction[]): StepperState {
  return actions.reduce((current, action) => stepperReducer(current, action, KEY, STEPS), state);
}

function view(state: StepperState) {
  return stepperView(state, KEY, STEPS);
}

describe("stepper", () => {
  const start = initialStepperState(KEY);

  it("starts at the first step, paused", () => {
    expect(view(start)).toEqual({ index: 0, playing: false, atStart: true, atEnd: false });
  });

  it("clamps moves to the first and last step", () => {
    expect(view(apply(start, { type: "stepBy", delta: -1 })).index).toBe(0);
    expect(view(apply(start, { type: "goTo", index: 99 }))).toMatchObject({ index: 4, atEnd: true });
    expect(view(apply(start, { type: "goTo", index: -3 })).index).toBe(0);
  });

  it("applies quick repeated steps one after another", () => {
    const state = apply(start, { type: "stepBy", delta: 1 }, { type: "stepBy", delta: 1 }, { type: "stepBy", delta: 1 });
    expect(view(state).index).toBe(3);
  });

  it("plays one step per tick and stops on the last step", () => {
    let state = apply(start, { type: "togglePlay" });
    expect(view(state).playing).toBe(true);
    for (let i = 0; i < 10; i++) state = apply(state, { type: "tick" });
    expect(view(state)).toMatchObject({ index: 4, playing: false, atEnd: true });
  });

  it("ignores a tick while paused", () => {
    const state = apply(start, { type: "goTo", index: 2 });
    expect(apply(state, { type: "tick" })).toBe(state);
  });

  it("pauses where it is, and replays from the first step at the end", () => {
    const paused = apply(start, { type: "togglePlay" }, { type: "tick" }, { type: "togglePlay" });
    expect(view(paused)).toMatchObject({ index: 1, playing: false });

    const replay = apply(start, { type: "goTo", index: 4 }, { type: "togglePlay" });
    expect(view(replay)).toMatchObject({ index: 0, playing: true });
  });

  it("any move stops playback", () => {
    const state = apply(start, { type: "togglePlay" }, { type: "stepBy", delta: 1 });
    expect(view(state)).toMatchObject({ index: 1, playing: false });
  });

  it("starts over, paused, when the run changes", () => {
    const state = apply(start, { type: "goTo", index: 3 }, { type: "togglePlay" });
    expect(stepperView(state, "other run", STEPS)).toEqual({ index: 0, playing: false, atStart: true, atEnd: false });
    expect(stepperReducer(state, { type: "stepBy", delta: 1 }, "other run", STEPS)).toEqual({ key: "other run", index: 1, playing: false });
  });

  it("stays on a step that exists when the run has fewer steps", () => {
    const state = apply(start, { type: "goTo", index: 4 });
    expect(stepperView(state, KEY, 2).index).toBe(1);
  });

  it("treats an empty run as both the first and last step", () => {
    expect(stepperView(start, KEY, 0)).toEqual({ index: 0, playing: false, atStart: true, atEnd: true });
  });
});
