import type { Question } from "../../types";
import { CodeBlock } from "../ui/CodeBlock";
import { ContentBlock } from "../ui/ContentBlock";
import { CopyButton } from "../ui/CopyButton";
import { MathDisplay } from "../ui/MathDisplay";
import { PromptBody } from "../ui/PromptBody";

type QuestionBlockProps = {
  question: Question;
};

export function QuestionPromptBlock({ question }: QuestionBlockProps) {
  return (
    <ContentBlock label="The Question">
      <PromptBody text={question.prompt} />
      {question.mathLatex && <MathDisplay latex={question.mathLatex} />}
    </ContentBlock>
  );
}

// SolutionDetail scrolls to this block by id.
export const SOLUTION_BLOCK_ID = "solution";

export function SolutionBlock({ question }: QuestionBlockProps) {
  return (
    <ContentBlock
      id={SOLUTION_BLOCK_ID}
      label="Solution"
      headerSlot={<CopyButton content={question.solution} />}
    >
      <CodeBlock code={question.solution} language={question.solutionType ?? "java"} />
    </ContentBlock>
  );
}

export function ExplanationBlock({ question }: QuestionBlockProps) {
  return (
    <ContentBlock label="Explanation">
      <PromptBody text={question.explanation} />
    </ContentBlock>
  );
}
