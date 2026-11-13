import { Link } from "react-router-dom";
import { highlight } from "../../utils/highlight";
import { TagList } from "./TagList";

type EntryCardProps = {
  to: string;
  title: string;
  tags: string[];
  query: string;
  snippet?: string | null;
  badge?: string;
  finished?: boolean;
};

// One row in a semester's question list or a topic's note list.
export function EntryCard({ to, title, tags, query, snippet, badge, finished = false }: EntryCardProps) {
  return (
    <Link to={to} className="question-card">
      <div className={badge ? "question-card-grid" : "note-card-grid"}>
        {badge && <span className="question-card-badge">{badge}</span>}
        <div>
          <h2 className="question-card-title q-title">
            {highlight(title, query)}
            {finished && <span className="question-title-check" aria-label="finished">✓</span>}
          </h2>
          <TagList
            tags={tags}
            query={query}
            wrapperClassName="question-card-topics"
            tagClassName="topic-tag"
          />
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
