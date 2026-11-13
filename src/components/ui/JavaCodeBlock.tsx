import { useState } from "react";
import { hasJavaComments, stripJavaComments } from "../../utils/javaComments";
import { CodeBlock } from "./CodeBlock";
import { ContentBlock } from "./ContentBlock";
import { CopyButton } from "./CopyButton";

type JavaCodeBlockProps = {
  label: string;
  code: string;
  id?: string;
};

// Labelled Java code with Copy code and, when the code has comments, a "Remove comments"
// toggle. Copy code copies whatever is currently shown. Key it by the code so the toggle
// resets when the page moves to other code.
export function JavaCodeBlock({ label, code, id }: JavaCodeBlockProps) {
  const [hideComments, setHideComments] = useState(false);
  const canStrip = hasJavaComments(code);
  const shownCode = hideComments ? stripJavaComments(code) : code;

  return (
    <ContentBlock
      id={id}
      label={label}
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
