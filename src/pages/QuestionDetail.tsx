import React from "react";
import { Link, useParams } from "react-router-dom";
import { exams } from "../data/exams";

const KEYWORDS = [
  "public", "private", "protected", "class", "static", "void", "int", "long",
  "double", "float", "boolean", "char", "String", "new", "return", "if", "else",
  "for", "while", "do", "switch", "case", "break", "continue", "import", "package",
  "null", "true", "false", "this", "super", "extends", "implements", "interface",
  "final", "abstract", "try", "catch", "finally", "throw", "throws", "instanceof",
];

function highlightJava(code: string): React.ReactElement[] {
  const lines = code.split("\n");
  return lines.map((line, li) => {
    const tokens: React.ReactElement[] = [];
    let i = 0;

    while (i < line.length) {
      // Single-line comment
      if (line[i] === "/" && line[i + 1] === "/") {
        tokens.push(
          <span key={i} style={{ color: "#9E8A80", fontStyle: "italic" }}>
            {line.slice(i)}
          </span>
        );
        i = line.length;
        continue;
      }

      // String literal
      if (line[i] === '"') {
        let j = i + 1;
        while (j < line.length && line[j] !== '"') {
          if (line[j] === "\\") j++;
          j++;
        }
        j++;
        tokens.push(
          <span key={i} style={{ color: "#B07D3A" }}>
            {line.slice(i, j)}
          </span>
        );
        i = j;
        continue;
      }

      // Number
      if (/[0-9]/.test(line[i])) {
        let j = i;
        while (j < line.length && /[0-9.]/.test(line[j])) j++;
        tokens.push(
          <span key={i} style={{ color: "#6B8E6B" }}>
            {line.slice(i, j)}
          </span>
        );
        i = j;
        continue;
      }

      // Word — keyword or identifier
      if (/[a-zA-Z_]/.test(line[i])) {
        let j = i;
        while (j < line.length && /[a-zA-Z0-9_]/.test(line[j])) j++;
        const word = line.slice(i, j);
        if (KEYWORDS.includes(word)) {
          tokens.push(
            <span key={i} style={{ color: "#E07B00", fontWeight: 600 }}>
              {word}
            </span>
          );
        } else {
          tokens.push(<span key={i}>{word}</span>);
        }
        i = j;
        continue;
      }

      // Punctuation / operators — subtle accent
      if (/[{}()[\];,.]/.test(line[i])) {
        tokens.push(
          <span key={i} style={{ color: "#8A7570" }}>
            {line[i]}
          </span>
        );
        i++;
        continue;
      }

      // Everything else
      tokens.push(<span key={i}>{line[i]}</span>);
      i++;
    }

    return (
      <div key={li} style={{ minHeight: "1.5em" }}>
        {tokens}
      </div>
    );
  });
}

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
        .muted-link {
          font-family: 'DM Mono', monospace;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #A89F94;
          text-decoration: none;
          transition: color 0.18s;
        }
        .muted-link:hover { color: #E07B00; }
        @media (max-width: 640px) {
          .solution-block { padding: 1.5rem; }
        }
      `}</style>

      {/* Breadcrumb */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "3rem 2.5rem 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
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
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem 2.5rem 3rem" }}>
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
          {exam.label} &nbsp;·&nbsp; CISC 1115
        </p>
        <h1
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
        <div>
          {question.topics.map((topic: string) => (
            <span key={topic} className="topic-tag">
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem" }}>
        <hr style={{ border: "none", borderTop: "1.5px solid #E8E3DC" }} />
      </div>

      {/* Solution content */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "3rem 2.5rem 8rem" }}>

        {/* The Question */}
        <div className="solution-block">
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#E07B00",
              marginBottom: "1.25rem",
            }}
          >
            The Question
          </p>
          {question.prompt.split("\n").map((line, i) =>
            line.trim() === "" ? (
              <br key={i} />
            ) : (
              <p
                key={i}
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: "1.2rem",
                  color: "#1A1208",
                  lineHeight: 1.85,
                  marginBottom: "0.5rem",
                }}
              >
                {line}
              </p>
            )
          )}
        </div>

        {/* Explanation */}
        <div className="solution-block">
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#E07B00",
              marginBottom: "1.25rem",
            }}
          >
            Explanation
          </p>
          {question.explanation.split("\n").map((line, i) =>
            line.trim() === "" ? (
              <br key={i} />
            ) : (
              <p
                key={i}
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: "1.2rem",
                  color: "#1A1208",
                  lineHeight: 1.85,
                  marginBottom: "0.5rem",
                }}
              >
                {line}
              </p>
            )
          )}
        </div>

        {/* Solution */}
        <div className="solution-block">
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#E07B00",
              marginBottom: "1.25rem",
            }}
          >
            Solution
          </p>
          <div
            style={{
              backgroundColor: "#F5F2EE",
              border: "1.5px solid #E8E3DC",
              borderRadius: "4px",
              padding: "2rem 2.5rem",
              overflowX: "auto",
              marginTop: "0.5rem",
            }}
          >
            <pre
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "1.05rem",
                lineHeight: 2,
                color: "#1A1208",
                margin: 0,
                whiteSpace: "pre",
              }}
            >
              {highlightJava(question.solution)}
            </pre>
          </div>
        </div>

        {/* Bottom nav */}
        <div
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
          <Link to={`/solutions/${exam.id}`} className="back-link">
            ← All {exam.label} questions
          </Link>
          <Link to="/solutions" className="muted-link">
            All semesters →
          </Link>
        </div>
      </section>
    </div>
  );
}

export default QuestionDetail;