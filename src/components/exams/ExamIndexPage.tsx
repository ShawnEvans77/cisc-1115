import { useState } from "react";
import { exams } from "../../data/exams";
import { useExamSearch } from "../../hooks/useExamSearch";
import { hasQuery, pluralize, resultCountLabel } from "../../utils/search";
import { PageHeader } from "../ui/PageHeader";
import { SemesterCard } from "../ui/SemesterCard";
import { SearchResults } from "./SearchResults";

type ExamIndexPageProps = {
  title: string;
  subtitle: string;
  placeholder: string;
  basePath: "/questions" | "/solutions";
  itemLabel: "question" | "solution";
};

export function ExamIndexPage({
  title,
  subtitle,
  placeholder,
  basePath,
  itemLabel,
}: ExamIndexPageProps) {
  const [query, setQuery] = useState("");
  const results = useExamSearch(query);
  const searching = hasQuery(query);

  return (
    <div className="page-root">
      <PageHeader
        title={title}
        subtitle={subtitle}
        query={query}
        placeholder={placeholder}
        resultLabel={searching ? resultCountLabel(results.length) : undefined}
        onQueryChange={setQuery}
      />

      <section className="page-section">
        {searching ? (
          <SearchResults results={results} query={query} basePath={basePath} itemLabel={itemLabel} />
        ) : (
          exams.map((exam, index) => (
            <SemesterCard
              key={exam.id}
              index={String(index + 1).padStart(2, "0")}
              label={exam.label}
              sublabel={pluralize(exam.questions.length, itemLabel)}
              to={`${basePath}/${exam.id}`}
            />
          ))
        )}
      </section>
    </div>
  );
}
