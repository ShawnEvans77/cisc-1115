// src/pages/SolutionDetail.tsx
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { exams } from "../data/exams";
import { QuestionPageLayout, QuestionNotFound } from "../components/QuestionPageLayout";
import { ContentBlock, PromptLines, QuestionMath } from "../components/ContentBlock";
import { highlightJava } from "../utils/highlightJava";

function SolutionDetail(): React.ReactElement {
  const { examId, questionId } = useParams<{ examId: string; questionId: string }>();
  const exam     = exams.find(e => e.id === examId);
  const question = exam?.questions.find(q => q.id === questionId);
  const [copied, setCopied] = useState(false);

  if (!exam || !question) {
    return <QuestionNotFound backTo="/solutions" backLabel="← Back to solutions" />;
  }

  function handleCopy() {
    navigator.clipboard.writeText(question!.solution).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <QuestionPageLayout
      exam={exam}
      question={question}
      basePath="/solutions"
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
        label="Solution"
        headerSlot={
          <button onClick={handleCopy} className={`copy-btn${copied ? " copied" : ""}`}>
            {copied ? "✓ Copied!" : "Copy code"}
          </button>
        }
      >
        <div className="code-scroll-wrapper">
          <pre>{highlightJava(question.solution)}</pre>
        </div>
      </ContentBlock>

      <ContentBlock label="Explanation">
        <PromptLines text={question.explanation} />
      </ContentBlock>
    </QuestionPageLayout>
  );
}

export default SolutionDetail;