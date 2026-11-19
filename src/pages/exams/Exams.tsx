import { useMemo, useState } from "react";
import { examPdfs } from "../../data/examPdfs";
import { EmptyState } from "../../components/ui/EmptyState";
import { IndexedCardList } from "../../components/ui/IndexedCardList";
import { PageHeader } from "../../components/ui/PageHeader";
import { hasQuery, normalizeQuery, resultCountLabel } from "../../utils/search";

function Exams() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = normalizeQuery(query);
    if (!q) return examPdfs;
    return examPdfs.filter(exam => exam.label.includes(q) || exam.year.includes(q));
  }, [query]);

  const showResults = hasQuery(query);

  return (
    <div className="page-root">
      <PageHeader
        title="past exams"
        query={query}
        placeholder="search exams..."
        resultLabel={showResults ? resultCountLabel(filtered.length, examPdfs.length, "exam") : undefined}
        onQueryChange={setQuery}
      />

      <section className="page-section">
        {filtered.length === 0 ? (
          <EmptyState query={query} />
        ) : (
          <IndexedCardList items={filtered.map(exam => ({
            id: exam.id,
            label: exam.label,
            sublabel: "PDF",
            href: exam.pdf,
          }))} />
        )}
      </section>

    </div>
  );
}

export default Exams;
