// src/pages/questions/SemesterQuestions.tsx
import React from "react";
import { QuestionListPage } from "../../components/exams/QuestionListPage";

function SemesterQuestions(): React.ReactElement {
  return (
    <QuestionListPage
      basePath="/questions"
      subtitle="select a question to view its prompt"
    />
  );
}

export default SemesterQuestions;