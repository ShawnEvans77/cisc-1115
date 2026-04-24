// src/pages/questions/SemesterQuestions.tsx
import { QuestionListPage } from "../../components/exams/QuestionListPage";

function SemesterQuestions() {
  return (
    <QuestionListPage
      basePath="/questions"
      subtitle="select a question to view its prompt"
    />
  );
}

export default SemesterQuestions;
