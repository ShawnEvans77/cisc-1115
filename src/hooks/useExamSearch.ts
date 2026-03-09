import { useMemo } from "react";
import { exams } from "../data/exams";

type SemesterResult = {
  type: "semester";
  examId: string;
  examLabel: string;
  year: string;
  questionCount: number;
};

type QuestionResult = {
  type: "question";
  examId: string;
  examLabel: string;
  questionId: string;
  title: string;
  topics: string[];
  prompt: string;
};

export type SearchResult = SemesterResult | QuestionResult;

export function useExamSearch(query: string): SearchResult[] {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const matches: SearchResult[] = [];

    for (const exam of exams) {
      if (
        exam.label.toLowerCase().includes(q) ||
        exam.year.toLowerCase().includes(q) ||
        exam.id.toLowerCase().includes(q)
      ) {
        matches.push({ type: "semester", examId: exam.id, examLabel: exam.label, year: exam.year, questionCount: exam.questions.length });
        continue;
      }
      for (const question of exam.questions) {
        if (
          question.title.toLowerCase().includes(q) ||
          question.topics.some(t => t.toLowerCase().includes(q)) ||
          question.prompt.toLowerCase().includes(q)
        ) {
          matches.push({ type: "question", examId: exam.id, examLabel: exam.label, questionId: question.id, title: question.title, topics: question.topics, prompt: question.prompt });
        }
      }
    }
    return matches;
  }, [query]);
}