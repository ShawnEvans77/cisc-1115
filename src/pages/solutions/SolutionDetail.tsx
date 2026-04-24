// src/pages/solutions/SolutionDetail.tsx
import { useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { exams } from "../../data/exams";
import { QuestionPageLayout } from "../../components/exams/QuestionPageLayout";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { ContentBlock, PromptBody, QuestionMath } from "../../components/ui/ContentBlock";
import { CopyButton } from "../../components/ui/CopyButton";
import { NotFoundState } from "../../components/ui/NotFoundState";

type SolutionLocationState = {
  scrollToSolution?: boolean;
};

function SolutionDetail() {
  const { examId, questionId } = useParams<{ examId: string; questionId: string }>();
  const location = useLocation();
  const exam     = exams.find(e => e.id === examId);
  const question = exam?.questions.find(q => q.id === questionId);

  useEffect(() => {
    if ((location.state as SolutionLocationState | null)?.scrollToSolution) {
      document.getElementById("solution")?.scrollIntoView({ behavior: "auto" });
    }
  }, [location.state]);

  if (!exam || !question) {
    return <NotFoundState title="Question not found" backTo="/solutions" backLabel="← Back to solutions" />;
  }

  function handleSkip() {
    document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <QuestionPageLayout
      exam={exam}
      question={question}
      basePath="/solutions"
      headerAction={
        <button className="skip-to-solution-btn" onClick={handleSkip}>
          Skip to Solution ↓
        </button>
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
      <ContentBlock label="The Question">
        <PromptBody text={question.prompt} />
        {question.mathLatex && <QuestionMath latex={question.mathLatex} />}
      </ContentBlock>

      <ContentBlock
        id="solution"
        label="Solution"
        headerSlot={<CopyButton content={question.solution} />}
      >
        <CodeBlock code={question.solution} language={question.solutionType ?? "java"} />
      </ContentBlock>

      <ContentBlock label="Explanation">
        <PromptBody text={question.explanation} />
      </ContentBlock>
    </QuestionPageLayout>
  );
}

export default SolutionDetail;
