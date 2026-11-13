export type ExamSection = "questions" | "solutions";

export interface Question {
  id:            string;
  title:         string;
  topics:        string[];
  prompt:        string;
  mathLatex?:    string;             // LaTeX string, rendered by <MathDisplay>
  explanation:   string;
  solution:      string;
  // "java" (default): shown as highlighted, copyable code.
  // "text": rendered with the same markup as prompts (prose, [[table]], [[code]]).
  solutionType?: "java" | "text";
}

export interface Exam {
  id:        string;
  label:     string;
  year:      string;
  questions: Question[];
}

export type NoteSection = {
  type:    "text" | "code";
  label:   string;
  content: string;
};

export type NoteEntry = {
  id:       string;
  title:    string;
  tags:     string[];
  sections: NoteSection[];
};

export type NoteTopic = {
  id:      string;
  label:   string;
  entries: NoteEntry[];
};