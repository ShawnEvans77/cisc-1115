// src/components/exams/QuestionListPage.tsx
import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { exams } from "../../data/exams";
import { Breadcrumb } from "../ui/Breadcrumb";
import { EmptyState } from "../ui/EmptyState";
import { NotFoundState } from "../ui/NotFoundState";
import { PageHeader } from "../ui/PageHeader";
import { QuestionCard } from "./QuestionCard";
import { hasQuery, normalizeQuery, resultCountLabel, searchablePrompt } from "../../utils/search";

interface QuestionListPageProps {
  basePath: string;
  subtitle: string;
}

export function QuestionListPage({ basePath, subtitle }: QuestionListPageProps) {
  const { examId } = useParams<{ examId: string }>();
  const exam = exams.find(e => e.id === examId);
  const [query, setQuery] = useState("");

  const filteredQuestions = useMemo(() => {
    if (!exam) return [];
    const q = normalizeQuery(query);
    if (!q) return exam.questions;
    return exam.questions.filter(question => {
      const cleanPrompt = searchablePrompt(question.prompt);
      return (
        question.title.toLowerCase().includes(q) ||
        question.topics.some(topic => topic.toLowerCase().includes(q)) ||
        cleanPrompt.toLowerCase().includes(q)
      );
    });
  }, [query, exam]);

  if (!exam) {
    return <NotFoundState title="Exam not found" backTo={basePath} backLabel={`← Back to ${basePath.slice(1)}`} />;
  }

  const parentLabel = basePath.slice(1);
  const showResults = hasQuery(query);

  return (
    <div className="page-root">

      <Breadcrumb crumbs={[
        { label: parentLabel, to: basePath },
        { label: exam.label },
      ]} />

      <PageHeader
        detail
        title={exam.label}
        subtitle={subtitle}
        query={query}
        placeholder="search questions, topics..."
        resultLabel={showResults ? resultCountLabel(filteredQuestions.length, exam.questions.length, "question") : undefined}
        onQueryChange={setQuery}
      />

      <section className="page-section page-section--questions">
        {filteredQuestions.length === 0 ? (
          <EmptyState query={query} />
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
