import type { Exam } from "../types";
import { useCallback, useEffect, useMemo, useState } from "react";

export type FinishedFilter = "all" | "unfinished" | "finished";

const STORAGE_KEY = "cisc-1115-finished-questions";
const LEGACY_STORAGE_KEY = "cisc-1115-visited-questions";

export function getQuestionProgressKey(examId: string, questionId: string): string {
  return `${examId}:${questionId}`;
}

function parseStoredKeys(value: string | null): string[] {
  try {
    const parsed = JSON.parse(value ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function readFinishedQuestions(): string[] {
  const current = parseStoredKeys(localStorage.getItem(STORAGE_KEY));
  if (current.length > 0) return current;

  return parseStoredKeys(localStorage.getItem(LEGACY_STORAGE_KEY));
}

function writeFinishedQuestions(keys: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...keys]));
  } catch {
    // Progress is a convenience feature; the app should keep working if storage is unavailable.
  }
}

export function matchesFinishedFilter(finished: boolean, filter: FinishedFilter): boolean {
  if (filter === "finished") return finished;
  if (filter === "unfinished") return !finished;
  return true;
}

export function useFinishedQuestions() {
  const [finishedKeys, setFinishedKeys] = useState<Set<string>>(() => new Set(readFinishedQuestions()));

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY || event.key === LEGACY_STORAGE_KEY) {
        setFinishedKeys(new Set(readFinishedQuestions()));
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const updateFinishedKeys = useCallback((updater: (keys: Set<string>) => void) => {
    setFinishedKeys(current => {
      const next = new Set(current);
      updater(next);
      writeFinishedQuestions(next);
      return next;
    });
  }, []);

  const toggleFinished = useCallback((examId: string, questionId: string) => {
    updateFinishedKeys(keys => {
      const key = getQuestionProgressKey(examId, questionId);
      if (keys.has(key)) keys.delete(key);
      else keys.add(key);
    });
  }, [updateFinishedKeys]);

  const isFinished = useCallback((examId: string, questionId: string) => {
    return finishedKeys.has(getQuestionProgressKey(examId, questionId));
  }, [finishedKeys]);

  const isExamFinished = useCallback((exam: Exam) => {
    return exam.questions.length > 0 && exam.questions.every(question => isFinished(exam.id, question.id));
  }, [isFinished]);

  return useMemo(() => ({
    finishedKeys,
    toggleFinished,
    isFinished,
    isExamFinished,
  }), [finishedKeys, toggleFinished, isFinished, isExamFinished]);
}
