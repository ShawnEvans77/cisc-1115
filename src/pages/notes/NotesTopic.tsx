import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { findTopicById } from "../../data/notes";
import { Breadcrumb } from "../../components/ui/Breadcrumb";
import { EmptyState } from "../../components/ui/EmptyState";
import { EntryCard } from "../../components/ui/EntryCard";
import { NotFoundState } from "../../components/ui/NotFoundState";
import { PageHeader } from "../../components/ui/PageHeader";
import { getNoteContentSnippet, noteEntryMatchesQuery } from "../../utils/noteSearch";
import { hasQuery, normalizeQuery, resultCountLabel } from "../../utils/search";

function NotesTopic() {
  const { topicId } = useParams<{ topicId: string }>();
  const topic = findTopicById(topicId);
  const [query, setQuery] = useState("");

  const filteredEntries = useMemo(() => {
    if (!topic) return [];
    const q = normalizeQuery(query);
    if (!q) return topic.entries;
    return topic.entries.filter(entry => noteEntryMatchesQuery(entry, q));
  }, [query, topic]);

  if (!topic) {
    return <NotFoundState title="Topic not found" backTo="/notes" backLabel="← Back to notes" />;
  }

  return (
    <div className="page-root">
      <Breadcrumb crumbs={[
        { label: "notes", to: "/notes" },
        { label: topic.label },
      ]} />

      <PageHeader
        detail
        title={topic.label}
        subtitle="select a note to read it"
        query={query}
        placeholder="search notes..."
        resultLabel={hasQuery(query) ? resultCountLabel(filteredEntries.length, topic.entries.length, "note") : undefined}
        onQueryChange={setQuery}
      />

      <section className="page-section page-section--questions">
        {filteredEntries.length === 0 ? (
          <EmptyState query={query} />
        ) : (
          filteredEntries.map(entry => (
            <EntryCard
              key={entry.id}
              to={`/notes/${topic.id}/${entry.id}`}
              title={entry.title}
              tags={entry.tags}
              snippet={getNoteContentSnippet(entry, query)}
              query={query}
            />
          ))
        )}

        <div className="detail-bottom-nav">
          <Link to="/notes" className="back-link">← All topics</Link>
        </div>
      </section>
    </div>
  );
}

export default NotesTopic;
