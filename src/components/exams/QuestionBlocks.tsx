import { useState } from "react";
import type { Question } from "../../types";
import { hasJavaComments, stripJavaComments } from "../../utils/javaComments";
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

  // keyed by the code so the toggle resets when moving to another question
  return <JavaSolutionBlock key={question.solution} code={question.solution} />;
}

// "Remove comments" hides every comment in the solution. Copy code copies
// whatever is currently shown.
function JavaSolutionBlock({ code }: { code: string }) {
  const [hideComments, setHideComments] = useState(false);
  const canStrip = hasJavaComments(code);
  const shownCode = hideComments ? stripJavaComments(code) : code;

  return (
    <ContentBlock
      id={SOLUTION_BLOCK_ID}
      label="Solution"
      headerSlot={
        <div className="code-actions">
          {canStrip && (
            <button
              type="button"
              className="comment-toggle"
              aria-pressed={hideComments}
              onClick={() => setHideComments(hidden => !hidden)}
            >
              {hideComments ? "Show comments" : "Remove comments"}
            </button>
          )}
          <CopyButton content={shownCode} />
        </div>
      }
    >
      <CodeBlock code={shownCode} />
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
