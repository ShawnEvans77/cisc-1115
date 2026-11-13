export type PromptSegment =
  | { type: "text";       content: string }
  | { type: "code";       content: string }
  | { type: "text-block"; content: string }
  | { type: "table";      content: string };

const BLOCK_PATTERN = /\[\[(code|text|table)\]\]([\s\S]*?)\[\[\/\1\]\]/g;

const SEGMENT_TYPES = {
  code: "code",
  text: "text-block",
  table: "table",
} as const;

export function parsePrompt(raw: string): PromptSegment[] {
  const segments: PromptSegment[] = [];
  let cursor = 0;

  for (const match of raw.matchAll(BLOCK_PATTERN)) {
    if (match.index > cursor) {
      segments.push({ type: "text", content: raw.slice(cursor, match.index) });
    }

    const block = match[1] as keyof typeof SEGMENT_TYPES;
    segments.push({ type: SEGMENT_TYPES[block], content: match[2] });
    cursor = match.index + match[0].length;
  }

  if (cursor < raw.length) {
    segments.push({ type: "text", content: raw.slice(cursor) });
  }

  return segments.filter(s => s.content !== "");
}

// Splits a [[table]] body into rows of trimmed cells. The first row is the header.
// Cells are separated by "|"; blank lines are ignored.
export function parseTable(content: string): string[][] {
  return content
    .split("\n")
    .filter(line => line.trim() !== "")
    .map(line => line.split("|").map(cell => cell.trim()));
}

export function stripPromptDelimiters(raw: string): string {
  return raw.replace(/\[\[\/?(code|text|table)\]\]/g, "");
}
