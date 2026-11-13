import type { NoteSearchResult } from "../../utils/noteSearch";
import { pluralize } from "../../utils/search";
import { SearchResultList, type SearchCardResult } from "../ui/SearchResultList";

type NoteSearchResultsProps = {
  results: NoteSearchResult[];
  query: string;
};

export function NoteSearchResults({ results, query }: NoteSearchResultsProps) {
  const cards: SearchCardResult[] = results.map(result => result.type === "topic"
    ? {
        type: "summary",
        key: `topic-${result.topicId}`,
        to: `/notes/${result.topicId}`,
        eyebrow: "topic",
        title: result.topicLabel,
        meta: pluralize(result.entryCount, "note"),
      }
    : {
        type: "item",
        key: `${result.topicId}-${result.entryId}`,
        to: `/notes/${result.topicId}/${result.entryId}`,
        eyebrow: result.topicLabel,
        title: result.title,
        tags: result.tags,
        preview: result.preview,
      });

  return <SearchResultList results={cards} query={query} />;
}
