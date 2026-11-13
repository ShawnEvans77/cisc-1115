import { useMemo } from "react";
import { notes } from "../data/notes";
import { collectNestedSearchResults, normalizeQuery } from "../utils/search";
import {
  createEntrySearchResult,
  createTopicSearchResult,
  noteEntryMatchesQuery,
  topicMatchesQuery,
  type NoteSearchResult,
} from "../utils/noteSearch";

export function useNotesSearch(query: string): NoteSearchResult[] {
  return useMemo(() => {
    const q = normalizeQuery(query);
    if (!q) return [];

    return collectNestedSearchResults(
      notes,
      topic => topic.entries,
      topic => topicMatchesQuery(topic, q),
      entry => noteEntryMatchesQuery(entry, q),
      createTopicSearchResult,
      (topic, entry) => createEntrySearchResult(topic, entry, q),
    );
  }, [query]);
}
