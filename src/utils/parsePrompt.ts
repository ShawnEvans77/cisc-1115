// src/utils/parsePrompt.ts

export type PromptSegment =
  | { type: "text";       content: string }
  | { type: "code";       content: string }
  | { type: "text-block"; content: string };

export function parsePrompt(raw: string): PromptSegment[] {
  const segments: PromptSegment[] = [];
  const re = /\[\[code\]\]([\s\S]*?)\[\[\/code\]\]|\[\[text\]\]([\s\S]*?)\[\[\/text\]\]/g;

  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(raw)) !== null) {
    if (match.index > cursor) {
      segments.push({ type: "text", content: raw.slice(cursor, match.index) });
    }

    if (match[1] !== undefined) {
      segments.push({ type: "code",       content: match[1] });
    } else {
      segments.push({ type: "text-block", content: match[2] });
    }

    cursor = match.index + match[0].length;
  }

  if (cursor < raw.length) {
    segments.push({ type: "text", content: raw.slice(cursor) });
  }

  return segments.filter(s => s.content !== "");
}

export function stripPromptDelimiters(raw: string): string {
  return raw
    .replace(/\[\[code\]\]|\[\[\/code\]\]/g, "")
    .replace(/\[\[text\]\]|\[\[\/text\]\]/g, "");
}