// src/components/NoteListPage.tsx
import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { notes } from "../data/notes";
import { Breadcrumb } from "./Breadcrumb";
import { NoteCard } from "./NoteCard";

export function NoteListPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const topic = notes.find(t => t.id === topicId);
  const [query, setQuery] = useState("");

  const filteredEntries = useMemo(() => {
    if (!topic) return [];
    const q = query.trim().toLowerCase();
    if (!q) return topic.entries;
    return topic.entries.filter(entry =>
      entry.title.toLowerCase().includes(q) ||
      entry.tags.some(t => t.toLowerCase().includes(q)) ||
      entry.sections.some(s => s.content.toLowerCase().includes(q))
    );
  }, [query, topic]);

  if (!topic) {
    return (
      <div className="page-root not-found-center">
        <div className="not-found-content">
          <p className="page-eyebrow">404</p>
          <h1 className="not-found-title">Topic not found</h1>
          <Link to="/notes" className="back-link">← Back to notes</Link>
        </div>
      </div>
    );
  }

  const showResults = query.trim().length > 0;
  const resultLabel = filteredEntries.length === 0
    ? "no results"
    : `${filteredEntries.length} of ${topic.entries.length} notes`;

  return (
    <div className="page-root">

      <Breadcrumb crumbs={[
        { label: "notes", to: "/notes" },
        { label: topic.label },
      ]} />

      <div className="page-header page-header--detail">
        <p className="page-eyebrow">Brooklyn College &nbsp;·&nbsp; CISC 1115</p>
        <h1 className="page-title">{topic.label}</h1>
        <p className="page-subtitle">select a note to read it</p>

        <input
          className="search-input"
          type="text"
          placeholder="search notes..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />

        {showResults && (
          <p className="search-result-count">{resultLabel}</p>
        )}
      </div>

      <section className="page-section page-section--questions">
        {filteredEntries.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state-text">nothing found for "{query}"</p>
          </div>
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