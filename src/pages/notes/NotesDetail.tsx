import { Link, useParams } from "react-router-dom";
import { findTopicById } from "../../data/notes";
import { AlgorithmVisualizer } from "../../components/notes/AlgorithmVisualizer";
import { BaseConverter } from "../../components/notes/BaseConverter";
import { BinaryArithmetic } from "../../components/notes/BinaryArithmetic";
import { NoteEntryList } from "../../components/notes/NoteEntryList";
import { PrintfPlayground } from "../../components/notes/PrintfPlayground";
import { StringExplorer } from "../../components/notes/StringExplorer";
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

  // a group's id sits in the same URL slot as a note's id; group ids never match note ids
  const group = topic?.groups?.find(g => g.id === entryId);
  if (topic && group) return <NoteEntryList key={`${topic.id}/${group.id}`} topic={topic} group={group} />;

  if (!topic || !entry) {
    return <NotFoundState title="Note not found" backTo="/notes" backLabel="← Back to notes" />;
  }

  const entryGroup = topic.groups?.find(g => g.id === entry.group);

  const converter = entry.converter && (
    <BaseConverter key={entry.id} from={entry.converter.from} to={entry.converter.to} value={entry.converter.value} />
  );

  return (
    <DetailPageLayout
      crumbs={[
        { label: "notes", to: "/notes" },
        { label: topic.label, to: `/notes/${topic.id}` },
        ...(entryGroup ? [{ label: entryGroup.title, to: `/notes/${topic.id}/${entryGroup.id}` }] : []),
        { label: entry.title },
      ]}
      title={entry.title}
      tags={entry.tags}
      bottomNav={
        <>
          {entryGroup ? (
            <Link to={`/notes/${topic.id}/${entryGroup.id}`} className="back-link">
              ← Back to {entryGroup.title}
            </Link>
          ) : (
            <Link to={`/notes/${topic.id}`} className="back-link">
              ← All {topic.label} notes
            </Link>
          )}
          <Link to="/notes" className="muted-link">
            All topics →
          </Link>
        </>
      }
    >
      {entry.visualizer && implementation && (
        <AlgorithmVisualizer key={entry.id} algorithm={entry.visualizer} code={implementation.content} />
      )}
      {entry.converter?.above && converter}
      {entry.arithmetic && (
        <BinaryArithmetic
          key={entry.id}
          op={entry.arithmetic.op}
          top={entry.arithmetic.top}
          bottom={entry.arithmetic.bottom}
        />
      )}
      {entry.stringExplorer && (
        <StringExplorer
          key={entry.id}
          text={entry.stringExplorer.text}
          method={entry.stringExplorer.method}
          args={entry.stringExplorer.args}
        />
      )}
      {entry.printf && <PrintfPlayground key={entry.id} format={entry.printf.format} args={entry.printf.args} />}
      {entry.sections.map((section, i) =>
        section.type === "text" ? (
          <ContentBlock key={i} label={section.label}>
            <div className="chart-body">
              <PromptBody text={section.content} />
            </div>
          </ContentBlock>
        ) : (
          // keyed by note so the comment toggle resets when moving to another note
          <JavaCodeBlock key={`${entry.id}-${i}`} label={section.label} code={section.content} />
        )
      )}
      {entry.converter && !entry.converter.above && converter}
    </DetailPageLayout>
  );
}

export default NotesDetail;
