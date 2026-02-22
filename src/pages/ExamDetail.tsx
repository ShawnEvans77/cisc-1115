import React from "react";
import { Link, useParams } from "react-router-dom";
import { exams } from "../data/exams";

function ExamDetail(): React.ReactElement {
  const { examId } = useParams<{ examId: string }>();
  const exam = exams.find((e) => e.id === examId);

  if (!exam) {
    return (
      <div
        style={{
          fontFamily: "'Lora', serif",
          backgroundColor: "#FAFAF8",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#E07B00",
              marginBottom: "1rem",
            }}
          >
            404
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "#1A1208",
              marginBottom: "1.5rem",
            }}
          >
            Exam not found
          </h1>
          <Link
            to="/solutions"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#E07B00",
              textDecoration: "none",
            }}
          >
            ← Back to solutions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Lora', serif", backgroundColor: "#FAFAF8", minHeight: "100vh" }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up {
          opacity: 0;
          animation: fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .delay-1 { animation-delay: 0.05s; }
        .delay-2 { animation-delay: 0.15s; }

        .question-card {
          display: block;
          text-decoration: none;
          background-color: #FFFFFF;
          border: 1.5px solid #E8E3DC;
          padding: 2rem 2.5rem;
          margin-bottom: 1rem;
          border-radius: 4px;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .question-card:hover {
          border-color: #E07B00;
          box-shadow: 0 4px 24px rgba(224,123,0,0.08);
          transform: translateY(-2px);
        }
        .question-card:hover .q-title {
          color: #E07B00;
        }
        .question-card:hover .q-arrow {
          transform: translateX(6px);
          color: #E07B00;
        }
        .q-arrow {
          transition: transform 0.2s cubic-bezier(0.22,1,0.36,1), color 0.2s;
          color: #C8BFAF;
          font-size: 1.5rem;
          font-family: 'DM Mono', monospace;
          flex-shrink: 0;
        }
        .q-title {
          transition: color 0.2s;
        }
        .topic-tag {
          display: inline-block;
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #9E8A80;
          border: 1px solid #E8E3DC;
          padding: 0.2rem 0.6rem;
          border-radius: 2px;
          margin-right: 0.4rem;
          margin-top: 0.6rem;
        }

        @media (max-width: 640px) {
          .question-card { padding: 1.5rem; }
        }
      `}</style>

      {/* Breadcrumb */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 2.5rem 0" }}>
        <div
          className="fade-up delay-1"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <Link
            to="/solutions"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#A89F94",
              textDecoration: "none",
              transition: "color 0.18s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#E07B00")}
            onMouseLeave={e => (e.currentTarget.style.color = "#A89F94")}
          >
            Solutions
          </Link>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.72rem",
              color: "#C8BFAF",
            }}
          >
            /
          </span>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#E07B00",
            }}
          >
            {exam.label}
          </span>
        </div>
      </div>

      {/* Header */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 2.5rem 3rem" }}>
        <p
          className="fade-up delay-1"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.75rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#E07B00",
            marginBottom: "1rem",
          }}
        >
          Brooklyn College &nbsp;·&nbsp; CISC 1115
        </p>
        <h1
          className="fade-up delay-1"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 700,
            color: "#1A1208",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            marginBottom: "0.75rem",
          }}
        >
          {exam.label}
        </h1>
        <p
          className="fade-up delay-2"
          style={{
            fontFamily: "'Lora', serif",
            fontSize: "1rem",
            fontStyle: "italic",
            color: "#9E8A80",
            marginBottom: "0.5rem",
          }}
        >
          Select a question to view its full solution.
        </p>
        <p
          className="fade-up delay-2"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.72rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#C8BFAF",
          }}
        >
          {exam.questions.length} questions available
        </p>
      </div>

      {/* Divider */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2.5rem" }}>
        <hr style={{ border: "none", borderTop: "1.5px solid #E8E3DC" }} />
      </div>

      {/* Question cards */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 2.5rem 8rem" }}>
        {exam.questions.map((q, i): React.ReactElement => {
          return (
            <Link
              key={q.id}
              to={`/solutions/${exam.id}/${q.id}`}
              className="question-card fade-up"
              style={{ animationDelay: `${0.2 + i * 0.08}s` }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  alignItems: "center",
                  gap: "2rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.78rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#FFFFFF",
                    backgroundColor: "#E07B00",
                    padding: "0.3rem 0.75rem",
                    borderRadius: "2px",
                    flexShrink: 0,
                  }}
                >
                  {q.id.replace("question-", "Q").toUpperCase()}
                </div>

                <div>
                  <h2
                    className="q-title"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                      fontWeight: 700,
                      color: "#1A1208",
                      lineHeight: 1.1,
                      letterSpacing: "-0.01em",
                      margin: 0,
                    }}
                  >
                    {q.title}
                  </h2>
                  <div>
                    {q.topics.map((topic: string) => (
                      <span key={topic} className="topic-tag">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <span className="q-arrow">→</span>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}

export default ExamDetail;