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

// Algorithms that have an interactive visual on their note page.
export type AlgorithmId = "binarysearch" | "linearsearch" | "bubblesort" | "selectionsort";

export type NumberBase = 2 | 10 | 16;

// Starting state of the step-by-step number converter on a note page.
export type ConverterPreset = {
  from:  NumberBase;
  to:    NumberBase;
  value: string;
  // shown above the note's sections instead of below them
  above?: boolean;
};

export type NoteEntry = {
  id:          string;
  title:       string;
  tags:        string[];
  sections:    NoteSection[];
  visualizer?: AlgorithmId;
  converter?:  ConverterPreset;
  // id of a NoteGroup in the same topic; the entry is listed behind that group's card
  group?:      string;
};

// Several entries shown as one card on the topic page. The card opens
// /notes/<topic>/<group id>, which lists the group's entries.
export type NoteGroup = {
  id:    string;
  title: string;
};

export type NoteTopic = {
  id:      string;
  label:   string;
  groups?: NoteGroup[];
  entries: NoteEntry[];
};