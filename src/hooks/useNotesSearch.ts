// src/hooks/useNotesSearch.ts
import { useMemo } from "react";
import { notes } from "../data/notes";
import type { NoteSection } from "../types";
import { defaultPreview, normalizeQuery, snippetAround } from "../utils/search";

type TopicResult = {
  type:       "topic";
  topicId:    string;
  topicLabel: string;
  entryCount: number;
};

type EntryResult = {
  type:       "entry";
  topicId:    string;
  topicLabel: string;
  entryId:    string;
  title:      string;
  tags:       string[];
  preview:    string;
};

export type NoteSearchResult = TopicResult | EntryResult;

function getPreview(sections: NoteSection[], query: string): string {
  const textSection = sections.find((s: NoteSection) => s.type === "text");
  if (!textSection) return "";

  const content = textSection.content;
  return snippetAround(content, query) ?? defaultPreview(content);
}

export function useNotesSearch(query: string): NoteSearchResult[] {
  return useMemo(() => {
    const q = normalizeQuery(query);
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
        const sectionMatch = entry.sections.some((s: NoteSection) =>
          s.content.toLowerCase().includes(q)
        );

        if (
          entry.title.toLowerCase().includes(q) ||
          entry.tags.some((t: string) => t.toLowerCase().includes(q)) ||
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
