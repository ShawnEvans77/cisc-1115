// src/components/exams/QuestionCard.tsx
import { Link } from "react-router-dom";
import type { Question } from "../../types";
import { highlight } from "../../utils/highlight";
import { searchablePrompt, snippetAround } from "../../utils/search";

interface QuestionCardProps {
  question: Question;
  examId:   string;
  query:    string;
  basePath: string;
  finished?: boolean;
}

function getPromptSnippet(prompt: string, query: string): string | null {
  return snippetAround(searchablePrompt(prompt), query);
}

export function QuestionCard({ question: q, examId, query, basePath, finished = false }: QuestionCardProps) {
  const snippet = getPromptSnippet(q.prompt, query);
  const badge   = q.id.replace("question-", "Q").toUpperCase();

  return (
    <Link to={`${basePath}/${examId}/${q.id}`} className={`question-card${finished ? " question-card--finished" : ""}`}>
      <div className="question-card-grid">
        <span className="question-card-badge">{badge}</span>
        <div>
          <h2 className="question-card-title q-title">
            {highlight(q.title, query)}
            {finished && <span className="question-title-check" aria-label="finished">✓</span>}
          </h2>
          <div className="question-card-topics">
            {q.topics.map(topic => (
              <span key={topic} className="topic-tag">
                {highlight(topic, query)}
              </span>
            ))}
          </div>
          {snippet && (
            <p className="question-card-snippet">
              {highlight(snippet, query)}
            </p>
          )}
        </div>
        <span className="q-arrow">→</span>
      </div>
    </Link>
  );
}
