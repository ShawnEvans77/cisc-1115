import { readStorage, writeStorage } from "./storage";

// The set of finished questions, kept in one place for the whole app so every
// component that shows progress updates together, and synced to localStorage.
// Other tabs are picked up through the storage event.

export const STORAGE_KEY = "cisc-1115-finished-questions";
export const LEGACY_STORAGE_KEY = "cisc-1115-visited-questions";

export type FinishedKeys = ReadonlySet<string>;

let snapshot: FinishedKeys | null = null;
const listeners = new Set<() => void>();

export function progressKey(examId: string, questionId: string): string {
  return `${examId}:${questionId}`;
}

function parseStoredKeys(value: string | null): string[] {
  try {
    const parsed: unknown = JSON.parse(value ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function readFinishedKeys(): FinishedKeys {
  const current = parseStoredKeys(readStorage(STORAGE_KEY));
  if (current.length > 0) return new Set(current);
  return new Set(parseStoredKeys(readStorage(LEGACY_STORAGE_KEY)));
}

function notify() {
  for (const listener of listeners) listener();
}

function handleStorage(event: StorageEvent) {
  // a null key means another tab cleared storage
  if (event.key !== null && event.key !== STORAGE_KEY && event.key !== LEGACY_STORAGE_KEY) return;
  snapshot = readFinishedKeys();
  notify();
}

export function getFinishedKeys(): FinishedKeys {
  snapshot ??= readFinishedKeys();
  return snapshot;
}

export function subscribeToFinishedKeys(listener: () => void): () => void {
  if (listeners.size === 0) window.addEventListener("storage", handleStorage);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", handleStorage);
  };
}

export function toggleFinished(examId: string, questionId: string): void {
  const next = new Set(getFinishedKeys());
  const key = progressKey(examId, questionId);
  if (next.has(key)) next.delete(key);
  else next.add(key);

  snapshot = next;
  writeStorage(STORAGE_KEY, JSON.stringify([...next]));
  notify();
}
