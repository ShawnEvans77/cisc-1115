import type { ChangeEventHandler } from "react";
import { COURSE_LABEL } from "../../utils/search";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  query?: string;
  placeholder?: string;
  resultLabel?: string;
  detail?: boolean;
  compactSubtitle?: boolean;
  onQueryChange?: (query: string) => void;
};

export function PageHeader({
  title,
  subtitle,
  query,
  placeholder,
  resultLabel,
  detail = false,
  compactSubtitle = false,
  onQueryChange,
}: PageHeaderProps) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    onQueryChange?.(event.target.value);
  };

  return (
    <div className={`page-header${detail ? " page-header--detail" : ""}`}>
      <p className="page-eyebrow">{COURSE_LABEL}</p>
      <h1 className="page-title">{title}</h1>
      {subtitle && (
        <p className={`page-subtitle${compactSubtitle ? " page-subtitle--flush" : ""}`}>
          {subtitle}
        </p>
      )}

      {query !== undefined && onQueryChange && (
        <input
          className="search-input"
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
          autoComplete="off"
          spellCheck={false}
        />
      )}

      {resultLabel && <p className="search-result-count">{resultLabel}</p>}
    </div>
  );
}
