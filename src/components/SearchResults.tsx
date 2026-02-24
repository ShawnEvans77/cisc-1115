import React from "react";
import { Link } from "react-router-dom";
import { highlight } from "../utils/highlight";
import type { SearchResult } from "../hooks/UseExamSearch";

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  basePath: "/solutions" | "/questions";
}

export function SearchResults({ results, query, basePath }: SearchResultsProps): React.ReactElement {
  if (results.length === 0) {
    return (
      <div style={{ paddingTop: "4rem", textAlign: "center" }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontStyle: "italic", color: "#C8BFAF" }}>
          nothing found for "{query}"
        </p>
      </div>
    );
  }

  return (
    <>
      {results.map((r) => {
        if (r.type === "semester") {
          return (
            <Link key={`semester-${r.examId}`} to={`${basePath}/${r.examId}`} className="result-card">
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "2rem" }}>
                <div>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A89F94", marginBottom: "0.4rem" }}>
                    semester
                  </p>
                  <h2 className="result-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.4rem, 3vw, 2.2rem)", fontWeight: 700, color: "#1A1208", letterSpacing: "-0.02em", lineHeight: 1.1, margin: 0 }}>
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
          <Link key={`${r.examId}-${r.questionId}`} to={`${basePath}/${r.examId}/${r.questionId}`} className="result-card">
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "2rem" }}>
              <div>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E07B00", marginBottom: "0.4rem" }}>
                  {r.examLabel}
                </p>
                <h2 className="result-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", fontWeight: 700, color: "#1A1208", letterSpacing: "-0.01em", lineHeight: 1.1, margin: 0 }}>
                  {highlight(r.title, query)}
                </h2>
                <div style={{ marginTop: "0.1rem" }}>
                  {r.topics.map(t => (
                    <span key={t} className="result-tag">{highlight(t, query)}</span>
                  ))}
                </div>
                {(() => {
                  const sq = query.trim().toLowerCase();
                  if (r.title.toLowerCase().includes(sq) || r.topics.some(t => t.toLowerCase().includes(sq))) return null;
                  const idx = r.prompt.toLowerCase().indexOf(sq);
                  if (idx === -1) return null;
                  const start = Math.max(0, idx - 40);
                  const end = Math.min(r.prompt.length, idx + sq.length + 60);
                  const snippet = (start > 0 ? "…" : "") + r.prompt.slice(start, end) + (end < r.prompt.length ? "…" : "");
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
      })}
    </>
  );
}