import { Link, useParams } from "react-router-dom";
import { findExamQuestion } from "../../data/exams";
import { QuestionPromptBlock } from "../../components/exams/QuestionBlocks";
import { QuestionPageLayout } from "../../components/exams/QuestionPageLayout";
import { FinishToggle } from "../../components/ui/FinishToggle";
import { NotFoundState } from "../../components/ui/NotFoundState";
import { useFinishedQuestions } from "../../hooks/useFinishedQuestions";

function QuestionDetail() {
  const { examId, questionId } = useParams<{ examId: string; questionId: string }>();
  const match = findExamQuestion(examId, questionId);
  const { isFinished, toggleFinished } = useFinishedQuestions();

  if (!match) {
    return <NotFoundState title="Question not found" backTo="/questions" backLabel="← Back to questions" />;
  }

  const { exam, question } = match;

  return (
    <QuestionPageLayout
      exam={exam}
      question={question}
      section="questions"
      headerAction={
        <FinishToggle
          finished={isFinished(exam.id, question.id)}
          onToggle={() => toggleFinished(exam.id, question.id)}
        />
      }
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
      <QuestionPromptBlock question={question} />
    </QuestionPageLayout>
  );
}

export default QuestionDetail;
