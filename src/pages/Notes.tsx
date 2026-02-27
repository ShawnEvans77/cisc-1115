// src/pages/Notes.tsx
import React, { useState } from "react";
import { notes } from "../data/notes";
import { useNotesSearch } from "../hooks/UseNotesSearch";
import { NoteSearchResults } from "../components/NoteSearchResults";
import { SemesterCard } from "../components/SemesterCard";

function Notes(): React.ReactElement {
  const [query, setQuery] = useState("");
  const results   = useNotesSearch(query);
  const showResults = query.trim().length > 0;

  const resultLabel = results.length === 0
    ? "no results"
    : `${results.length} result${results.length === 1 ? "" : "s"}`;

  return (
    <div className="page-root">

      <div className="page-header">
        <p className="page-eyebrow">Brooklyn College &nbsp;·&nbsp; CISC 1115</p>
        <h1 className="page-title">notes</h1>
        <p className="page-subtitle">select a topic to browse its notes</p>

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

      {showResults ? (
        <section className="page-section">
          <NoteSearchResults results={results} query={query} />
        </section>
      ) : (
        <section className="page-section">
          {notes.map((topic, i) => (
            <SemesterCard
              key={topic.id}
              index={String(i + 1).padStart(2, "0")}
              label={topic.label}
              sublabel={`${topic.entries.length} note${topic.entries.length === 1 ? "" : "s"}`}
              to={`/notes/${topic.id}`}
            />
          ))}
        </section>
      )}

    </div>
  );
}

export default Notes;