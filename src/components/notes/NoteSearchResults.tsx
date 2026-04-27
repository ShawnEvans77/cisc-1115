// src/components/notes/NoteSearchResults.tsx
import { Link } from "react-router-dom";
import { highlight } from "../../utils/highlight";
import type { NoteSearchResult } from "../../hooks/useNotesSearch";
import { EmptyState } from "../ui/EmptyState";
import { pluralize } from "../../utils/search";

interface NoteSearchResultsProps {
  results: NoteSearchResult[];
  query:   string;
}

export function NoteSearchResults({ results, query }: NoteSearchResultsProps) {
  if (results.length === 0) {
    return <EmptyState query={query} />;
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
                  <p className="result-card-meta">{pluralize(r.entryCount, "note")}</p>
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
