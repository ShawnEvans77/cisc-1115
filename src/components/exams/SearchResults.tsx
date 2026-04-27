// src/components/exams/SearchResults.tsx
import { Link } from "react-router-dom";
import { highlight } from "../../utils/highlight";
import { pluralize, searchablePrompt, snippetAround } from "../../utils/search";
import type { SearchResult } from "../../hooks/useExamSearch";
import { EmptyState } from "../ui/EmptyState";

interface SearchResultsProps {
  results:  SearchResult[];
  query:    string;
  basePath: "/solutions" | "/questions";
  itemLabel?: "question" | "solution";
  isFinished?: (examId: string, questionId: string) => boolean;
}

function getPromptSnippet(prompt: string, query: string): string | null {
  return snippetAround(searchablePrompt(prompt), query);
}

export function SearchResults({
  results,
  query,
  basePath,
  itemLabel = "question",
  isFinished,
}: SearchResultsProps) {
  if (results.length === 0) {
    return <EmptyState query={query} />;
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
                  <p className="result-card-meta">{pluralize(r.questionCount, itemLabel)} available</p>
                </div>
                <span className="result-arrow">→</span>
              </div>
            </Link>
          );
        }

        const snippet = getPromptSnippet(r.prompt, query);
        const finished = isFinished?.(r.examId, r.questionId) ?? false;

        return (
          <Link
            key={`${r.examId}-${r.questionId}`}
            to={`${basePath}/${r.examId}/${r.questionId}`}
            className="result-card"
          >
            <div className="result-card-grid">
              <div>
                <p className="result-card-eyebrow result-card-eyebrow--orange">{r.examLabel}</p>
                <h2 className="result-title result-title--question">
                  {highlight(r.title, query)}
                  {finished && <span className="question-title-check" aria-label="finished">✓</span>}
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
