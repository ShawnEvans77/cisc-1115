import { useMemo } from "react";
import { exams } from "../data/exams";
import { collectNestedSearchResults, normalizeQuery } from "../utils/search";
import {
  createQuestionSearchResult,
  createSemesterSearchResult,
  examMatchesQuery,
  questionMatchesQuery,
  type ExamSearchResult,
} from "../utils/examSearch";

export function useExamSearch(query: string): ExamSearchResult[] {
  return useMemo(() => {
    const q = normalizeQuery(query);
    if (!q) return [];

    return collectNestedSearchResults(
      exams,
      exam => exam.questions,
      exam => examMatchesQuery(exam, q),
      question => questionMatchesQuery(question, q),
      createSemesterSearchResult,
      createQuestionSearchResult,
    );
  }, [query]);
}
