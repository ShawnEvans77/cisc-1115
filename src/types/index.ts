export interface Answer {
  explanation: string;       // full commented explanation
  code?: string;             // optional code snippet
  language?: string;         // e.g. "java"
}

// src/types/index.ts

export interface Question {
  id: string;
  title: string;
  topics: string[];
  prompt: string;
  mathHtml?: string;
  explanation: string;
  solution: string;
}

export interface Exam {
  id: string;
  label: string;
  year: string;
  questions: Question[];
}