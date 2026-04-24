import { stripPromptDelimiters } from "./parsePrompt";

export const COURSE_LABEL = "Brooklyn College · CISC 1115";
export const COURSE_CODE = "CISC 1115";

export function normalizeQuery(query: string): string {
  return query.trim().toLowerCase();
}

export function hasQuery(query: string): boolean {
  return normalizeQuery(query).length > 0;
}

export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function resultCountLabel(count: number, total?: number, noun = "result"): string {
  if (count === 0) return "no results";
  if (total !== undefined) return `${count} of ${total} ${noun}${total === 1 ? "" : "s"}`;
  return pluralize(count, noun);
}

export function stripInlineMarkup(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/\*(.*?)\*/g, "$1");
}

export function searchablePrompt(prompt: string): string {
  return stripInlineMarkup(stripPromptDelimiters(prompt));
}

export function snippetAround(text: string, query: string, before = 40, after = 60): string | null {
  const q = normalizeQuery(query);
  if (!q) return null;

  const idx = text.toLowerCase().indexOf(q);
  if (idx === -1) return null;

  const start = Math.max(0, idx - before);
  const end = Math.min(text.length, idx + q.length + after);

  return `${start > 0 ? "…" : ""}${text.slice(start, end)}${end < text.length ? "…" : ""}`;
}

export function defaultPreview(text: string, length = 100): string {
  return text.length > length ? `${text.slice(0, length)}…` : text;
}
