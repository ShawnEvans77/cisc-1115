// src/components/MathDisplay.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Renders a LaTeX string using KaTeX.
//
// Setup (one-time):
//   npm install katex
//   npm install --save-dev @types/katex
//
// Import the KaTeX stylesheet once in main.tsx:
//   import "katex/dist/katex.min.css";
// ─────────────────────────────────────────────────────────────────────────────

import { useMemo } from "react";
import katex from "katex";

interface MathDisplayProps {
  latex: string;
  block?: boolean; // true = display (centered), false = inline
}

export function MathDisplay({ latex, block = true }: MathDisplayProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        displayMode:  block,
        throwOnError: false,  // renders error in red rather than crashing
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