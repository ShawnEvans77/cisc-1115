import { useMemo } from "react";
import { exams } from "../data/exams";
import {
  createQuestionSearchResult,
  createSemesterSearchResult,
  examMatchesQuery,
  normalizeSearchQuery,
  questionMatchesQuery,
  type ExamSearchResult,
} from "../utils/examSearch";

export type SearchResult = ExamSearchResult;

export function useExamSearch(query: string): SearchResult[] {
  return useMemo(() => {
    const q = normalizeSearchQuery(query);
    if (!q) return [];
    const matches: SearchResult[] = [];

    for (const exam of exams) {
      if (examMatchesQuery(exam, q)) {
        matches.push(createSemesterSearchResult(exam));
        continue;
      }

      for (const question of exam.questions) {
        if (questionMatchesQuery(question, q)) {
          matches.push(createQuestionSearchResult(exam, question));
        }
      }
    }

    return matches;
  }, [query]);
}
