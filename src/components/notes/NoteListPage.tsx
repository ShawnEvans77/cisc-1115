// src/components/notes/NoteListPage.tsx
import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { notes } from "../../data/notes";
import { Breadcrumb } from "../ui/Breadcrumb";
import { EmptyState } from "../ui/EmptyState";
import { NotFoundState } from "../ui/NotFoundState";
import { PageHeader } from "../ui/PageHeader";
import { NoteCard } from "./NoteCard";
import { hasQuery, normalizeQuery, resultCountLabel } from "../../utils/search";

export function NoteListPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const topic = notes.find(t => t.id === topicId);
  const [query, setQuery] = useState("");

  const filteredEntries = useMemo(() => {
    if (!topic) return [];
    const q = normalizeQuery(query);
    if (!q) return topic.entries;
    return topic.entries.filter(entry =>
      entry.title.toLowerCase().includes(q) ||
      entry.tags.some(tag => tag.toLowerCase().includes(q)) ||
      entry.sections.some(section => section.content.toLowerCase().includes(q))
    );
  }, [query, topic]);

  if (!topic) {
    return <NotFoundState title="Topic not found" backTo="/notes" backLabel="← Back to notes" />;
  }

  const showResults = hasQuery(query);

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
        resultLabel={showResults ? resultCountLabel(filteredEntries.length, topic.entries.length, "note") : undefined}
        onQueryChange={setQuery}
      />

      <section className="page-section page-section--questions">
        {filteredEntries.length === 0 ? (
          <EmptyState query={query} />
        ) : (
          filteredEntries.map(entry => (
            <NoteCard
              key={entry.id}
              entry={entry}
              topicId={topic.id}
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
