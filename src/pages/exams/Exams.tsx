// src/pages/exams/Exams.tsx
import { useMemo, useState } from "react";
import { examPdfs } from "../../data/examPdfs";
import { SemesterCard } from "../../components/ui/SemesterCard";
import { EmptyState } from "../../components/ui/EmptyState";
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
        subtitle="click any exam to open the pdf"
        query={query}
        placeholder="search exams..."
        resultLabel={showResults ? resultCountLabel(filtered.length, examPdfs.length, "exam") : undefined}
        onQueryChange={setQuery}
      />

      <section className="page-section">
        {filtered.length === 0 ? (
          <EmptyState query={query} />
        ) : (
          filtered.map((exam, index) => (
            <SemesterCard
              key={exam.id}
              index={String(index + 1).padStart(2, "0")}
              label={exam.label}
              sublabel="PDF"
              href={exam.pdf}
            />
          ))
        )}
      </section>

    </div>
  );
}

export default Exams;
