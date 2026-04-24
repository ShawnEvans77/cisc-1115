// src/pages/solutions/SemesterSolutions.tsx
import { QuestionListPage } from "../../components/exams/QuestionListPage";

function SemesterSolutions() {
  return (
    <QuestionListPage
      basePath="/solutions"
      subtitle="select a question to view its solution"
    />
  );
}

export default SemesterSolutions;
