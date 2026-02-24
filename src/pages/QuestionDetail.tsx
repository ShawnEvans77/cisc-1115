import React from "react";
import { Link, useParams } from "react-router-dom";
import { exams } from "../data/exams";

function QuestionDetail(): React.ReactElement {
  const { examId, questionId } = useParams<{ examId: string; questionId: string }>();
  const exam = exams.find((e) => e.id === examId);
  const question = exam?.questions.find((q) => q.id === questionId);

  if (!exam || !question) {
    return (
      <div style={{ fontFamily: "'Lora', serif", backgroundColor: "#FAFAF8", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#E07B00", marginBottom: "1rem" }}>404</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#1A1208", marginBottom: "1.5rem" }}>Question not found</h1>
          <Link to="/questions" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#E07B00", textDecoration: "none" }}>
            ← Back to questions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: "'Lora', serif",
      backgroundColor: "#FAFAF8",
      minHeight: "100vh",
      width: "100%",
      maxWidth: "100vw",
      overflowX: "hidden",
      boxSizing: "border-box",
    }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .qo-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
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
          margin-top: 0.3rem;
        }

        .content-block {
          background-color: #FFFFFF;
          border: 1.5px solid #E8E3DC;
          border-radius: 4px;
          padding: 2.5rem;
          margin-bottom: 1.5rem;
          width: 100%;
        }

        .back-link {
          font-family: 'DM Mono', monospace;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #E07B00;
          text-decoration: none;
          transition: opacity 0.18s;
        }
        .back-link:hover { opacity: 0.7; }

        .solution-link {
          font-family: 'DM Mono', monospace;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #FFFFFF;
          background-color: #E07B00;
          border-radius: 3px;
          padding: 0.65rem 1.75rem;
          text-decoration: none;
          transition: background-color 0.18s;
          white-space: nowrap;
        }
        .solution-link:hover { background-color: #C96E00; }

        .math-display {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1.25rem 1rem 0.25rem 1rem;
          overflow-x: auto;
        }

        @media (max-width: 640px) {
          .content-block { padding: 1.25rem; }
        }
      `}</style>

      {/* Breadcrumb */}
      <div className="qo-container" style={{ paddingTop: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <Link
            to="/questions"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A89F94", textDecoration: "none", transition: "color 0.18s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#E07B00")}
            onMouseLeave={e => (e.currentTarget.style.color = "#A89F94")}
          >
            Questions
          </Link>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "#C8BFAF" }}>/</span>
          <Link
            to={`/questions/${exam.id}`}
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A89F94", textDecoration: "none", transition: "color 0.18s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#E07B00")}
            onMouseLeave={e => (e.currentTarget.style.color = "#A89F94")}
          >
            {exam.label}
          </Link>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "#C8BFAF" }}>/</span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E07B00" }}>
            {question.title}
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="qo-container" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#E07B00", marginBottom: "1rem" }}>
          {exam.label} &nbsp;·&nbsp; CISC 1115
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 700, color: "#1A1208", letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: "1rem" }}>
          {question.title}
        </h1>
        <div>
          {question.topics.map((topic: string) => (
            <span key={topic} className="topic-tag">{topic}</span>
          ))}
        </div>
      </div>

      {/* Content */}
      <section className="qo-container" style={{ paddingTop: "3rem", paddingBottom: "8rem" }}>

        {/* The Question */}
        <div className="content-block">
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#E07B00", marginBottom: "1.25rem" }}>
            The Question
          </p>
          {question.prompt.split("\n").map((line, i) =>
            line.trim() === "" ? <br key={i} /> : (
              <p key={i} style={{
                fontFamily: "'Lora', serif",
                fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
                color: "#1A1208",
                lineHeight: 1.9,
                marginBottom: "0.5rem",
                whiteSpace: "pre-wrap",
              }}>
                {line}
              </p>
            )
          )}

          {question.mathHtml && (
            <div
              className="math-display"
              dangerouslySetInnerHTML={{ __html: question.mathHtml }}
            />
          )}
        </div>

        {/* Bottom nav */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "3rem", paddingTop: "2rem", borderTop: "1.5px solid #E8E3DC", flexWrap: "wrap", gap: "1rem" }}>
          <Link to={`/questions/${exam.id}`} className="back-link">
            ← All {exam.label} questions
          </Link>
          <Link to={`/solutions/${exam.id}/${question.id}`} className="solution-link">
            View solution →
          </Link>
        </div>
      </section>
    </div>
  );
}

export default QuestionDetail;