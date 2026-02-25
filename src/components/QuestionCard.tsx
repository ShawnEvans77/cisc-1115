// src/components/QuestionCard.tsx
import { Link } from "react-router-dom";
import type { Question } from "../types";
import { highlight } from "../utils/highlight";

interface QuestionCardProps {
  question: Question;
  examId:   string;
  query:    string;
  basePath: string;
}

function getPromptSnippet(prompt: string, query: string): string | null {
  const sq = query.trim().toLowerCase();
  if (!sq) return null;
  const idx = prompt.toLowerCase().indexOf(sq);
  if (idx === -1) return null;
  const start = Math.max(0, idx - 40);
  const end   = Math.min(prompt.length, idx + sq.length + 60);
  return (start > 0 ? "…" : "") + prompt.slice(start, end) + (end < prompt.length ? "…" : "");
}

export function QuestionCard({ question: q, examId, query, basePath }: QuestionCardProps) {
  const snippet = getPromptSnippet(q.prompt, query);
  const badge   = q.id.replace("question-", "Q").toUpperCase();

  return (
    <Link to={`${basePath}/${examId}/${q.id}`} className="question-card">
      <div className="question-card-grid">
        <span className="question-card-badge">{badge}</span>
        <div>
          <h2 className="question-card-title q-title">
            {highlight(q.title, query)}
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