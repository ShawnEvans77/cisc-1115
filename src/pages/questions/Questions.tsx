import { ExamIndexPage } from "../../components/exams/ExamIndexPage";

function Questions() {
  return (
    <ExamIndexPage
      section="questions"
      itemLabel="question"
      subtitle="select a semester to browse its questions"
      placeholder="search questions..."
    />
  );
}

export default Questions;
