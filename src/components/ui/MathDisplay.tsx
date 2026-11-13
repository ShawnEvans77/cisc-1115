import { useMemo } from "react";
import katex from "katex";

type MathDisplayProps = {
  latex: string;
  block?: boolean; // true = display (centered), false = inline
};

// Renders a LaTeX string with KaTeX. The KaTeX stylesheet is imported once in main.tsx.
export function MathDisplay({ latex, block = true }: MathDisplayProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        displayMode:  block,
        throwOnError: false, // renders the error in red rather than crashing
        trust:        false,
      });
    } catch {
      return `<span style="color:red">Invalid LaTeX: ${latex}</span>`;
    }
  }, [latex, block]);

  return (
    <div
      className={block ? "math-display" : "math-inline"}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
