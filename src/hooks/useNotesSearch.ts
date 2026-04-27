// src/hooks/useNotesSearch.ts
import { useMemo } from "react";
import { notes } from "../data/notes";
import {
  createEntrySearchResult,
  createTopicSearchResult,
  normalizeNoteSearchQuery,
  noteEntryMatchesQuery,
  topicMatchesQuery,
  type NoteSearchResult,
} from "../utils/noteSearch";

export type { NoteSearchResult } from "../utils/noteSearch";

export function useNotesSearch(query: string): NoteSearchResult[] {
  return useMemo(() => {
    const q = normalizeNoteSearchQuery(query);
    if (!q) return [];

    const matches: NoteSearchResult[] = [];

    for (const topic of notes) {
      if (topicMatchesQuery(topic, q)) {
        matches.push(createTopicSearchResult(topic));
        continue;
      }

      for (const entry of topic.entries) {
        if (noteEntryMatchesQuery(entry, q)) {
          matches.push(createEntrySearchResult(topic, entry, q));
        }
      }
    }

    return matches;
  }, [query]);
}
