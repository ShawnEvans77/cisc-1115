// src/components/ContentBlock.tsx
import React from "react";
import { MathDisplay } from "./MathDisplay";
import { parsePrompt } from "../utils/parsePrompt";
import { highlightJava } from "../utils/highlightJava";

interface ContentBlockProps {
  label:       string;
  children:    React.ReactNode;
  headerSlot?: React.ReactNode;
}

export function ContentBlock({ label, children, headerSlot }: ContentBlockProps) {
  return (
    <div className="content-block">
      <div className="content-block-header">
        <p className="content-block-label">{label}</p>
        {headerSlot}
      </div>
      {children}
    </div>
  );
}

// Renders a prompt string — prose, [[code]] blocks, and [[text]] blocks.
// [[code]] → Java highlighting via highlightJava
// [[text]] → monospace, no highlighting (tables, traces, binary search steps, etc.)
export function PromptBody({ text }: { text: string }) {
  const segments = parsePrompt(text);

  return (
    <>
      {segments.map((seg, i) => {
        if (seg.type === "code") {
          return (
            <div key={i} className="code-scroll-wrapper">
              <pre>{highlightJava(seg.content.trim())}</pre>
            </div>
          );
        }

        if (seg.type === "text-block") {
          return (
            <div key={i} className="code-scroll-wrapper">
              <pre>{seg.content.trim()}</pre>
            </div>
          );
        }

        return seg.content.split("\n").map((line, j) =>
          line.trim() === ""
            ? <br key={`${i}-${j}`} />
            : <p key={`${i}-${j}`} className="content-block-body">{line}</p>
        );
      })}
    </>
  );
}

// Backward-compat alias — update call sites to PromptBody when convenient.
export const PromptLines = PromptBody;

// Renders a LaTeX equation block.
export function QuestionMath({ latex }: { latex: string }) {
  return <MathDisplay latex={latex} block />;
}