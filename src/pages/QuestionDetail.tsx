import React from "react";
import { Link, useParams } from "react-router-dom";
import { exams } from "../data/exams";

function QuestionDetail(): React.ReactElement {
  const { examId, questionId } = useParams<{ examId: string; questionId: string }>();
  const exam = exams.find((e) => e.id === examId);
  const question = exam?.questions.find((q) => q.id === questionId);

  if (!exam || !question) {
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
            Question not found
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
        .delay-3 { animation-delay: 0.25s; }

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
        }

        .solution-block {
          background-color: #FFFFFF;
          border: 1.5px solid #E8E3DC;
          border-radius: 4px;
          padding: 2.5rem;
          margin-bottom: 1.5rem;
        }

        .code-block {
          background-color: #1A1208;
          border-radius: 4px;
          padding: 2rem;
          overflow-x: auto;
          margin-top: 1.5rem;
        }

        .code-block pre {
          font-family: 'DM Mono', monospace;
          font-size: 0.88rem;
          line-height: 1.8;
          color: #FFF5E4;
          margin: 0;
          white-space: pre;
        }

        .code-block .comment {
          color: #9E8A80;
        }

        .code-block .keyword {
          color: #E07B00;
        }

        .code-block .string {
          color: #C8B98A;
        }

        @media (max-width: 640px) {
          .solution-block { padding: 1.5rem; }
          .code-block { padding: 1.25rem; }
        }
      `}</style>

      {/* Breadcrumb */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 2.5rem 0" }}>
        <div
          className="fade-up delay-1"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}
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
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "#C8BFAF" }}>/</span>
          <Link
            to={`/solutions/${exam.id}`}
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
            {exam.label}
          </Link>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "#C8BFAF" }}>/</span>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#E07B00",
            }}
          >
            {question.title}
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
          {exam.label} &nbsp;·&nbsp; CISC 1115
        </p>
        <h1
          className="fade-up delay-1"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: 700,
            color: "#1A1208",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            marginBottom: "1rem",
          }}
        >
          {question.title}
        </h1>
        <div className="fade-up delay-2">
          {question.topics.map((topic: string) => (
            <span key={topic} className="topic-tag">
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2.5rem" }}>
        <hr style={{ border: "none", borderTop: "1.5px solid #E8E3DC" }} />
      </div>

      {/* Solution content — placeholder until real content added */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 2.5rem 8rem" }}>
        <div className="solution-block fade-up delay-3">
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#E07B00",
              marginBottom: "1rem",
            }}
          >
            The Question
          </p>
          <p
            style={{
              fontFamily: "'Lora', serif",
              fontSize: "1.05rem",
              color: "#1A1208",
              lineHeight: 1.8,
            }}
          >
            Question prompt goes here. Add the full question text to{" "}
            <code
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.9rem",
                backgroundColor: "#F5F4F0",
                padding: "0.1rem 0.4rem",
                borderRadius: "2px",
                color: "#E07B00",
              }}
            >
              src/data/exams.ts
            </code>
            .
          </p>
        </div>

        <div className="solution-block fade-up delay-3">
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#E07B00",
              marginBottom: "1rem",
            }}
          >
            Explanation
          </p>
          <p
            style={{
              fontFamily: "'Lora', serif",
              fontSize: "1.05rem",
              color: "#1A1208",
              lineHeight: 1.8,
            }}
          >
            Written explanation goes here. Walk through the approach step by step before showing the code.
          </p>
        </div>

        <div className="solution-block fade-up delay-3">
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#E07B00",
              marginBottom: "1rem",
            }}
          >
            Solution
          </p>
          <div className="code-block">
            <pre>
              <span className="comment">{"// Solution code goes here\n"}</span>
              <span className="keyword">{"public static void "}</span>
              {"main(String[] args) {\n"}
              {"    "}
              <span className="comment">{"// your code\n"}</span>
              {"}"}
            </pre>
          </div>
        </div>

        {/* Nav between questions */}
        <div
          className="fade-up delay-3"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "3rem",
            paddingTop: "2rem",
            borderTop: "1.5px solid #E8E3DC",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <Link
            to={`/solutions/${exam.id}`}
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#E07B00",
              textDecoration: "none",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            ← All {exam.label} questions
          </Link>
          <Link
            to="/solutions"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#A89F94",
              textDecoration: "none",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#E07B00")}
            onMouseLeave={e => (e.currentTarget.style.color = "#A89F94")}
          >
            All semesters →
          </Link>
        </div>
      </section>
    </div>
  );
}

export default QuestionDetail;