// src/components/SearchResults.tsx
import React from "react";
import { Link } from "react-router-dom";
import { highlight } from "../utils/highlight";
import type { SearchResult } from "../hooks/UseExamSearch";

interface SearchResultsProps {
  results:  SearchResult[];
  query:    string;
  basePath: "/solutions" | "/questions";
}

// Extracts a ~100-char context window around the first match in the prompt.
function getPromptSnippet(prompt: string, query: string): string | null {
  const q   = query.trim().toLowerCase();
  const idx = prompt.toLowerCase().indexOf(q);
  if (idx === -1) return null;

  const start   = Math.max(0, idx - 40);
  const end     = Math.min(prompt.length, idx + q.length + 60);
  const snippet = (start > 0 ? "…" : "") + prompt.slice(start, end) + (end < prompt.length ? "…" : "");
  return snippet;
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

        // Show prompt snippet if prompt matches — regardless of whether topics also matched.
        // Both are shown simultaneously; snippet renders underneath the tags.
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