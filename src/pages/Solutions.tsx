import React, { useState } from "react";
import { exams } from "../data/exams";
import { useExamSearch } from "../hooks/UseExamSearch";
import { SearchResults } from "../components/SearchResults";
import { SemesterCard } from "../components/SemesterCard";

function Solutions(): React.ReactElement {
  const [query, setQuery] = useState("");
  const results = useExamSearch(query);
  const showResults = query.trim().length > 0;

  return (
    <div style={{ fontFamily: "'Lora', serif", backgroundColor: "#FAFAF8", minHeight: "100vh" }}>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "5rem 2.5rem 3rem" }}>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#E07B00", marginBottom: "1.25rem" }}>
          Brooklyn College &nbsp;·&nbsp; CISC 1115
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 700, color: "#1A1208", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "0.75rem" }}>
          solutions
        </h1>
        <p style={{ fontFamily: "'Lora', serif", fontSize: "1rem", fontStyle: "italic", color: "#9E8A80", marginBottom: "3rem" }}>
          select a semester to browse its solutions
        </p>

        <input
          className="search-input"
          type="text"
          placeholder="search solutions..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />

        {showResults && (
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A89F94", marginTop: "1rem" }}>
            {results.length === 0 ? "no results" : `${results.length} result${results.length === 1 ? "" : "s"}`}
          </p>
        )}
      </div>

      {showResults ? (
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "1rem 2.5rem 8rem" }}>
          <SearchResults results={results} query={query} basePath="/solutions" />
        </section>
      ) : (
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 2.5rem 8rem" }}>
          {exams.map((exam, i) => (
            <SemesterCard
              key={exam.id}
              index={String(i + 1).padStart(2, "0")}
              label={exam.label}
              sublabel={exam.year}
              to={`/solutions/${exam.id}`}
            />
          ))}
        </section>
      )}
    </div>
  );
}

export default Solutions;