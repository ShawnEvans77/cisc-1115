// src/pages/ExamDetail.tsx
import React from "react";
import { QuestionListPage } from "../components/QuestionListPage";

function SemesterSolutions(): React.ReactElement {
  return (
    <QuestionListPage
      basePath="/solutions"
      subtitle="select a question to view its solution"
    />
  );
}

export default SemesterSolutions;