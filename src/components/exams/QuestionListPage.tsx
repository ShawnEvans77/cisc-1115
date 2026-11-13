import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { findExamById } from "../../data/exams";
import { matchesFinishedFilter, useFinishedQuestions, type FinishedFilter } from "../../hooks/useFinishedQuestions";
import type { ExamSection } from "../../types";
import { questionMatchesQuery } from "../../utils/examSearch";
import { hasQuery, normalizeQuery, promptSnippet, resultCountLabel } from "../../utils/search";
import { Breadcrumb } from "../ui/Breadcrumb";
import { EmptyState } from "../ui/EmptyState";
import { EntryCard } from "../ui/EntryCard";
import { NotFoundState } from "../ui/NotFoundState";
import { PageHeader } from "../ui/PageHeader";
import { ProgressFilterControls } from "../ui/ProgressFilterControls";

type QuestionListPageProps = {
  section: ExamSection;
  subtitle: string;
};

function emptyMessage(filter: FinishedFilter, query: string): string {
  if (filter === "finished") return "no finished questions yet";
  if (filter === "unfinished") return "no unfinished questions left";
  return `nothing found for "${query}"`;
}

// Question list for one semester, shared by /questions/:examId and /solutions/:examId.
export function QuestionListPage({ section, subtitle }: QuestionListPageProps) {
  const { examId } = useParams<{ examId: string }>();
  const exam = findExamById(examId);
  const [query, setQuery] = useState("");
  const [progressFilter, setProgressFilter] = useState<FinishedFilter>("all");
  const { isFinished } = useFinishedQuestions();

  const filteredQuestions = useMemo(() => {
    if (!exam) return [];
    const q = normalizeQuery(query);

    return exam.questions.filter(question =>
      (!q || questionMatchesQuery(question, q)) &&
      matchesFinishedFilter(isFinished(exam.id, question.id), progressFilter)
    );
  }, [exam, query, progressFilter, isFinished]);

  const basePath = `/${section}`;

  if (!exam) {
    return <NotFoundState title="Exam not found" backTo={basePath} backLabel={`← Back to ${section}`} />;
  }

  const showResults = hasQuery(query) || progressFilter !== "all";

  return (
    <div className="page-root">
      <Breadcrumb crumbs={[
        { label: section, to: basePath },
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
          <EmptyState>{emptyMessage(progressFilter, query)}</EmptyState>
        ) : (
          filteredQuestions.map(question => (
            <EntryCard
              key={question.id}
              to={`${basePath}/${exam.id}/${question.id}`}
              badge={question.id.toUpperCase()}
              title={question.title}
              tags={question.topics}
              snippet={promptSnippet(question.prompt, query)}
              query={query}
              finished={isFinished(exam.id, question.id)}
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
