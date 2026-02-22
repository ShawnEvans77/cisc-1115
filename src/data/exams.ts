export interface Question {
  id: string;
  title: string;
  topics: string[];
}

export interface Exam {
  id: string;
  label: string;
  year: string;
  questions: Question[];
}

export const exams: Exam[] = [
  {
    id: "fall-2020",
    label: "Fall 2020",
    year: "2020",
    questions: [
      { id: "question-2",  title: "Question 2",  topics: ["Arrays", "Loops"] },
      { id: "question-5a", title: "Question 5a", topics: ["Methods", "Conditionals"] },
      { id: "question-7",  title: "Question 7",  topics: ["Recursion"] },
    ],
  },
  {
    id: "spring-2021",
    label: "Spring 2021",
    year: "2021",
    questions: [
      { id: "question-1",  title: "Question 1",  topics: ["Variables", "Types"] },
      { id: "question-2",  title: "Question 2",  topics: ["Loops"] },
      { id: "question-5",  title: "Question 5",  topics: ["Arrays"] },
      { id: "question-6",  title: "Question 6",  topics: ["OOP"] },
      { id: "question-7",  title: "Question 7",  topics: ["Recursion"] },
    ],
  },
];