import type { ExamSection } from "../../types";
import type { ExamSearchResult } from "../../utils/examSearch";
import { pluralize, promptSnippet } from "../../utils/search";
import { SearchResultList, type SearchCardResult } from "../ui/SearchResultList";

type ExamSearchResultsProps = {
  results: ExamSearchResult[];
  query: string;
  section: ExamSection;
  itemLabel: string;
  isFinished: (examId: string, questionId: string) => boolean;
};

export function ExamSearchResults({ results, query, section, itemLabel, isFinished }: ExamSearchResultsProps) {
  const cards: SearchCardResult[] = results.map(result => result.type === "semester"
    ? {
        type: "summary",
        key: `semester-${result.examId}`,
        to: `/${section}/${result.examId}`,
        eyebrow: "semester",
        title: result.examLabel,
        meta: `${pluralize(result.questionCount, itemLabel)} available`,
      }
    : {
        type: "item",
        key: `${result.examId}-${result.questionId}`,
        to: `/${section}/${result.examId}/${result.questionId}`,
        eyebrow: result.examLabel,
        title: result.title,
        tags: result.topics,
        preview: promptSnippet(result.prompt, query),
        finished: isFinished(result.examId, result.questionId),
      });

  return <SearchResultList results={cards} query={query} />;
}
