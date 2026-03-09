import React from "react";
import { Link } from "react-router-dom";

interface SemesterCardProps {
  index: string;
  label: string;
  sublabel: string;
  to?: string;   // internal nav
  href?: string; // external link (PDF)
}

export function SemesterCard({ index, label, sublabel, to, href }: SemesterCardProps): React.ReactElement {
  const inner = (
    <div className="semester-card-grid">
      <span className="semester-card-index">{index}</span>
      <div>
        <h2 className="semester-card-label">{label}</h2>
        <span className="semester-card-sublabel">{sublabel}</span>
      </div>
      <span className="semester-card-arrow">→</span>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="semester-card">
        {inner}
      </a>
    );
  }

  return (
    <Link to={to!} className="semester-card">
      {inner}
    </Link>
  );
}