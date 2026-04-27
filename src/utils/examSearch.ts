import type { Exam, Question } from "../types";
import { normalizeQuery, searchablePrompt } from "./search";

export type ExamSemesterSearchResult = {
  type: "semester";
  examId: string;
  examLabel: string;
  year: string;
  questionCount: number;
};

export type ExamQuestionSearchResult = {
  type: "question";
  examId: string;
  examLabel: string;
  questionId: string;
  title: string;
  topics: string[];
  prompt: string;
};

export type ExamSearchResult = ExamSemesterSearchResult | ExamQuestionSearchResult;

export function createSemesterSearchResult(exam: Exam): ExamSemesterSearchResult {
  return {
    type: "semester",
    examId: exam.id,
    examLabel: exam.label,
    year: exam.year,
    questionCount: exam.questions.length,
  };
}

export function createQuestionSearchResult(exam: Exam, question: Question): ExamQuestionSearchResult {
  return {
    type: "question",
    examId: exam.id,
    examLabel: exam.label,
    questionId: question.id,
    title: question.title,
    topics: question.topics,
    prompt: question.prompt,
  };
}

export function createAllQuestionSearchResults(exams: Exam[]): ExamQuestionSearchResult[] {
  return exams.flatMap(exam => exam.questions.map(question => createQuestionSearchResult(exam, question)));
}

export function examMatchesQuery(exam: Exam, query: string): boolean {
  return (
    exam.label.toLowerCase().includes(query) ||
    exam.year.toLowerCase().includes(query) ||
    exam.id.toLowerCase().includes(query)
  );
}

export function questionMatchesQuery(question: Question, query: string): boolean {
  return (
    question.title.toLowerCase().includes(query) ||
    question.topics.some(topic => topic.toLowerCase().includes(query)) ||
    searchablePrompt(question.prompt).toLowerCase().includes(query)
  );
}

export function normalizeSearchQuery(query: string): string {
  return normalizeQuery(query);
}
