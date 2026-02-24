// src/components/ContentBlock.tsx
import React from "react";

interface ContentBlockProps {
  label: string;
  children: React.ReactNode;
  headerSlot?: React.ReactNode; // optional right-side slot (e.g. copy button)
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

// Renders newline-delimited text (prompt / explanation bodies)
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