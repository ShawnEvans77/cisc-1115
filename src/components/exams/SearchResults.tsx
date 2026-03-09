// src/components/exams/SearchResults.tsx
import React from "react";
import { Link } from "react-router-dom";
import { highlight } from "../../utils/highlight";
import { stripPromptDelimiters } from "../../utils/parsePrompt";
import type { SearchResult } from "../../hooks/useExamSearch";

interface SearchResultsProps {
  results:  SearchResult[];
  query:    string;
  basePath: "/solutions" | "/questions";
}

function getPromptSnippet(prompt: string, query: string): string | null {
  const clean = stripPromptDelimiters(prompt);
  const q   = query.trim().toLowerCase();
  const idx = clean.toLowerCase().indexOf(q);
  if (idx === -1) return null;
  const start = Math.max(0, idx - 40);
  const end   = Math.min(clean.length, idx + q.length + 60);
  return (start > 0 ? "…" : "") + clean.slice(start, end) + (end < clean.length ? "…" : "");
}

export function SearchResults({ results, query, basePath }: SearchResultsProps): React.ReactElement {
  if (results.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state-text">nothing found for "{query}"</p>
      </div>
    );
  }

  return (
    <>
      {results.map((r) => {
        if (r.type === "semester") {
          return (
            <Link key={`semester-${r.examId}`} to={`${basePath}/${r.examId}`} className="result-card">
              <div className="result-card-grid">
                <div>
                  <p className="result-card-eyebrow">semester</p>
                  <h2 className="result-title result-title--semester">
                    {highlight(r.examLabel, query)}
                  </h2>
                  <p className="result-card-meta">{r.questionCount} questions available</p>
                </div>
                <span className="result-arrow">→</span>
              </div>
            </Link>
          );
        }

        const snippet = getPromptSnippet(r.prompt, query);

        return (
          <Link key={`${r.examId}-${r.questionId}`} to={`${basePath}/${r.examId}/${r.questionId}`} className="result-card">
            <div className="result-card-grid">
              <div>
                <p className="result-card-eyebrow result-card-eyebrow--orange">{r.examLabel}</p>
                <h2 className="result-title result-title--question">
                  {highlight(r.title, query)}
                </h2>
                <div className="result-card-tags">
                  {r.topics.map(t => (
                    <span key={t} className="result-tag">{highlight(t, query)}</span>
                  ))}
                </div>
                {snippet && (
                  <p className="result-card-snippet">
                    {highlight(snippet, query)}
                  </p>
                )}
              </div>
              <span className="result-arrow">→</span>
            </div>
          </Link>
        );
      })}
    </>
  );
}