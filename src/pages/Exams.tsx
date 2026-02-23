import React, { useState } from "react";

interface Exam {
  label: string;
  year: string;
  pdf: string;
  index: string;
}

const exams: Exam[] = [
  { label: "fall 2020", year: "2020", pdf: "/exams/fall-2020.pdf", index: "01" },
  { label: "spring 2021", year: "2021", pdf: "/exams/spring-2021.pdf", index: "02" },
];

function Exams(): React.ReactElement {
  const [query, setQuery] = useState("");

  const filtered = exams.filter((e) =>
    e.label.toLowerCase().includes(query.trim().toLowerCase()) ||
    e.year.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div style={{ fontFamily: "'Lora', serif", backgroundColor: "#FAFAF8", minHeight: "100vh" }}>
      <style>{`
        .exam-link {
          display: block;
          border-top: 1.5px solid #E8E3DC;
          padding: 4rem 1rem;
          text-decoration: none;
          margin-left: -1rem;
          margin-right: -1rem;
          border-radius: 4px;
          transition: background 0.22s cubic-bezier(0.22,1,0.36,1);
        }
        .exam-link:last-child { border-bottom: 1.5px solid #E8E3DC; }
        .exam-link:hover { background-color: rgba(224,123,0,0.04); }
        .exam-link:hover .exam-label { color: #E07B00; }
        .exam-link:hover .exam-arrow { transform: translateX(8px); color: #E07B00; }
        .exam-arrow {
          transition: transform 0.2s cubic-bezier(0.22,1,0.36,1), color 0.2s;
          color: #C8BFAF;
          font-size: 2.5rem;
          font-family: 'DM Mono', monospace;
          flex-shrink: 0;
        }
        .search-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid #D8D0C8;
          outline: none;
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.4rem, 3.5vw, 2.2rem);
          font-weight: 400;
          color: #1A1208;
          padding: 0.75rem 0;
          letter-spacing: -0.01em;
          transition: border-color 0.2s;
          caret-color: #E07B00;
        }
        .search-input::placeholder { color: #C8BFAF; font-style: italic; }
        .search-input:focus { border-bottom-color: #E07B00; }
        @media (max-width: 640px) {
          .exam-link { padding: 2.5rem 1rem; }
          .exam-arrow { font-size: 1.5rem; }
        }
      `}</style>

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
            <a
              key={exam.pdf}
              href={exam.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="exam-link"
            >
              <div style={{ display: "grid", gridTemplateColumns: "3rem 1fr auto", alignItems: "center", gap: "2.5rem" }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "1rem", color: "#C8BFAF", fontWeight: 400 }}>
                  {exam.index}
                </span>
                <div>
                  <h2 className="exam-label" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)", fontWeight: 400, color: "#1A1208", lineHeight: 1, letterSpacing: "-0.03em", transition: "color 0.2s", marginBottom: "0.5rem" }}>
                    {exam.label}
                  </h2>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A89F94" }}>
                    PDF
                  </span>
                </div>
                <span className="exam-arrow">→</span>
              </div>
            </a>
          ))
        )}
      </section>
    </div>
  );
}

export default Exams;