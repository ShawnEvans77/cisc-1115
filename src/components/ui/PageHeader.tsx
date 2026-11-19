import type { ReactNode } from "react";
import { cx } from "../../utils/ui";

type PageHeaderProps = {
  title: string;
  query?: string;
  placeholder?: string;
  resultLabel?: string;
  detail?: boolean;
  compact?: boolean;
  controls?: ReactNode;
  onQueryChange?: (query: string) => void;
};

export function PageHeader({
  title,
  query,
  placeholder,
  resultLabel,
  detail = false,
  compact = false,
  controls,
  onQueryChange,
}: PageHeaderProps) {
  return (
    <div className={cx("page-header", detail && "page-header--detail", compact && "page-header--compact")}>
      <h1 className="page-title">{title}</h1>

      {query !== undefined && onQueryChange && (
        <input
          className="search-input"
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={event => onQueryChange(event.target.value)}
          autoComplete="off"
          spellCheck={false}
        />
      )}

      {controls}

      {resultLabel && <p className="search-result-count">{resultLabel}</p>}
    </div>
  );
}
