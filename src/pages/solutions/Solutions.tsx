// src/pages/solutions/Solutions.tsx
import { ExamIndexPage } from "../../components/exams/ExamIndexPage";

function Solutions() {
  return (
    <ExamIndexPage
      title="solutions"
      subtitle="select a semester to browse its solutions"
      placeholder="search solutions..."
      basePath="/solutions"
      itemLabel="solution"
    />
  );
}

export default Solutions;
