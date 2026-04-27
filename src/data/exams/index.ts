// src/data/exams/index.ts
// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for all exam data.
// To add a new exam:
//   1. Create src/data/exams/<term-year>.ts
//   2. Import it here and add it to the array in chronological order.
// ─────────────────────────────────────────────────────────────────────────────

import type { Exam, Question } from "../../types";

import { fall2018 }   from "./fall-2018";
import { fall2020 }   from "./fall-2020";
import { spring2021 } from "./spring-2021";
import { spring2023 } from "./spring-2023";

export const exams: Exam[] = [
  fall2018,
  fall2020,
  spring2021,
  spring2023
];

export function findExamById(examId?: string): Exam | undefined {
  return exams.find(exam => exam.id === examId);
}

export function findExamQuestion(examId?: string, questionId?: string): { exam: Exam; question: Question } | undefined {
  const exam = findExamById(examId);
  const question = exam?.questions.find(entry => entry.id === questionId);

  return exam && question ? { exam, question } : undefined;
}
