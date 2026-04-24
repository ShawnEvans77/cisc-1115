// src/components/exams/QuestionListPage.tsx
import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { exams } from "../../data/exams";
import { Breadcrumb } from "../ui/Breadcrumb";
import { EmptyState } from "../ui/EmptyState";
import { NotFoundState } from "../ui/NotFoundState";
import { PageHeader } from "../ui/PageHeader";
import { ProgressFilterControls } from "../ui/ProgressFilterControls";
import { QuestionCard } from "./QuestionCard";
import { matchesFinishedFilter, useFinishedQuestions, type FinishedFilter } from "../../hooks/useFinishedQuestions";
import { hasQuery, normalizeQuery, resultCountLabel, searchablePrompt } from "../../utils/search";

interface QuestionListPageProps {
  basePath: string;
  subtitle: string;
}

export function QuestionListPage({ basePath, subtitle }: QuestionListPageProps) {
  const { examId } = useParams<{ examId: string }>();
  const exam = exams.find(e => e.id === examId);
  const [query, setQuery] = useState("");
  const [progressFilter, setProgressFilter] = useState<FinishedFilter>("all");
  const { isFinished } = useFinishedQuestions();

  const searchedQuestions = useMemo(() => {
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

  const filteredQuestions = useMemo(() => {
    if (!exam) return [];
    return searchedQuestions.filter(question =>
      matchesFinishedFilter(isFinished(exam.id, question.id), progressFilter)
    );
  }, [exam, searchedQuestions, progressFilter, isFinished]);

  if (!exam) {
    return <NotFoundState title="Exam not found" backTo={basePath} backLabel={`← Back to ${basePath.slice(1)}`} />;
  }

  const parentLabel = basePath.slice(1);
  const showResults = hasQuery(query) || progressFilter !== "all";
  const emptyMessage = progressFilter === "finished"
    ? "no finished questions yet"
    : progressFilter === "unfinished"
    ? "no unfinished questions left"
    : `nothing found for "${query}"`;

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
        controls={<ProgressFilterControls value={progressFilter} onChange={setProgressFilter} />}
        resultLabel={showResults ? resultCountLabel(filteredQuestions.length, exam.questions.length, "question") : undefined}
        onQueryChange={setQuery}
      />

      <section className="page-section page-section--questions">
        {filteredQuestions.length === 0 ? (
          <EmptyState>{emptyMessage}</EmptyState>
        ) : (
          filteredQuestions.map(q => (
            <QuestionCard
              key={q.id}
              question={q}
              examId={exam.id}
              query={query}
              basePath={basePath}
              finished={isFinished(exam.id, q.id)}
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
