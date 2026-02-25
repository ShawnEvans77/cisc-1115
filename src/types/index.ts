// src/types/index.ts

export interface Question {
  id:          string;
  title:       string;
  topics:      string[];
  prompt:      string;
  mathLatex?:  string;   // LaTeX string, rendered by <MathDisplay>
  explanation: string;
  solution:    string;
}

export interface Exam {
  id:        string;
  label:     string;
  year:      string;
  questions: Question[];
}