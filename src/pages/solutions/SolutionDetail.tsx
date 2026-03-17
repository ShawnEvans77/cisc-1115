// src/pages/solutions/SolutionDetail.tsx
import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { exams } from "../../data/exams";
import type { Question } from "../../types";
import { QuestionPageLayout, QuestionNotFound } from "../../components/exams/QuestionPageLayout";
import { ContentBlock, PromptLines, QuestionMath } from "../../components/ui/ContentBlock";
import { highlightJava } from "../../utils/highlightJava";

function SolutionDetail(): React.ReactElement {
  const { examId, questionId } = useParams<{ examId: string; questionId: string }>();
  const location = useLocation();
  const exam     = exams.find(e => e.id === examId);
  const question = exam?.questions.find((q: Question) => q.id === questionId);
  const [copied, setCopied] = useState(false);

  // If navigated from "View solution →", instantly jump to the solution block.
  useEffect(() => {
    if ((location.state as { scrollToSolution?: boolean })?.scrollToSolution) {
      const el = document.getElementById("solution");
      if (el) el.scrollIntoView({ behavior: "instant" as ScrollBehavior });
    }
  }, []);

  if (!exam || !question) {
    return <QuestionNotFound backTo="/solutions" backLabel="← Back to solutions" />;
  }

  function handleCopy() {
    navigator.clipboard.writeText(question!.solution).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
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
        <PromptLines text={question.prompt} />
        {question.mathLatex && <QuestionMath latex={question.mathLatex} />}
      </ContentBlock>

      <ContentBlock
        id="solution"
        label="Solution"
        headerSlot={
          <button onClick={handleCopy} className={`copy-btn${copied ? " copied" : ""}`}>
            {copied ? "✓ Copied!" : "Copy code"}
          </button>
        }
      >
        <div className="code-scroll-wrapper">
          <pre>{question.solutionType === "text" ? question.solution : highlightJava(question.solution)}</pre>
        </div>
      </ContentBlock>

      <ContentBlock label="Explanation">
        <PromptLines text={question.explanation} />
      </ContentBlock>
    </QuestionPageLayout>
  );
}

export default SolutionDetail;