import { useState } from "react";
import { exams } from "../../data/exams";
import { useExamSearch } from "../../hooks/useExamSearch";
import { matchesFinishedFilter, useFinishedQuestions, type FinishedFilter } from "../../hooks/useFinishedQuestions";
import { hasQuery, pluralize, resultCountLabel } from "../../utils/search";
import { createAllQuestionSearchResults } from "../../utils/examSearch";
import { PageHeader } from "../ui/PageHeader";
import { ProgressFilterControls } from "../ui/ProgressFilterControls";
import { SemesterCard } from "../ui/SemesterCard";
import { SearchResults } from "./SearchResults";

type ExamIndexPageProps = {
  title: string;
  subtitle: string;
  placeholder: string;
  basePath: `/${ExamIndexSection}`;
  itemLabel: "question" | "solution";
};

type ExamIndexSection = "questions" | "solutions";

const allQuestionSearchResults = createAllQuestionSearchResults(exams);

export function ExamIndexPage({
  title,
  subtitle,
  placeholder,
  basePath,
  itemLabel,
}: ExamIndexPageProps) {
  const [query, setQuery] = useState("");
  const [progressFilter, setProgressFilter] = useState<FinishedFilter>("all");
  const { isFinished, isExamFinished } = useFinishedQuestions();
  const searchResults = useExamSearch(query);
  const searching = hasQuery(query);
  const filteringProgress = progressFilter !== "all";
  const results = searching ? searchResults : allQuestionSearchResults;
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
              complete={isExamFinished(exam)}
              to={`${basePath}/${exam.id}`}
            />
          ))
        )}
      </section>
    </div>
  );
}
