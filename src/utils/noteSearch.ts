import type { NoteEntry, NoteSection, NoteTopic } from "../types";
import { defaultPreview, normalizeQuery, snippetAround } from "./search";

export type NoteTopicSearchResult = {
  type: "topic";
  topicId: string;
  topicLabel: string;
  entryCount: number;
};

export type NoteEntrySearchResult = {
  type: "entry";
  topicId: string;
  topicLabel: string;
  entryId: string;
  title: string;
  tags: string[];
  preview: string;
};

export type NoteSearchResult = NoteTopicSearchResult | NoteEntrySearchResult;

export function createTopicSearchResult(topic: NoteTopic): NoteTopicSearchResult {
  return {
    type: "topic",
    topicId: topic.id,
    topicLabel: topic.label,
    entryCount: topic.entries.length,
  };
}

export function createEntrySearchResult(topic: NoteTopic, entry: NoteEntry, query: string): NoteEntrySearchResult {
  return {
    type: "entry",
    topicId: topic.id,
    topicLabel: topic.label,
    entryId: entry.id,
    title: entry.title,
    tags: entry.tags,
    preview: getNotePreview(entry.sections, query),
  };
}

export function topicMatchesQuery(topic: NoteTopic, query: string): boolean {
  return (
    topic.label.toLowerCase().includes(query) ||
    topic.id.toLowerCase().includes(query)
  );
}

export function noteEntryMatchesQuery(entry: NoteEntry, query: string): boolean {
  return (
    entry.title.toLowerCase().includes(query) ||
    entry.tags.some(tag => tag.toLowerCase().includes(query)) ||
    entry.sections.some(section => section.content.toLowerCase().includes(query))
  );
}

export function getNotePreview(sections: NoteSection[], query: string): string {
  const textSection = sections.find(section => section.type === "text");
  if (!textSection) return "";

  return snippetAround(textSection.content, query) ?? defaultPreview(textSection.content);
}

export function getNoteContentSnippet(entry: NoteEntry, query: string): string | null {
  for (const section of entry.sections) {
    if (section.type !== "text") continue;

    const snippet = snippetAround(section.content, query);
    if (snippet) return snippet;
  }

  return null;
}

export function normalizeNoteSearchQuery(query: string): string {
  return normalizeQuery(query);
}
