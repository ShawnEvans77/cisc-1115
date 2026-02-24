// src/components/QuestionListPage.tsx
import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { exams } from "../data/exams";
import { Breadcrumb } from "./Breadcrumb";
import { QuestionCard } from "./QuestionCard";

interface QuestionListPageProps {
  basePath: string; // "/solutions" | "/questions"
  subtitle: string;
}

export function QuestionListPage({ basePath, subtitle }: QuestionListPageProps) {
  const { examId } = useParams<{ examId: string }>();
  const exam = exams.find(e => e.id === examId);
  const [query, setQuery] = useState("");

  const filteredQuestions = useMemo(() => {
    if (!exam) return [];
    const q = query.trim().toLowerCase();
    if (!q) return exam.questions;
    return exam.questions.filter(question =>
      question.title.toLowerCase().includes(q) ||
      question.topics.some(t => t.toLowerCase().includes(q)) ||
      question.prompt.toLowerCase().includes(q)
    );
  }, [query, exam]);

  // ── 404 ──────────────────────────────────────────────────────────────────────

  if (!exam) {
    return (
      <div className="page-root not-found-center">
        <div className="not-found-content">
          <p className="page-eyebrow">404</p>
          <h1 className="not-found-title">Exam not found</h1>
          <Link to={basePath} className="back-link">← Back to {basePath.slice(1)}</Link>
        </div>
      </div>
    );
  }

  // ── Page ─────────────────────────────────────────────────────────────────────

  const parentLabel = basePath.slice(1);
  const showResults = query.trim().length > 0;
  const resultLabel = filteredQuestions.length === 0
    ? "no results"
    : `${filteredQuestions.length} of ${exam.questions.length} questions`;

  return (
    <div className="page-root">

      <Breadcrumb crumbs={[
        { label: parentLabel, to: basePath },
        { label: exam.label },
      ]} />

      <div className="page-header page-header--detail">
        <p className="page-eyebrow">Brooklyn College &nbsp;·&nbsp; CISC 1115</p>
        <h1 className="page-title">{exam.label}</h1>
        <p className="page-subtitle">{subtitle}</p>

        <input
          className="search-input"
          type="text"
          placeholder="search questions, topics..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />

        {showResults && (
          <p className="search-result-count">{resultLabel}</p>
        )}
      </div>

      <div className="home-divider-wrap">
        <hr className="home-divider" />
      </div>

      <section className="page-section page-section--detail">
        {filteredQuestions.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state-text">nothing found for "{query}"</p>
          </div>
        ) : (
          filteredQuestions.map(q => (
            <QuestionCard
              key={q.id}
              question={q}
              examId={exam.id}
              query={query}
              basePath={basePath}
            />
          ))
        )}

        <div className="detail-bottom-nav">
          <Link to={basePath} className="back-link">← All semesters</Link>
        </div>
      </section>

    </div>
  );
}