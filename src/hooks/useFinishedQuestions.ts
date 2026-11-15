import type { Exam } from "../types";
import { useCallback, useMemo, useSyncExternalStore } from "react";
import { getFinishedKeys, progressKey, subscribeToFinishedKeys, toggleFinished } from "../utils/finishedQuestions";

export type FinishedFilter = "all" | "unfinished" | "finished";

export function matchesFinishedFilter(finished: boolean, filter: FinishedFilter): boolean {
  if (filter === "finished") return finished;
  if (filter === "unfinished") return !finished;
  return true;
}

export function useFinishedQuestions() {
  const finishedKeys = useSyncExternalStore(subscribeToFinishedKeys, getFinishedKeys);

  const isFinished = useCallback((examId: string, questionId: string) => {
    return finishedKeys.has(progressKey(examId, questionId));
  }, [finishedKeys]);

  const isExamFinished = useCallback((exam: Exam) => {
    return exam.questions.length > 0 && exam.questions.every(question => isFinished(exam.id, question.id));
  }, [isFinished]);

  return useMemo(() => ({
    toggleFinished,
    isFinished,
    isExamFinished,
  }), [isFinished, isExamFinished]);
}
