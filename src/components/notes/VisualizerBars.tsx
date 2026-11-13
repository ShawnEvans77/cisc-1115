import type { AlgorithmStep } from "../../utils/algorithmSteps";
import { formatArray } from "../../utils/algorithmSteps";
import { cx } from "../../utils/ui";

type VisualizerBarsProps = {
  step: AlgorithmStep;
  // the input in its original order, so a bar's height never changes as it moves
  input: number[];
};

const SLOT = 64;
const MIN_SLOTS = 10;
const MAX_BAR_WIDTH = 110;
const BAR_GAP = 10;
const BASELINE = 262;
const MAX_BAR = 200;
const MIN_BAR = 16;
const POINTER_TOP = 322;
const POINTER_STEP = 30;
// widest a pointer label character gets (phone font size, in viewBox units)
const LABEL_CHAR_WIDTH = 17;
const HEIGHT = POINTER_TOP + POINTER_STEP * 3;

// Bars are drawn in SVG so their geometry can come from the data without inline styles.
// Each bar is keyed by its original element, so a swap slides the two bars past each other.
export function VisualizerBars({ step, input }: VisualizerBarsProps) {
  const n = step.values.length;
  // short arrays get wider slots so the stage is always filled
  const width = Math.max(n, MIN_SLOTS) * SLOT;
  const slot = width / n;
  const barWidth = Math.min(slot - BAR_GAP, MAX_BAR_WIDTH);
  const low = Math.min(...input);
  const high = Math.max(...input);
  const barHeight = (value: number) =>
    MIN_BAR + (high === low ? MAX_BAR / 2 : ((value - low) / (high - low)) * (MAX_BAR - MIN_BAR));
  const slotX = (position: number) => position * slot;

  // A pointer drops to the next row when its label would touch one already on that row.
  // Only the first pointer at an index draws the caret.
  const placed: { index: number; level: number; label: string }[] = [];
  const collides = (a: { index: number; label: string }, b: { index: number; label: string }) =>
    Math.abs(a.index - b.index) * slot < ((a.label.length + b.label.length) * LABEL_CHAR_WIDTH) / 2 + 8;
  const pointers = step.pointers.map(pointer => {
    let level = 0;
    while (placed.some(other => other.level === level && collides(other, pointer))) level++;
    const caret = !placed.some(other => other.index === pointer.index);
    placed.push({ ...pointer, level });
    return { ...pointer, level, caret };
  });

  return (
    <div className="viz-stage">
      <svg
        className={cx("viz-svg", n > 10 && "viz-svg--many")}
        viewBox={`0 0 ${width} ${HEIGHT}`}
        role="img"
        aria-label={`Array ${formatArray(step.values)}`}
      >
        <line className="viz-baseline" x1={0} x2={width} y1={BASELINE} y2={BASELINE} />

        {/* drawn in original order so React never moves the nodes, which would cancel the slide */}
        {input.map((value, id) => {
          const position = step.order.indexOf(id);
          const h = barHeight(value);
          const state = step.states[position];
          return (
            <g key={id} className="viz-bar" transform={`translate(${slotX(position)} 0)`}>
              <rect
                className={cx("viz-bar-rect", state && `viz-bar--${state}`)}
                x={(slot - barWidth) / 2}
                y={BASELINE - h}
                width={barWidth}
                height={h}
                rx={4}
              />
              <text className={cx("viz-bar-value", state && `viz-bar-value--${state}`)} x={slot / 2} y={BASELINE - h - 10}>
                {value}
              </text>
            </g>
          );
        })}

        {step.values.map((_, position) => (
          <text key={position} className="viz-index" x={slotX(position) + slot / 2} y={BASELINE + 24}>
            {position}
          </text>
        ))}

        {pointers.map(pointer => (
          <g
            key={pointer.label}
            className="viz-pointer"
            transform={`translate(${slotX(pointer.index) + slot / 2} ${POINTER_TOP + pointer.level * POINTER_STEP})`}
          >
            {pointer.caret && (
              <path className="viz-pointer-caret" transform={`translate(0 ${-pointer.level * POINTER_STEP})`} d="M -7 -20 L 0 -30 L 7 -20 Z" />
            )}
            <text className="viz-pointer-label" y={0}>{pointer.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}
