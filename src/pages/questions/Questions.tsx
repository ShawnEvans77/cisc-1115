// src/pages/questions/Questions.tsx
import { ExamIndexPage } from "../../components/exams/ExamIndexPage";

function Questions() {
  return (
    <ExamIndexPage
      title="questions"
      subtitle="select a semester to browse its questions"
      placeholder="search questions..."
      basePath="/questions"
      itemLabel="question"
    />
  );
}

export default Questions;
