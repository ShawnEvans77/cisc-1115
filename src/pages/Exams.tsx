// src/pages/Exams.tsx
import React, { useState } from "react";
import { SemesterCard } from "../components/SemesterCard";

interface Exam {
  label: string;
  year: string;
  pdf: string;
  index: string;
}

const exams: Exam[] = [
  { index: "01", label: "fall 2017",   year: "2017", pdf: "/exams/fall-2017.pdf"   },
  { index: "02", label: "fall 2018",   year: "2018", pdf: "/exams/fall-2018.pdf"   },
  { index: "03", label: "fall 2020",   year: "2020", pdf: "/exams/fall-2020.pdf"   },
  { index: "04", label: "spring 2021", year: "2021", pdf: "/exams/spring-2021.pdf" },
  { index: "05", label: "spring 2023", year: "2023", pdf: "/exams/spring-2023.pdf" },
];

function Exams(): React.ReactElement {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = q
    ? exams.filter(e => e.label.includes(q) || e.year.includes(q))
    : exams;

  const showResults = query.trim().length > 0;

  const resultLabel = filtered.length === 0
    ? "no results"
    : `${filtered.length} of ${exams.length} exams`;

  return (
    <div className="page-root">

      <div className="page-header">
        <p className="page-eyebrow">Brooklyn College &nbsp;·&nbsp; CISC 1115</p>
        <h1 className="page-title">past exams</h1>
        <p className="page-subtitle">click any exam to open the pdf</p>

        <input
          className="search-input"
          type="text"
          placeholder="search exams..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />

        {showResults && (
          <p className="search-result-count">{resultLabel}</p>
        )}
      </div>

      <section className="page-section">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state-text">nothing found for "{query}"</p>
          </div>
        ) : (
          filtered.map(exam => (
            <SemesterCard
              key={exam.pdf}
              index={exam.index}
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