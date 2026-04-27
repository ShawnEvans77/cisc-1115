// src/components/Breadcrumb.tsx
import { Link } from "react-router-dom";

export interface Crumb {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  crumbs: Crumb[];
  wide?:  boolean; // true on 1400px detail pages
}

export function Breadcrumb({ crumbs, wide }: BreadcrumbProps) {
  return (
    <div className={`breadcrumb-wrap${wide ? " breadcrumb-wrap--wide" : ""}`}>
      <nav className="breadcrumb">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          const key = crumb.to ?? `${crumb.label}-${i}`;
          return (
            <div key={key} className="breadcrumb-item">
              {i > 0 && <span className="breadcrumb-sep">/</span>}
              {isLast || !crumb.to ? (
                <span className="breadcrumb-current">{crumb.label}</span>
              ) : (
                <Link to={crumb.to} className="breadcrumb-link">{crumb.label}</Link>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
