import type { ReactElement, ReactNode } from "react";
import { parsePrompt, type PromptSegment } from "../../utils/parsePrompt";
import { cx } from "../../utils/ui";
import { CodeBlock } from "./CodeBlock";

const INLINE_MARKUP = /(\*\*.*?\*\*|\*.*?\*|__.*?__)/;

function getIndentClass(line: string): string | undefined {
  const leadingSpaces = line.match(/^ */)?.[0].length ?? 0;
  if (leadingSpaces >= 4) return "content-block-body--indent-2";
  if (leadingSpaces >= 1) return "content-block-body--indent-1";
  return undefined;
}

// Order matters: "**bold**" also starts and ends with "*".
function renderInline(part: string, key: number): ReactNode {
  if (part.startsWith("**") && part.endsWith("**")) return <strong key={key}>{part.slice(2, -2)}</strong>;
  if (part.startsWith("__") && part.endsWith("__")) return <u key={key}>{part.slice(2, -2)}</u>;
  if (part.startsWith("*") && part.endsWith("*")) return <em key={key}>{part.slice(1, -1)}</em>;
  return part;
}

function renderLine(line: string, key: string): ReactElement {
  return (
    <p key={key} className={cx("content-block-body", getIndentClass(line))}>
      {line.trimStart().split(INLINE_MARKUP).map(renderInline)}
    </p>
  );
}

function renderSegment(segment: PromptSegment, i: number): ReactNode {
  if (segment.type === "code") {
    return <CodeBlock key={i} code={segment.content.trim()} />;
  }

  if (segment.type === "text-block") {
    return <CodeBlock key={i} code={segment.content.trim()} language="text" />;
  }

  return segment.content.split("\n").map((line, j) =>
    line.trim() === ""
      ? <br key={`${i}-${j}`} />
      : renderLine(line, `${i}-${j}`)
  );
}

// Renders the content markup used by exam prompts, explanations, and text notes:
//   [[code]]…[[/code]]  Java block with syntax highlighting
//   [[text]]…[[/text]]  monospace block, no highlighting (tables, traces)
//   **bold**, *italic*, __underline__ inside prose lines
//   1–3 leading spaces indent a prose line one level, 4+ indent it two
export function PromptBody({ text }: { text: string }) {
  return <>{parsePrompt(text).map(renderSegment)}</>;
}
