// src/pages/NotesDetail.tsx
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { notes } from "../data/notes";
import { NotePageLayout, NoteNotFound } from "../components/NotePageLayout";
import { ContentBlock, PromptLines } from "../components/ContentBlock";
import { highlightJava } from "../utils/highlightJava";

function CopyButton({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button onClick={handleCopy} className={`copy-btn${copied ? " copied" : ""}`}>
      {copied ? "✓ Copied!" : "Copy code"}
    </button>
  );
}

function NotesDetail(): React.ReactElement {
  const { topicId, entryId } = useParams<{ topicId: string; entryId: string }>();
  const topic = notes.find(t => t.id === topicId);
  const entry = topic?.entries.find(e => e.id === entryId);

  if (!topic || !entry) {
    return <NoteNotFound />;
  }

  return (
    <NotePageLayout
      topic={topic}
      entry={entry}
      bottomNav={
        <>
          <Link to={`/notes/${topic.id}`} className="back-link">
            ← All {topic.label} notes
          </Link>
          <Link to="/notes" className="muted-link">
            All topics →
          </Link>
        </>
      }
    >
      {entry.sections.map((section, i) =>
        section.type === "text" ? (
          <ContentBlock key={i} label={section.label}>
            <PromptLines text={section.content} />
          </ContentBlock>
        ) : (
          <ContentBlock
            key={i}
            label={section.label}
            headerSlot={<CopyButton content={section.content} />}
          >
            <div className="code-scroll-wrapper">
              <pre>{highlightJava(section.content)}</pre>
            </div>
          </ContentBlock>
        )
      )}
    </NotePageLayout>
  );
}

export default NotesDetail;