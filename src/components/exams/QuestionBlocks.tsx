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

// Java solutions are shown as copyable code. Text solutions (traces, conversions,
// short answers) use the same markup as prompts, so they can mix prose, tables, and code.
export function SolutionBlock({ question }: QuestionBlockProps) {
  if (question.solutionType === "text") {
    return (
      <ContentBlock id={SOLUTION_BLOCK_ID} label="Solution">
        <PromptBody text={question.solution} />
      </ContentBlock>
    );
  }

  return (
    <ContentBlock
      id={SOLUTION_BLOCK_ID}
      label="Solution"
      headerSlot={<CopyButton content={question.solution} />}
    >
      <CodeBlock code={question.solution} />
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
