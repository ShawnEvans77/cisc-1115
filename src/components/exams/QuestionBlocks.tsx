import { lazy, Suspense } from "react";
import type { Question } from "../../types";
import { ContentBlock } from "../ui/ContentBlock";
import { JavaCodeBlock } from "../ui/JavaCodeBlock";
import { PromptBody } from "../ui/PromptBody";

type QuestionBlockProps = {
  question: Question;
};

// KaTeX is large and only a few questions have math, so it loads on first use.
const MathDisplay = lazy(() => import("../ui/MathDisplay").then(module => ({ default: module.MathDisplay })));

export function QuestionPromptBlock({ question }: QuestionBlockProps) {
  return (
    <ContentBlock label="Question">
      <div className="chart-body">
        <PromptBody text={question.prompt} />
      </div>
      {question.mathLatex && (
        <Suspense fallback={null}>
          <MathDisplay latex={question.mathLatex} />
        </Suspense>
      )}
    </ContentBlock>
  );
}

// SolutionDetail scrolls to this block by id.
export const SOLUTION_BLOCK_ID = "solution";

// Java solutions are shown as copyable code. Text solutions (traces, conversions,
// short answers) use the same markup as prompts, so they can mix prose, tables, and code.
export function SolutionBlock({ question }: QuestionBlockProps) {
  if (question.solutionType === "text") {
    return (
      <ContentBlock id={SOLUTION_BLOCK_ID} label="Solution">
        <div className="chart-body">
          <PromptBody text={question.solution} />
        </div>
      </ContentBlock>
    );
  }

  // keyed by the code so the toggle resets when moving to another question
  return <JavaCodeBlock key={question.solution} id={SOLUTION_BLOCK_ID} label="Solution" code={question.solution} />;
}

export function ExplanationBlock({ question }: QuestionBlockProps) {
  return (
    <ContentBlock label="Explanation">
      <div className="chart-body">
        <PromptBody text={question.explanation} />
      </div>
    </ContentBlock>
  );
}
