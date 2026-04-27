// src/components/notes/NoteCard.tsx
import { Link } from "react-router-dom";
import type { NoteEntry } from "../../types";
import { highlight } from "../../utils/highlight";
import { getNoteContentSnippet } from "../../utils/noteSearch";

interface NoteCardProps {
  entry:   NoteEntry;
  topicId: string;
  query:   string;
}

export function NoteCard({ entry, topicId, query }: NoteCardProps) {
  const snippet = getNoteContentSnippet(entry, query);

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
