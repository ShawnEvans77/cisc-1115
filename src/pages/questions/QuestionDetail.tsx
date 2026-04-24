// src/pages/questions/QuestionDetail.tsx
import { Link, useParams } from "react-router-dom";
import { exams } from "../../data/exams";
import { QuestionPageLayout } from "../../components/exams/QuestionPageLayout";
import { ContentBlock, PromptBody, QuestionMath } from "../../components/ui/ContentBlock";
import { NotFoundState } from "../../components/ui/NotFoundState";

function QuestionDetail() {
  const { examId, questionId } = useParams<{ examId: string; questionId: string }>();
  const exam     = exams.find(e => e.id === examId);
  const question = exam?.questions.find(q => q.id === questionId);

  if (!exam || !question) {
    return <NotFoundState title="Question not found" backTo="/questions" backLabel="← Back to questions" />;
  }

  return (
    <QuestionPageLayout
      exam={exam}
      question={question}
      basePath="/questions"
      bottomNav={
        <>
          <Link to={`/questions/${exam.id}`} className="back-link">
            ← All {exam.label} questions
          </Link>
          <Link
            to={`/solutions/${exam.id}/${question.id}`}
            state={{ scrollToSolution: true }}
            className="solution-link"
          >
            View solution →
          </Link>
        </>
      }
    >
      <ContentBlock label="The Question">
        <PromptBody text={question.prompt} />
        {question.mathLatex && <QuestionMath latex={question.mathLatex} />}
      </ContentBlock>
    </QuestionPageLayout>
  );
}

export default QuestionDetail;
