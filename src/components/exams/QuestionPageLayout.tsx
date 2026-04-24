// src/components/exams/QuestionPageLayout.tsx
import type { ReactNode } from "react";
import type { Exam, Question } from "../../types";
import { Breadcrumb } from "../ui/Breadcrumb";
import { COURSE_CODE } from "../../utils/search";

interface QuestionPageLayoutProps {
  exam:          Exam;
  question:      Question;
  basePath:      string;
  children:      ReactNode;
  bottomNav:     ReactNode;
  headerAction?: ReactNode;
}

export function QuestionPageLayout({
  exam,
  question,
  basePath,
  children,
  bottomNav,
  headerAction,
}: QuestionPageLayoutProps) {
  const parentLabel = basePath.slice(1);

  return (
    <div className="page-root detail-root">

      <Breadcrumb wide crumbs={[
        { label: parentLabel,  to: basePath },
        { label: exam.label,   to: `${basePath}/${exam.id}` },
        { label: question.title },
      ]} />

      <div className="detail-header">
        <p className="page-eyebrow">{exam.label} · {COURSE_CODE}</p>
        <h1 className="detail-title">{question.title}</h1>
        <div className="detail-topics-row">
          <div className="detail-topics">
            {question.topics.map(topic => (
              <span key={topic} className="topic-tag">{topic}</span>
            ))}
          </div>
          {headerAction}
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
