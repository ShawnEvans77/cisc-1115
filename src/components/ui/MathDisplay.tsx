import { useMemo } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

type MathDisplayProps = {
  latex: string;
  block?: boolean; // true = display (centered), false = inline
};

// Renders a LaTeX string with KaTeX. Only a few questions have math, so pages load
// this component lazily and KaTeX, its stylesheet, and its fonts stay out of the main bundle.
export function MathDisplay({ latex, block = true }: MathDisplayProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        displayMode:  block,
        throwOnError: false, // renders the error in red rather than crashing
        trust:        false,
      });
    } catch {
      return null;
    }
  }, [latex, block]);

  if (html === null) {
    return <p className="math-display math-error">Invalid LaTeX: {latex}</p>;
  }

  return (
    <div
      className={block ? "math-display" : "math-inline"}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
