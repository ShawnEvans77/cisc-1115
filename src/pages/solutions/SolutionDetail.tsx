import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { findExamQuestion } from "../../data/exams";
import {
  ExplanationBlock,
  QuestionPromptBlock,
  SOLUTION_BLOCK_ID,
  SolutionBlock,
} from "../../components/exams/QuestionBlocks";
import { QuestionPageLayout } from "../../components/exams/QuestionPageLayout";
import { FinishToggle } from "../../components/ui/FinishToggle";
import { NotFoundState } from "../../components/ui/NotFoundState";
import { useFinishedQuestions } from "../../hooks/useFinishedQuestions";

// Set by the "View solution" link on QuestionDetail.
type SolutionLocationState = {
  scrollToSolution?: boolean;
};

function scrollToSolution(behavior: ScrollBehavior) {
  document.getElementById(SOLUTION_BLOCK_ID)?.scrollIntoView({ behavior });
}

function SolutionDetail() {
  const { examId, questionId } = useParams<{ examId: string; questionId: string }>();
  const location = useLocation();
  const match = findExamQuestion(examId, questionId);
  const { isFinished, toggleFinished } = useFinishedQuestions();

  useEffect(() => {
    if ((location.state as SolutionLocationState | null)?.scrollToSolution) {
      scrollToSolution("auto");
    }
  }, [location.state]);

  if (!match) {
    return <NotFoundState title="Question not found" backTo="/solutions" backLabel="← Back to solutions" />;
  }

  const { exam, question } = match;

  return (
    <QuestionPageLayout
      exam={exam}
      question={question}
      section="solutions"
      headerAction={
        <div className="detail-actions">
          <FinishToggle
            finished={isFinished(exam.id, question.id)}
            onToggle={() => toggleFinished(exam.id, question.id)}
          />
          <button className="skip-to-solution-btn" onClick={() => scrollToSolution("smooth")}>
            Skip to Solution ↓
          </button>
        </div>
      }
      bottomNav={
        <>
          <Link to={`/solutions/${exam.id}`} className="back-link">
            ← All {exam.label} questions
          </Link>
          <Link to="/solutions" className="muted-link">
            All semesters →
          </Link>
        </>
      }
    >
      <QuestionPromptBlock question={question} />
      <SolutionBlock question={question} />
      <ExplanationBlock question={question} />
    </QuestionPageLayout>
  );
}

export default SolutionDetail;
