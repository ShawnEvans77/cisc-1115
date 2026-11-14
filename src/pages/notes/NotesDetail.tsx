import { Link, useParams } from "react-router-dom";
import { COURSE_CODE } from "../../constants";
import { findTopicById } from "../../data/notes";
import { AlgorithmVisualizer } from "../../components/notes/AlgorithmVisualizer";
import { BaseConverter } from "../../components/notes/BaseConverter";
import { ContentBlock } from "../../components/ui/ContentBlock";
import { DetailPageLayout } from "../../components/ui/DetailPageLayout";
import { JavaCodeBlock } from "../../components/ui/JavaCodeBlock";
import { NotFoundState } from "../../components/ui/NotFoundState";
import { PromptBody } from "../../components/ui/PromptBody";

function NotesDetail() {
  const { topicId, entryId } = useParams<{ topicId: string; entryId: string }>();
  const topic = findTopicById(topicId);
  const entry = topic?.entries.find(e => e.id === entryId);
  const implementation = entry?.sections.find(section => section.type === "code");

  if (!topic || !entry) {
    return <NotFoundState title="Note not found" backTo="/notes" backLabel="← Back to notes" />;
  }

  return (
    <DetailPageLayout
      crumbs={[
        { label: "notes", to: "/notes" },
        { label: topic.label, to: `/notes/${topic.id}` },
        { label: entry.title },
      ]}
      eyebrow={`${COURSE_CODE} \u00A0·\u00A0 ${topic.label}`}
      title={entry.title}
      tags={entry.tags}
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
      {entry.visualizer && implementation && (
        <AlgorithmVisualizer key={entry.id} algorithm={entry.visualizer} code={implementation.content} />
      )}
      {entry.sections.map((section, i) =>
        section.type === "text" ? (
          <ContentBlock key={i} label={section.label}>
            <PromptBody text={section.content} />
          </ContentBlock>
        ) : (
          // keyed by note so the comment toggle resets when moving to another note
          <JavaCodeBlock key={`${entry.id}-${i}`} label={section.label} code={section.content} />
        )
      )}
      {entry.converter && <BaseConverter key={entry.id} {...entry.converter} />}
    </DetailPageLayout>
  );
}

export default NotesDetail;
