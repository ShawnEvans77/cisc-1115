// src/components/QuestionPageLayout.tsx
import React from "react";
import { Link } from "react-router-dom";
import type { Exam, Question } from "../types";
import { Breadcrumb } from "./Breadcrumb";

interface QuestionPageLayoutProps {
  exam:       Exam;
  question:   Question;
  basePath:   string;           // "/questions" | "/solutions"
  children:   React.ReactNode;  // content blocks
  bottomNav:  React.ReactNode;  // left/right nav links
}

export function QuestionPageLayout({
  exam,
  question,
  basePath,
  children,
  bottomNav,
}: QuestionPageLayoutProps) {
  const parentLabel = basePath.slice(1); // "questions" | "solutions"

  return (
    <div className="page-root detail-root">

      <Breadcrumb wide crumbs={[
        { label: parentLabel,  to: basePath },
        { label: exam.label,   to: `${basePath}/${exam.id}` },
        { label: question.title },
      ]} />

      <div className="detail-header">
        <p className="page-eyebrow">{exam.label} &nbsp;·&nbsp; CISC 1115</p>
        <h1 className="detail-title">{question.title}</h1>
        <div className="detail-topics">
          {question.topics.map(topic => (
            <span key={topic} className="topic-tag">{topic}</span>
          ))}
        </div>
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

// ── 404 state ─────────────────────────────────────────────────────────────────

interface NotFoundProps {
  backTo:    string;
  backLabel: string;
}

export function QuestionNotFound({ backTo, backLabel }: NotFoundProps) {
  return (
    <div className="page-root not-found-center">
      <div className="not-found-content">
        <p className="page-eyebrow">404</p>
        <h1 className="not-found-title">Question not found</h1>
        <Link to={backTo} className="back-link">{backLabel}</Link>
      </div>
    </div>
  );
}