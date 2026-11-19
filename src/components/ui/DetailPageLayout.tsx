import type { ReactNode } from "react";
import { Breadcrumb, type Crumb } from "./Breadcrumb";
import { TagList } from "./TagList";

type DetailPageLayoutProps = {
  crumbs: Crumb[];
  title: string;
  tags: string[];
  children: ReactNode;
  bottomNav: ReactNode;
  headerAction?: ReactNode;
};

// Shared frame for a single question, solution, or note.
export function DetailPageLayout({
  crumbs,
  title,
  tags,
  children,
  bottomNav,
  headerAction,
}: DetailPageLayoutProps) {
  const tagList = <TagList tags={tags} wrapperClassName="detail-topics" tagClassName="topic-tag" />;

  return (
    <div className="page-root detail-root">
      <Breadcrumb wide crumbs={crumbs} />

      <div className="detail-header">
        <h1 className="detail-title">{title}</h1>
        {headerAction ? (
          <div className="detail-topics-row">
            {tagList}
            {headerAction}
          </div>
        ) : tagList}
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
