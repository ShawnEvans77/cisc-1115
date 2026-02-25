// src/components/ContentBlock.tsx
import React from "react";
import { MathDisplay } from "./MathDisplay";

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

// Renders newline-delimited prompt / explanation text
export function PromptLines({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) =>
        line.trim() === ""
          ? <br key={i} />
          : <p key={i} className="content-block-body">{line}</p>
      )}
    </>
  );
}

// Renders a LaTeX equation block — replaces the old mathHtml dangerouslySetInnerHTML approach
export function QuestionMath({ latex }: { latex: string }) {
  return <MathDisplay latex={latex} block />;
}