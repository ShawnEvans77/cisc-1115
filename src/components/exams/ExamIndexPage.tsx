import { useState } from "react";
import { exams } from "../../data/exams";
import { useExamSearch, type SearchResult } from "../../hooks/useExamSearch";
import { matchesFinishedFilter, useFinishedQuestions, type FinishedFilter } from "../../hooks/useFinishedQuestions";
import { hasQuery, pluralize, resultCountLabel } from "../../utils/search";
import { PageHeader } from "../ui/PageHeader";
import { ProgressFilterControls } from "../ui/ProgressFilterControls";
import { SemesterCard } from "../ui/SemesterCard";
import { SearchResults } from "./SearchResults";

type ExamIndexPageProps = {
  title: string;
  subtitle: string;
  placeholder: string;
  basePath: "/questions" | "/solutions";
  itemLabel: "question" | "solution";
};

export function ExamIndexPage({
  title,
  subtitle,
  placeholder,
  basePath,
  itemLabel,
}: ExamIndexPageProps) {
  const [query, setQuery] = useState("");
  const [progressFilter, setProgressFilter] = useState<FinishedFilter>("all");
  const { isFinished } = useFinishedQuestions();
  const searchResults = useExamSearch(query);
  const searching = hasQuery(query);
  const filteringProgress = progressFilter !== "all";
  const progressResults: SearchResult[] = exams.flatMap(exam =>
    exam.questions.map(question => ({
      type: "question",
      examId: exam.id,
      examLabel: exam.label,
      questionId: question.id,
      title: question.title,
      topics: question.topics,
      prompt: question.prompt,
    }))
  );
  const results = searching ? searchResults : progressResults;
  const filteredResults = results.filter(result => (
    result.type === "semester"
      ? progressFilter === "all"
      : matchesFinishedFilter(isFinished(result.examId, result.questionId), progressFilter)
  ));

  return (
    <div className="page-root">
      <PageHeader
        title={title}
        subtitle={subtitle}
        query={query}
        placeholder={placeholder}
        compact={searching || filteringProgress}
        controls={<ProgressFilterControls value={progressFilter} onChange={setProgressFilter} />}
        resultLabel={searching || filteringProgress ? resultCountLabel(filteredResults.length) : undefined}
        onQueryChange={setQuery}
      />

      <section className={`page-section${searching || filteringProgress ? " page-section--results" : ""}`}>
        {searching || filteringProgress ? (
          <SearchResults
            results={filteredResults}
            query={query}
            basePath={basePath}
            itemLabel={itemLabel}
            isFinished={isFinished}
          />
        ) : (
          exams.map((exam, index) => (
            <SemesterCard
              key={exam.id}
              index={String(index + 1).padStart(2, "0")}
              label={exam.label}
              sublabel={pluralize(exam.questions.length, itemLabel)}
              complete={exam.questions.length > 0 && exam.questions.every(question => isFinished(exam.id, question.id))}
              to={`${basePath}/${exam.id}`}
            />
          ))
        )}
      </section>
    </div>
  );
}
