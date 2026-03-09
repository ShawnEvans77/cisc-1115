// src/pages/solutions/SemesterSolutions.tsx
import React from "react";
import { QuestionListPage } from "../../components/exams/QuestionListPage";

function SemesterSolutions(): React.ReactElement {
  return (
    <QuestionListPage
      basePath="/solutions"
      subtitle="select a question to view its solution"
    />
  );
}

export default SemesterSolutions;