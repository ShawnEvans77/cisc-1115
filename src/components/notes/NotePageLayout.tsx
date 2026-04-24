// src/components/notes/NotePageLayout.tsx
import type { ReactNode } from "react";
import type { NoteTopic, NoteEntry } from "../../types";
import { Breadcrumb } from "../ui/Breadcrumb";

interface NotePageLayoutProps {
  topic:     NoteTopic;
  entry:     NoteEntry;
  children:  ReactNode;
  bottomNav: ReactNode;
}

export function NotePageLayout({ topic, entry, children, bottomNav }: NotePageLayoutProps) {
  return (
    <div className="page-root detail-root">

      <Breadcrumb wide crumbs={[
        { label: "notes",     to: "/notes" },
        { label: topic.label, to: `/notes/${topic.id}` },
        { label: entry.title },
      ]} />

      <div className="detail-header">
        <p className="page-eyebrow">CISC 1115 &nbsp;·&nbsp; {topic.label}</p>
        <h1 className="detail-title">{entry.title}</h1>
        <div className="detail-topics">
          {entry.tags.map(tag => (
            <span key={tag} className="topic-tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="detail-divider-wrap">
        <hr className="home-divider" />
      </div>

      <section className="detail-content">
        {children}
        <div className="detail-bottom-nav">
          {bottomNav}
        </div>
      </section>

    </div>
  );
}
