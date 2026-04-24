// src/pages/notes/NotesDetail.tsx
import { Link, useParams } from "react-router-dom";
import { notes } from "../../data/notes";
import { NotePageLayout } from "../../components/notes/NotePageLayout";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { ContentBlock, PromptBody } from "../../components/ui/ContentBlock";
import { CopyButton } from "../../components/ui/CopyButton";
import { NotFoundState } from "../../components/ui/NotFoundState";

function NotesDetail() {
  const { topicId, entryId } = useParams<{ topicId: string; entryId: string }>();
  const topic = notes.find(t => t.id === topicId);
  const entry = topic?.entries.find(e => e.id === entryId);

  if (!topic || !entry) {
    return <NotFoundState title="Note not found" backTo="/notes" backLabel="← Back to notes" />;
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
            <PromptBody text={section.content} />
          </ContentBlock>
        ) : (
          <ContentBlock
            key={i}
            label={section.label}
            headerSlot={<CopyButton content={section.content} />}
          >
            <CodeBlock code={section.content} />
          </ContentBlock>
        )
      )}
    </NotePageLayout>
  );
}

export default NotesDetail;
