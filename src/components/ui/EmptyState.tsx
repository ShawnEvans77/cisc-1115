type EmptyStateProps = {
  query: string;
};

export function EmptyState({ query }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <p className="empty-state-text">nothing found for "{query}"</p>
    </div>
  );
}
