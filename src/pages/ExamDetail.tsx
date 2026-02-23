import React, { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { exams } from "../data/exams";

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

function ExamDetail(): React.ReactElement {
  const { examId } = useParams<{ examId: string }>();
  const exam = exams.find((e) => e.id === examId);
  const [query, setQuery] = useState("");

  const filteredQuestions = useMemo(() => {
    if (!exam) return [];
    const q = query.trim().toLowerCase();
    if (!q) return exam.questions;
    return exam.questions.filter(question =>
      question.title.toLowerCase().includes(q) ||
      question.topics.some(t => t.toLowerCase().includes(q)) ||
      question.prompt.toLowerCase().includes(q)
    );
  }, [query, exam]);

  if (!exam) {
    return (
      <div style={{ fontFamily: "'Lora', serif", backgroundColor: "#FAFAF8", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#E07B00", marginBottom: "1rem" }}>
            404
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#1A1208", marginBottom: "1.5rem" }}>
            Exam not found
          </h1>
          <Link to="/solutions" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#E07B00", textDecoration: "none" }}>
            ← Back to solutions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Lora', serif", backgroundColor: "#FAFAF8", minHeight: "100vh" }}>
      <style>{`
        .question-card {
          display: block;
          text-decoration: none;
          background-color: #FFFFFF;
          border: 1.5px solid #E8E3DC;
          padding: 2rem 2.5rem;
          margin-bottom: 1rem;
          border-radius: 4px;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .question-card:hover { border-color: #E07B00; box-shadow: 0 4px 24px rgba(224,123,0,0.08); transform: translateY(-2px); }
        .question-card:hover .q-title { color: #E07B00; }
        .question-card:hover .q-arrow { transform: translateX(6px); color: #E07B00; }
        .q-arrow { transition: transform 0.2s cubic-bezier(0.22,1,0.36,1), color 0.2s; color: #C8BFAF; font-size: 1.5rem; font-family: 'DM Mono', monospace; flex-shrink: 0; }
        .q-title { transition: color 0.2s; }
        .topic-tag { display: inline-block; font-family: 'DM Mono', monospace; font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; color: #9E8A80; border: 1px solid #E8E3DC; padding: 0.2rem 0.6rem; border-radius: 2px; margin-right: 0.4rem; margin-top: 0.6rem; }

        .search-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid #D8D0C8;
          outline: none;
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.2rem, 3vw, 1.8rem);
          font-weight: 400;
          color: #1A1208;
          padding: 0.65rem 0;
          letter-spacing: -0.01em;
          transition: border-color 0.2s;
          caret-color: #E07B00;
        }
        .search-input::placeholder { color: #C8BFAF; font-style: italic; }
        .search-input:focus { border-bottom-color: #E07B00; }

        .back-link {
          font-family: 'DM Mono', monospace;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #E07B00;
          text-decoration: none;
          transition: opacity 0.18s;
        }
        .back-link:hover { opacity: 0.7; }

        @media (max-width: 640px) {
          .question-card { padding: 1.5rem; }
        }
      `}</style>

      {/* Breadcrumb */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 2.5rem 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Link
            to="/solutions"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A89F94", textDecoration: "none", transition: "color 0.18s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#E07B00")}
            onMouseLeave={e => (e.currentTarget.style.color = "#A89F94")}
          >
            Solutions
          </Link>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "#C8BFAF" }}>/</span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E07B00" }}>
            {exam.label}
          </span>
        </div>
      </div>

      {/* Header */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 2.5rem 2rem" }}>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#E07B00", marginBottom: "1rem" }}>
          Brooklyn College &nbsp;·&nbsp; CISC 1115
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 700, color: "#1A1208", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "0.75rem" }}>
          {exam.label}
        </h1>
        <p style={{ fontFamily: "'Lora', serif", fontSize: "1rem", fontStyle: "italic", color: "#9E8A80", marginBottom: "2rem" }}>
          select a question to view its solution
        </p>

        {/* Search */}
        <input
          className="search-input"
          type="text"
          placeholder="search questions, topics..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />

        {query.trim() && (
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A89F94", marginTop: "0.85rem" }}>
            {filteredQuestions.length === 0
              ? "no results"
              : `${filteredQuestions.length} of ${exam.questions.length} questions`}
          </p>
        )}
      </div>

      {/* Divider */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2.5rem" }}>
        <hr style={{ border: "none", borderTop: "1.5px solid #E8E3DC" }} />
      </div>

      {/* Question cards */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 2.5rem 8rem" }}>
        {filteredQuestions.length === 0 && query.trim() ? (
          <div style={{ paddingTop: "3rem", textAlign: "center" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontStyle: "italic", color: "#C8BFAF" }}>
              nothing found for "{query}"
            </p>
          </div>
        ) : (
          filteredQuestions.map((q): React.ReactElement => (
            <Link
              key={q.id}
              to={`/solutions/${exam.id}/${q.id}`}
              className="question-card"
            >
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: "2rem" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#FFFFFF", backgroundColor: "#E07B00", padding: "0.3rem 0.75rem", borderRadius: "2px", flexShrink: 0, alignSelf: "start", marginTop: "0.25rem" }}>
                  {q.id.replace("question-", "Q").toUpperCase()}
                </div>
                <div>
                  <h2
                    className="q-title"
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", fontWeight: 700, color: "#1A1208", lineHeight: 1.1, letterSpacing: "-0.01em", margin: 0 }}
                  >
                    {highlight(q.title, query)}
                  </h2>
                  <div>
                    {q.topics.map((topic: string) => (
                      <span key={topic} className="topic-tag">
                        {highlight(topic, query)}
                      </span>
                    ))}
                  </div>
                  {(() => {
                    const sq = query.trim().toLowerCase();
                    if (!sq) return null;
                    const inTitle = q.title.toLowerCase().includes(sq);
                    const inTopics = q.topics.some(t => t.toLowerCase().includes(sq));
                    if (inTitle || inTopics) return null;
                    const idx = q.prompt.toLowerCase().indexOf(sq);
                    if (idx === -1) return null;
                    const start = Math.max(0, idx - 40);
                    const end = Math.min(q.prompt.length, idx + sq.length + 60);
                    const snippet =
                      (start > 0 ? "…" : "") +
                      q.prompt.slice(start, end) +
                      (end < q.prompt.length ? "…" : "");
                    return (
                      <p style={{ fontFamily: "'Lora', serif", fontSize: "0.88rem", fontStyle: "italic", color: "#9E8A80", marginTop: "0.6rem", lineHeight: 1.6 }}>
                        {highlight(snippet, query)}
                      </p>
                    );
                  })()}
                </div>
                <span className="q-arrow">→</span>
              </div>
            </Link>
          ))
        )}

        {/* Bottom nav */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "3rem", paddingTop: "2rem", borderTop: "1.5px solid #E8E3DC" }}>
          <Link to="/solutions" className="back-link">
            ← All semesters
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ExamDetail;