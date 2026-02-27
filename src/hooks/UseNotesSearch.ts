// src/hooks/useNotesSearch.ts
import { useMemo } from "react";
import { notes } from "../data/notes";

type TopicResult = {
  type:        "topic";
  topicId:     string;
  topicLabel:  string;
  entryCount:  number;
};

type EntryResult = {
  type:        "entry";
  topicId:     string;
  topicLabel:  string;
  entryId:     string;
  title:       string;
  tags:        string[];
  preview:     string;
};

export type NoteSearchResult = TopicResult | EntryResult;

function getPreview(sections: { type: string; content: string }[], query: string): string {
  const textSection = sections.find(s => s.type === "text");
  if (!textSection) return "";

  const content = textSection.content;
  const q       = query.trim().toLowerCase();
  const idx     = content.toLowerCase().indexOf(q);

  if (idx === -1) {
    // query not in text — return opening of first text section
    return content.slice(0, 100) + (content.length > 100 ? "…" : "");
  }

  const start = Math.max(0, idx - 40);
  const end   = Math.min(content.length, idx + q.length + 60);
  return (start > 0 ? "…" : "") + content.slice(start, end) + (end < content.length ? "…" : "");
}

export function useNotesSearch(query: string): NoteSearchResult[] {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const matches: NoteSearchResult[] = [];

    for (const topic of notes) {
      if (
        topic.label.toLowerCase().includes(q) ||
        topic.id.toLowerCase().includes(q)
      ) {
        matches.push({
          type:       "topic",
          topicId:    topic.id,
          topicLabel: topic.label,
          entryCount: topic.entries.length,
        });
        continue;
      }

      for (const entry of topic.entries) {
        const sectionMatch = entry.sections.some(s =>
          s.content.toLowerCase().includes(q)
        );

        if (
          entry.title.toLowerCase().includes(q) ||
          entry.tags.some(t => t.toLowerCase().includes(q)) ||
          sectionMatch
        ) {
          matches.push({
            type:       "entry",
            topicId:    topic.id,
            topicLabel: topic.label,
            entryId:    entry.id,
            title:      entry.title,
            tags:       entry.tags,
            preview:    getPreview(entry.sections, q),
          });
        }
      }
    }

    return matches;
  }, [query]);
}