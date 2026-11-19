import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { recordBubbleSort } from "../../utils/algorithmSteps";
import { cx } from "../../utils/ui";

const COUNT = 10;
const TICK = 170;
const HOLD = 2200;
const SLOT = 28;
const BAR_WIDTH = 18;
const HEIGHT = 84;
const MIN_BAR = 10;

const VALUES = Array.from({ length: COUNT }, (_, i) => i + 1);

function shuffled(): number[] {
  const values = [...VALUES];
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]];
  }
  return values;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// A bubble sort that runs on a loop in the hero and links to its note.
export function HeroSort() {
  const [input, setInput] = useState(() => shuffled());
  const run = useMemo(() => recordBubbleSort(input), [input]);
  const [index, setIndex] = useState(0);
  const [reduced] = useState(prefersReducedMotion);
  const last = run.steps.length - 1;

  useEffect(() => {
    if (reduced) return;
    const timer = window.setTimeout(() => {
      if (index < last) {
        setIndex(index + 1);
      } else {
        setIndex(0);
        setInput(shuffled());
      }
    }, index < last ? TICK : HOLD);
    return () => window.clearTimeout(timer);
  }, [index, last, reduced]);

  const step = run.steps[reduced ? last : Math.min(index, last)];
  const width = COUNT * SLOT;
  const barHeight = (value: number) => MIN_BAR + ((value - 1) / (COUNT - 1)) * (HEIGHT - MIN_BAR);

  return (
    <Link to="/notes/sorting/bubblesort" className="hero-sort">
      <svg className="hero-sort-svg" viewBox={`0 0 ${width} ${HEIGHT}`} aria-hidden="true">
        {/* drawn in value order so React never moves the nodes, which would cancel the slide */}
        {VALUES.map(value => {
          const position = step.order.indexOf(input.indexOf(value));
          const h = barHeight(value);
          const state = step.states[position];
          return (
            <g key={value} className="hero-sort-bar" transform={`translate(${position * SLOT} 0)`}>
              <rect
                className={cx("hero-sort-rect", state && `hero-sort-rect--${state}`)}
                x={(SLOT - BAR_WIDTH) / 2}
                y={HEIGHT - h}
                width={BAR_WIDTH}
                height={h}
                rx={2}
              />
            </g>
          );
        })}
      </svg>
      <span className="hero-sort-label">bubble sort →</span>
    </Link>
  );
}
