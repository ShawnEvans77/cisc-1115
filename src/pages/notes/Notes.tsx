import { useState } from "react";
import { notes } from "../../data/notes";
import { useNotesSearch } from "../../hooks/useNotesSearch";
import { NoteSearchResults } from "../../components/notes/NoteSearchResults";
import { IndexedCardList } from "../../components/ui/IndexedCardList";
import { PageHeader } from "../../components/ui/PageHeader";
import { hasQuery, pluralize, resultCountLabel } from "../../utils/search";

function Notes() {
  const [query, setQuery] = useState("");
  const results = useNotesSearch(query);
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

      <section className="page-section">
        {showResults ? (
          <NoteSearchResults results={results} query={query} />
        ) : (
          <IndexedCardList items={notes.map(topic => ({
            id: topic.id,
            label: topic.label,
            sublabel: pluralize(topic.entries.length, "note"),
            to: `/notes/${topic.id}`,
          }))} />
        )}
      </section>
    </div>
  );
}

export default Notes;
