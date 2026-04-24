// src/pages/notes/Notes.tsx
import { useState } from "react";
import { notes } from "../../data/notes";
import { useNotesSearch } from "../../hooks/useNotesSearch";
import { NoteSearchResults } from "../../components/notes/NoteSearchResults";
import { PageHeader } from "../../components/ui/PageHeader";
import { SemesterCard } from "../../components/ui/SemesterCard";
import { hasQuery, pluralize, resultCountLabel } from "../../utils/search";

function Notes() {
  const [query, setQuery] = useState("");
  const results     = useNotesSearch(query);
  const showResults = hasQuery(query);

  return (
    <div className="page-root">
      <PageHeader
        title="notes"
        subtitle="select a topic to browse its notes"
        query={query}
        placeholder="search notes..."
        resultLabel={showResults ? resultCountLabel(results.length) : undefined}
        onQueryChange={setQuery}
      />

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
              sublabel={pluralize(topic.entries.length, "note")}
              to={`/notes/${topic.id}`}
            />
          ))}
        </section>
      )}

    </div>
  );
}

export default Notes;
