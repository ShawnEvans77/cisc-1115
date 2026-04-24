import type { ReactElement } from "react";
import { normalizeQuery } from "./search";

export function highlight(text: string, query: string): ReactElement {
  const q = normalizeQuery(query);
  if (!q) return <>{text}</>;

  const idx = text.toLowerCase().indexOf(q);
  if (idx === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, idx)}
      <mark className="search-highlight">
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  );
}
