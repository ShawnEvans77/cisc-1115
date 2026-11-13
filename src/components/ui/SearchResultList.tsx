import { Link } from "react-router-dom";
import { highlight } from "../../utils/highlight";
import { EmptyState } from "./EmptyState";
import { TagList } from "./TagList";

export type SearchCardResult =
  | { type: "summary"; key: string; to: string; eyebrow: string; title: string; meta: string }
  | { type: "item"; key: string; to: string; eyebrow: string; title: string; tags: string[]; preview?: string | null; finished?: boolean };

type SearchResultListProps = {
  results: SearchCardResult[];
  query: string;
};

export function SearchResultList({ results, query }: SearchResultListProps) {
  if (results.length === 0) return <EmptyState query={query} />;

  return <>
    {results.map(result => result.type === "summary" ? (
      <Link key={result.key} to={result.to} className="result-card">
        <div className="result-card-grid">
          <div>
            <p className="result-card-eyebrow">{result.eyebrow}</p>
            <h2 className="result-title result-title--semester">{highlight(result.title, query)}</h2>
            <p className="result-card-meta">{result.meta}</p>
          </div>
          <span className="result-arrow">→</span>
        </div>
      </Link>
    ) : (
      <Link key={result.key} to={result.to} className="result-card">
        <div className="result-card-grid">
          <div>
            <p className="result-card-eyebrow result-card-eyebrow--orange">{result.eyebrow}</p>
            <h2 className="result-title result-title--question">
              {highlight(result.title, query)}
              {result.finished && <span className="question-title-check" aria-label="finished">✓</span>}
            </h2>
            <TagList tags={result.tags} query={query} wrapperClassName="result-card-tags" tagClassName="result-tag" />
            {result.preview && <p className="result-card-snippet">{highlight(result.preview, query)}</p>}
          </div>
          <span className="result-arrow">→</span>
        </div>
      </Link>
    ))}
  </>;
}
