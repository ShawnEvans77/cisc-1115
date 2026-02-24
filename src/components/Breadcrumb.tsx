// src/components/Breadcrumb.tsx
import { Link } from "react-router-dom";

interface Crumb {
  label: string;
  to?: string; // omit for the current (last) crumb
}

interface BreadcrumbProps {
  crumbs: Crumb[];
}

export function Breadcrumb({ crumbs }: BreadcrumbProps) {
  return (
    <div className="breadcrumb-wrap">
      <div className="breadcrumb">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <span key={i} className="breadcrumb-item">
              {!isLast && crumb.to ? (
                <Link to={crumb.to} className="breadcrumb-link">
                  {crumb.label}
                </Link>
              ) : (
                <span className="breadcrumb-current">{crumb.label}</span>
              )}
              {!isLast && <span className="breadcrumb-sep">/</span>}
            </span>
          );
        })}
      </div>
    </div>
  );
}