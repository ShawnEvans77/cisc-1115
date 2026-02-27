// src/components/NoteSearchResults.tsx
import { Link } from "react-router-dom";
import { highlight } from "../utils/highlight";
import type { NoteSearchResult } from "../hooks/UseNotesSearch";

interface NoteSearchResultsProps {
  results: NoteSearchResult[];
  query:   string;
}

export function NoteSearchResults({ results, query }: NoteSearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state-text">nothing found for "{query}"</p>
      </div>
    );
  }

  return (
    <>
      {results.map(r => {
        if (r.type === "topic") {
          return (
            <Link key={`topic-${r.topicId}`} to={`/notes/${r.topicId}`} className="result-card">
              <div className="result-card-grid">
                <div>
                  <p className="result-card-eyebrow">topic</p>
                  <h2 className="result-title result-title--semester">
                    {highlight(r.topicLabel, query)}
                  </h2>
                  <p className="result-card-meta">{r.entryCount} note{r.entryCount === 1 ? "" : "s"}</p>
                </div>
                <span className="result-arrow">→</span>
              </div>
            </Link>
          );
        }

        return (
          <Link key={`${r.topicId}-${r.entryId}`} to={`/notes/${r.topicId}/${r.entryId}`} className="result-card">
            <div className="result-card-grid">
              <div>
                <p className="result-card-eyebrow result-card-eyebrow--orange">{r.topicLabel}</p>
                <h2 className="result-title result-title--question">
                  {highlight(r.title, query)}
                </h2>
                <div className="result-card-tags">
                  {r.tags.map(t => (
                    <span key={t} className="result-tag">{highlight(t, query)}</span>
                  ))}
                </div>
                {r.preview && (
                  <p className="result-card-snippet">
                    {highlight(r.preview, query)}
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