export interface Answer {
  explanation: string;       // full commented explanation
  code?: string;             // optional code snippet
  language?: string;         // e.g. "java"
}

export interface Question {
  id: string;
  questionNumber: number;
  prompt: string;            // the actual question text
  topics: string[];          // e.g. ["arrays", "loops"]
  difficulty: "easy" | "medium" | "hard";
  answer: Answer;
}

export interface Exam {
  id: string;
  term: "Fall" | "Spring" | "Summer";
  year: number;
  examType: "Midterm" | "Final" | "Quiz";
  questions: Question[];
}