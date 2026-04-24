// src/components/ui/ContentBlock.tsx
import type { ReactElement, ReactNode } from "react";
import { MathDisplay } from "./MathDisplay";
import { parsePrompt } from "../../utils/parsePrompt";
import { CodeBlock } from "./CodeBlock";

interface ContentBlockProps {
  label:       string;
  children:    ReactNode;
  headerSlot?: ReactNode;
  id?:         string;
}

export function ContentBlock({ label, children, headerSlot, id }: ContentBlockProps) {
  return (
    <div id={id} className="content-block">
      <div className="content-block-header">
        <p className="content-block-label">{label}</p>
        {headerSlot}
      </div>
      {children}
    </div>
  );
}

// Renders a single prose line, parsing **bold**, *italic*, __underline__ markers.
// Leading spaces are converted to BEM indent modifier classes.
function renderLine(line: string, key: string): ReactElement {
  const leadingSpaces = line.match(/^ */)?.[0].length ?? 0;
  const indentClass = leadingSpaces >= 4 ? " content-block-body--indent-2"
                    : leadingSpaces >= 1 ? " content-block-body--indent-1"
                    : "";
  const parts = line.trimStart().split(/(\*\*.*?\*\*|\*.*?\*|__.*?__)/);
  return (
    <p key={key} className={`content-block-body${indentClass}`}>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**")
          ? <strong key={i}>{part.slice(2, -2)}</strong>
          : part.startsWith("__") && part.endsWith("__")
          ? <u key={i}>{part.slice(2, -2)}</u>
          : part.startsWith("*") && part.endsWith("*")
          ? <em key={i}>{part.slice(1, -1)}</em>
          : part
      )}
    </p>
  );
}

// Renders a prompt string — prose, [[code]] blocks, and [[text]] blocks.
// [[code]] → Java highlighting via highlightJava
// [[text]] → monospace, no highlighting (tables, traces, binary search steps, etc.)
// Prose supports **bold**, *italic*, __underline__, and leading-space indentation.
export function PromptBody({ text }: { text: string }) {
  const segments = parsePrompt(text);

  return (
    <>
      {segments.map((seg, i) => {
        if (seg.type === "code") {
          return (
            <CodeBlock key={i} code={seg.content.trim()} />
          );
        }

        if (seg.type === "text-block") {
          return (
            <CodeBlock key={i} code={seg.content.trim()} language="text" />
          );
        }

        return seg.content.split("\n").map((line: string, j: number) =>
          line.trim() === ""
            ? <br key={`${i}-${j}`} />
            : renderLine(line, `${i}-${j}`)
        );
      })}
    </>
  );
}

// Renders a LaTeX equation block.
export function QuestionMath({ latex }: { latex: string }) {
  return <MathDisplay latex={latex} block />;
}
