// src/pages/Questions.tsx
import React, { useState } from "react";
import { exams } from "../data/exams";
import { useExamSearch } from "../hooks/UseExamSearch";
import { SearchResults } from "../components/SearchResults";
import { SemesterCard } from "../components/SemesterCard";

function Questions(): React.ReactElement {
  const [query, setQuery] = useState("");
  const results = useExamSearch(query);
  const showResults = query.trim().length > 0;

  const resultLabel = results.length === 0
    ? "no results"
    : `${results.length} result${results.length === 1 ? "" : "s"}`;

  return (
    <div className="page-root">

      <div className="page-header">
        <p className="page-eyebrow">Brooklyn College &nbsp;·&nbsp; CISC 1115</p>
        <h1 className="page-title">questions</h1>
        <p className="page-subtitle">select a semester to browse its questions</p>

        <input
          className="search-input"
          type="text"
          placeholder="search questions..."
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
          <SearchResults results={results} query={query} basePath="/questions" />
        </section>
      ) : (
        <section className="page-section">
          {exams.map((exam, i) => (
            <SemesterCard
              key={exam.id}
              index={String(i + 1).padStart(2, "0")}
              label={exam.label}
              sublabel={exam.year}
              to={`/questions/${exam.id}`}
            />
          ))}
        </section>
      )}

    </div>
  );
}

export default Questions;