// src/components/NoteCard.tsx
import { Link } from "react-router-dom";
import type { NoteEntry } from "../types";
import { highlight } from "../utils/highlight";

interface NoteCardProps {
  entry:   NoteEntry;
  topicId: string;
  query:   string;
}

function getContentSnippet(entry: NoteEntry, query: string): string | null {
  const sq = query.trim().toLowerCase();
  if (!sq) return null;

  // Search all text sections for a match
  for (const section of entry.sections) {
    if (section.type !== "text") continue;
    const idx = section.content.toLowerCase().indexOf(sq);
    if (idx === -1) continue;
    const start = Math.max(0, idx - 40);
    const end   = Math.min(section.content.length, idx + sq.length + 60);
    return (start > 0 ? "…" : "") + section.content.slice(start, end) + (end < section.content.length ? "…" : "");
  }

  return null;
}

export function NoteCard({ entry, topicId, query }: NoteCardProps) {
  const snippet = getContentSnippet(entry, query);

  return (
    <Link to={`/notes/${topicId}/${entry.id}`} className="question-card">
      <div className="note-card-grid">
        <div>
          <h2 className="question-card-title q-title">
            {highlight(entry.title, query)}
          </h2>
          <div className="question-card-topics">
            {entry.tags.map(tag => (
              <span key={tag} className="topic-tag">
                {highlight(tag, query)}
              </span>
            ))}
          </div>
          {snippet && (
            <p className="question-card-snippet">
              {highlight(snippet, query)}
            </p>
          )}
        </div>
        <span className="q-arrow">→</span>
      </div>
    </Link>
  );
}