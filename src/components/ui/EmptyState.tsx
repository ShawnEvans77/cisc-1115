import type { ReactNode } from "react";

type EmptyStateProps = {
  query?: string;
  children?: ReactNode;
};

export function EmptyState({ query, children }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <p className="empty-state-text">{children ?? `nothing found for "${query ?? ""}"`}</p>
    </div>
  );
}
