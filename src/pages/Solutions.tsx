import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { exams } from "../data/exams";

interface Solution {
  label: string;
  year: string;
  path: string;
  index: string;
}

const solutions: Solution[] = [
  { label: "fall 2020",   year: "2020", path: "/solutions/fall-2020",   index: "01" },
  { label: "spring 2021", year: "2021", path: "/solutions/spring-2021", index: "02" },
];

type SemesterResult = {
  type: "semester";
  examId: string;
  examLabel: string;
  year: string;
  questionCount: number;
};

type QuestionResult = {
  type: "question";
  examId: string;
  examLabel: string;
  questionId: string;
  title: string;
  topics: string[];
  prompt: string;
};

type SearchResult = SemesterResult | QuestionResult;

function highlight(text: string, query: string): React.ReactElement {
  if (!query.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ backgroundColor: "rgba(224,123,0,0.18)", color: "#E07B00", borderRadius: "2px", padding: "0 2px" }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function Solutions(): React.ReactElement {
  const [query, setQuery] = useState("");

  const results = useMemo((): SearchResult[] => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const matches: SearchResult[] = [];

    for (const exam of exams) {
      // semester-level match — "fall", "spring", "fall 2020", "2021", etc.
      if (
        exam.label.toLowerCase().includes(q) ||
        exam.year.toLowerCase().includes(q) ||
        exam.id.toLowerCase().includes(q)
      ) {
        matches.push({
          type: "semester",
          examId: exam.id,
          examLabel: exam.label,
          year: exam.year,
          questionCount: exam.questions.length,
        });
        continue; // don't also show individual questions for a semester-level match
      }

      // question-level match
      for (const question of exam.questions) {
        if (
          question.title.toLowerCase().includes(q) ||
          question.topics.some(t => t.toLowerCase().includes(q)) ||
          question.prompt.toLowerCase().includes(q)
        ) {
          matches.push({
            type: "question",
            examId: exam.id,
            examLabel: exam.label,
            questionId: question.id,
            title: question.title,
            topics: question.topics,
            prompt: question.prompt,
          });
        }
      }
    }

    return matches;
  }, [query]);

  const showResults = query.trim().length > 0;

  return (
    <div style={{ fontFamily: "'Lora', serif", backgroundColor: "#FAFAF8", minHeight: "100vh" }}>
      <style>{`
        .solution-link {
          display: block;
          border-top: 1.5px solid #E8E3DC;
          padding: 4rem 1rem;
          text-decoration: none;
          margin-left: -1rem;
          margin-right: -1rem;
          border-radius: 4px;
          transition: background 0.22s cubic-bezier(0.22,1,0.36,1);
        }
        .solution-link:last-child { border-bottom: 1.5px solid #E8E3DC; }
        .solution-link:hover { background-color: rgba(224,123,0,0.04); }
        .solution-link:hover .solution-label { color: #E07B00; }
        .solution-link:hover .solution-arrow { transform: translateX(8px); color: #E07B00; }
        .solution-arrow {
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

        .result-card {
          display: block;
          text-decoration: none;
          border-top: 1.5px solid #E8E3DC;
          padding: 2rem 0;
          transition: background 0.18s;
          border-radius: 2px;
        }
        .result-card:last-child { border-bottom: 1.5px solid #E8E3DC; }
        .result-card:hover { background-color: rgba(224,123,0,0.03); }
        .result-card:hover .result-title { color: #E07B00; }
        .result-card:hover .result-arrow { transform: translateX(5px); color: #E07B00; }
        .result-title { transition: color 0.18s; }
        .result-arrow {
          transition: transform 0.2s cubic-bezier(0.22,1,0.36,1), color 0.18s;
          color: #C8BFAF;
          font-size: 1.25rem;
          font-family: 'DM Mono', monospace;
          flex-shrink: 0;
        }
        .result-tag {
          display: inline-block;
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #9E8A80;
          border: 1px solid #E8E3DC;
          padding: 0.15rem 0.55rem;
          border-radius: 2px;
          margin-right: 0.35rem;
          margin-top: 0.4rem;
        }

        @media (max-width: 640px) {
          .solution-link { padding: 2.5rem 1rem; }
          .solution-arrow { font-size: 1.5rem; }
        }
      `}</style>

      {/* Header */}
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

        {/* Search */}
        <input
          className="search-input"
          type="text"
          placeholder="search across all questions, topics..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />

        {showResults && (
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A89F94", marginTop: "1rem" }}>
            {results.length === 0
              ? "no results"
              : `${results.length} result${results.length === 1 ? "" : "s"}`}
          </p>
        )}
      </div>

      {/* Divider */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2.5rem" }}>
        <hr style={{ border: "none", borderTop: "1.5px solid #E8E3DC" }} />
      </div>

      {/* Results or semester list */}
      {showResults ? (
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "1rem 2.5rem 8rem" }}>
          {results.length === 0 ? (
            <div style={{ paddingTop: "4rem", textAlign: "center" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontStyle: "italic", color: "#C8BFAF" }}>
                nothing found for "{query}"
              </p>
            </div>
          ) : (
            results.map((r) => {
              if (r.type === "semester") {
                return (
                  <Link
                    key={`semester-${r.examId}`}
                    to={`/solutions/${r.examId}`}
                    className="result-card"
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "2rem" }}>
                      <div>
                        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A89F94", marginBottom: "0.4rem" }}>
                          semester
                        </p>
                        <h2
                          className="result-title"
                          style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.4rem, 3vw, 2.2rem)", fontWeight: 700, color: "#1A1208", letterSpacing: "-0.02em", lineHeight: 1.1, margin: 0 }}
                        >
                          {highlight(r.examLabel, query)}
                        </h2>
                        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A89F94", marginTop: "0.5rem" }}>
                          {r.questionCount} questions available
                        </p>
                      </div>
                      <span className="result-arrow">→</span>
                    </div>
                  </Link>
                );
              }

              return (
                <Link
                  key={`${r.examId}-${r.questionId}`}
                  to={`/solutions/${r.examId}/${r.questionId}`}
                  className="result-card"
                >
                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "2rem" }}>
                    <div>
                      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E07B00", marginBottom: "0.4rem" }}>
                        {r.examLabel}
                      </p>
                      <h2
                        className="result-title"
                        style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", fontWeight: 700, color: "#1A1208", letterSpacing: "-0.01em", lineHeight: 1.1, margin: 0 }}
                      >
                        {highlight(r.title, query)}
                      </h2>
                      <div style={{ marginTop: "0.1rem" }}>
                        {r.topics.map(t => (
                          <span key={t} className="result-tag">
                            {highlight(t, query)}
                          </span>
                        ))}
                      </div>
                      {(() => {
                        const sq = query.trim().toLowerCase();
                        const inTitle = r.title.toLowerCase().includes(sq);
                        const inTopics = r.topics.some(t => t.toLowerCase().includes(sq));
                        if (inTitle || inTopics) return null;
                        const idx = r.prompt.toLowerCase().indexOf(sq);
                        if (idx === -1) return null;
                        const start = Math.max(0, idx - 40);
                        const end = Math.min(r.prompt.length, idx + sq.length + 60);
                        const snippet =
                          (start > 0 ? "…" : "") +
                          r.prompt.slice(start, end) +
                          (end < r.prompt.length ? "…" : "");
                        return (
                          <p style={{ fontFamily: "'Lora', serif", fontSize: "0.88rem", fontStyle: "italic", color: "#9E8A80", marginTop: "0.6rem", lineHeight: 1.6 }}>
                            {highlight(snippet, query)}
                          </p>
                        );
                      })()}
                    </div>
                    <span className="result-arrow">→</span>
                  </div>
                </Link>
              );
            })
          )}
        </section>
      ) : (
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 2.5rem 8rem" }}>
          {solutions.map((solution: Solution): React.ReactElement => (
            <Link
              key={solution.path}
              to={solution.path}
              className="solution-link"
            >
              <div style={{ display: "grid", gridTemplateColumns: "3rem 1fr auto", alignItems: "center", gap: "2.5rem" }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "1rem", color: "#C8BFAF", fontWeight: 400 }}>
                  {solution.index}
                </span>
                <div>
                  <h2
                    className="solution-label"
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)", fontWeight: 400, color: "#1A1208", lineHeight: 1, letterSpacing: "-0.03em", transition: "color 0.2s", marginBottom: "0.5rem" }}
                  >
                    {solution.label}
                  </h2>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A89F94" }}>
                    {solution.year}
                  </span>
                </div>
                <span className="solution-arrow">→</span>
              </div>
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}

export default Solutions;