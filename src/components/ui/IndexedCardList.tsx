import { Link } from "react-router-dom";

// A card links either inside the app (`to`) or to an external file (`href`).
export type IndexedCardItem = {
  id: string;
  label: string;
  sublabel: string;
  complete?: boolean;
} & ({ to: string } | { href: string });

type IndexedCardListProps = {
  items: IndexedCardItem[];
};

function IndexedCard({ item }: { item: IndexedCardItem }) {
  const inner = (
    <div className="semester-card-grid">
      <div>
        <h2 className="semester-card-label">
          {item.label}
          {item.complete && <span className="semester-card-check" aria-label="all questions finished">✓</span>}
        </h2>
        <span className="semester-card-sublabel">{item.sublabel}</span>
      </div>
      <span className="semester-card-arrow">→</span>
    </div>
  );

  if ("href" in item) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="semester-card">
        {inner}
      </a>
    );
  }

  return (
    <Link to={item.to} className="semester-card">
      {inner}
    </Link>
  );
}

// List of cards: semesters, note topics, exam PDFs.
export function IndexedCardList({ items }: IndexedCardListProps) {
  return <>
    {items.map(item => <IndexedCard key={item.id} item={item} />)}
  </>;
}
