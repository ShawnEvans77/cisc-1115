import { useState } from "react";
import { exams } from "../../data/exams";
import { useExamSearch } from "../../hooks/useExamSearch";
import { matchesFinishedFilter, useFinishedQuestions, type FinishedFilter } from "../../hooks/useFinishedQuestions";
import type { ExamSection } from "../../types";
import { createAllQuestionSearchResults } from "../../utils/examSearch";
import { hasQuery, pluralize, resultCountLabel } from "../../utils/search";
import { cx } from "../../utils/ui";
import { IndexedCardList } from "../ui/IndexedCardList";
import { PageHeader } from "../ui/PageHeader";
import { ProgressFilterControls } from "../ui/ProgressFilterControls";
import { ExamSearchResults } from "./ExamSearchResults";

type ExamIndexPageProps = {
  section: ExamSection;
  itemLabel: string; // singular noun for one entry, e.g. "question"
  subtitle: string;
  placeholder: string;
};

const allQuestionSearchResults = createAllQuestionSearchResults(exams);

// Semester index for /questions and /solutions. Shows the semester list until the
// user searches or picks a progress filter, then shows matching questions instead.
export function ExamIndexPage({ section, itemLabel, subtitle, placeholder }: ExamIndexPageProps) {
  const [query, setQuery] = useState("");
  const [progressFilter, setProgressFilter] = useState<FinishedFilter>("all");
  const { isFinished, isExamFinished } = useFinishedQuestions();
  const searchResults = useExamSearch(query);

  const searching = hasQuery(query);
  const showingResults = searching || progressFilter !== "all";
  const results = searching ? searchResults : allQuestionSearchResults;
  const filteredResults = results.filter(result => (
    result.type === "semester"
      ? progressFilter === "all"
      : matchesFinishedFilter(isFinished(result.examId, result.questionId), progressFilter)
  ));

  return (
    <div className="page-root">
      <PageHeader
        title={section}
        subtitle={subtitle}
        query={query}
        placeholder={placeholder}
        compact={showingResults}
        controls={<ProgressFilterControls value={progressFilter} onChange={setProgressFilter} />}
        resultLabel={showingResults ? resultCountLabel(filteredResults.length) : undefined}
        onQueryChange={setQuery}
      />

      <section className={cx("page-section", showingResults && "page-section--results")}>
        {showingResults ? (
          <ExamSearchResults
            results={filteredResults}
            query={query}
            section={section}
            itemLabel={itemLabel}
            isFinished={isFinished}
          />
        ) : (
          <IndexedCardList items={exams.map(exam => ({
            id: exam.id,
            label: exam.label,
            sublabel: pluralize(exam.questions.length, itemLabel),
            complete: isExamFinished(exam),
            to: `/${section}/${exam.id}`,
          }))} />
        )}
      </section>
    </div>
  );
}
