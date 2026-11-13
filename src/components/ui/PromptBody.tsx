import type { ReactElement, ReactNode } from "react";
import { parsePrompt, parseTable, type PromptSegment } from "../../utils/parsePrompt";
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

function renderInlineText(text: string): ReactNode[] {
  return text.split(INLINE_MARKUP).map(renderInline);
}

function renderLine(line: string, key: string): ReactElement {
  return (
    <p key={key} className={cx("content-block-body", getIndentClass(line))}>
      {renderInlineText(line.trimStart())}
    </p>
  );
}

function renderTable(content: string, key: number): ReactElement {
  const [header = [], ...rows] = parseTable(content);

  return (
    <div key={key} className="content-table-wrap">
      <table className="content-table">
        <thead>
          <tr>{header.map((cell, i) => <th key={i}>{renderInlineText(cell)}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>{row.map((cell, i) => <td key={i}>{renderInlineText(cell)}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderSegment(segment: PromptSegment, i: number): ReactNode {
  switch (segment.type) {
    case "code":
      return <CodeBlock key={i} code={trimBlankLines(segment.content)} />;
    case "text-block":
      return <CodeBlock key={i} code={trimBlankLines(segment.content)} language="text" />;
    case "table":
      return renderTable(segment.content, i);
    case "text":
      return segment.content.split("\n").map((line, j) =>
        line.trim() === ""
          ? <br key={`${i}-${j}`} />
          : renderLine(line, `${i}-${j}`)
      );
  }
}

// Drops blank lines at the start and end of a block but keeps the indentation of
// its first real line, which .trim() would strip.
function trimBlankLines(text: string): string {
  return text.replace(/^\s*\n/, "").replace(/\n\s*$/, "");
}

// Renders the content markup used by exam prompts, explanations, text solutions,
// and text notes:
//   [[code]]…[[/code]]    Java block with syntax highlighting
//   [[text]]…[[/text]]    monospace block, no highlighting (program output, input files)
//   [[table]]…[[/table]]  table; one row per line, cells split on "|", first row is the header
//   **bold**, *italic*, __underline__ inside prose lines and table cells
//   1–3 leading spaces indent a prose line one level, 4+ indent it two
export function PromptBody({ text }: { text: string }) {
  return <>{parsePrompt(text).map(renderSegment)}</>;
}
