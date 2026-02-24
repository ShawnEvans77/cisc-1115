import React, { useState } from "react";
import { SemesterCard } from "../components/SemesterCard";

interface Exam {
  label: string;
  year: string;
  pdf: string;
  index: string;
}

const exams: Exam[] = [
  { label: "fall 2017",   year: "2017", pdf: "/exams/fall-2017.pdf",   index: "01" },
  { label: "fall 2018",   year: "2018", pdf: "/exams/fall-2018.pdf",   index: "02" },
  { label: "fall 2020",   year: "2020", pdf: "/exams/fall-2020.pdf",   index: "03" },
  { label: "spring 2021", year: "2021", pdf: "/exams/spring-2021.pdf", index: "04" },
  { label: "spring 2023", year: "2023", pdf: "/exams/spring-2023.pdf", index: "05" },
];

function Exams(): React.ReactElement {
  const [query, setQuery] = useState("");

  const filtered = exams.filter((e) =>
    e.label.toLowerCase().includes(query.trim().toLowerCase()) ||
    e.year.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div style={{ fontFamily: "'Lora', serif", backgroundColor: "#FAFAF8", minHeight: "100vh" }}>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "5rem 2.5rem 3rem" }}>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#E07B00", marginBottom: "1.25rem" }}>
          Brooklyn College &nbsp;·&nbsp; CISC 1115
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 700, color: "#1A1208", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "0.75rem" }}>
          past exams
        </h1>
        <p style={{ fontFamily: "'Lora', serif", fontSize: "1rem", fontStyle: "italic", color: "#9E8A80", marginBottom: "3rem" }}>
          click any exam to open the pdf
        </p>

        <input
          className="search-input"
          type="text"
          placeholder="search exams..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />

        {query.trim() && (
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A89F94", marginTop: "1rem" }}>
            {filtered.length === 0 ? "no results" : `${filtered.length} of ${exams.length} exams`}
          </p>
        )}
      </div>

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 2.5rem 8rem" }}>
        {filtered.length === 0 && query.trim() ? (
          <div style={{ paddingTop: "4rem", textAlign: "center" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontStyle: "italic", color: "#C8BFAF" }}>
              nothing found for "{query}"
            </p>
          </div>
        ) : (
          filtered.map((exam) => (
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