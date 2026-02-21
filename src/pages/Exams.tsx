import React from "react";

interface Exam {
  label: string;
  year: string;
  pdf: string;
  index: string;
}

const exams: Exam[] = [
  {
    label: "Fall 2020",
    year: "2020",
    pdf: "/exams/fall-2020.pdf",
    index: "01",
  },
  {
    label: "Spring 2021",
    year: "2021",
    pdf: "/exams/spring-2021.pdf",
    index: "02",
  },
];

function Exams(): React.ReactElement {
  return (
    <div style={{ fontFamily: "'Lora', serif", backgroundColor: "#FAFAF8", minHeight: "100vh" }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up {
          opacity: 0;
          animation: fadeUp 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .delay-1 { animation-delay: 0.05s; }
        .delay-2 { animation-delay: 0.15s; }

        .exam-link {
          display: block;
          border-top: 1.5px solid #E8E3DC;
          padding: 4rem 0;
          text-decoration: none;
        }
        .exam-link:last-child {
          border-bottom: 1.5px solid #E8E3DC;
        }
        .exam-link:hover .exam-label {
          color: #E07B00;
        }
        .exam-link:hover .exam-arrow {
          transform: translateX(8px);
          color: #E07B00;
        }
        .exam-arrow {
          transition: transform 0.2s cubic-bezier(0.22,1,0.36,1), color 0.2s;
          color: #C8BFAF;
          font-size: 2.5rem;
          font-family: 'DM Mono', monospace;
          flex-shrink: 0;
        }
        @media (max-width: 640px) {
          .exam-link { padding: 2.5rem 0; }
          .exam-arrow { font-size: 1.5rem; }
        }
      `}</style>

      {/* Header */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "5rem 2.5rem 3rem" }}>
        <p
          className="fade-up delay-1"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.75rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#E07B00",
            marginBottom: "1.25rem",
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
          Past Exams
        </h1>
        <p
          className="fade-up delay-2"
          style={{
            fontFamily: "'Lora', serif",
            fontSize: "1rem",
            fontStyle: "italic",
            color: "#9E8A80",
          }}
        >
          Click any exam to open the PDF.
        </p>
      </div>

      {/* Exam list */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 2.5rem 8rem" }}>
        {exams.map((exam: Exam, i: number) => (
          <a
            key={exam.pdf}
            href={exam.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="exam-link fade-up"
            style={{ animationDelay: `${0.2 + i * 0.12}s` }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "3rem 1fr auto",
                alignItems: "center",
                gap: "2.5rem",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "1rem",
                  color: "#C8BFAF",
                  fontWeight: 400,
                }}
              >
                {exam.index}
              </span>

              <div>
                <h2
                  className="exam-label"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(2.5rem, 6vw, 4.5rem)", // Significantly larger
                    fontWeight: 400, // Still unbolded
                    textTransform: "lowercase", // Still lowercase
                    color: "#1A1208",
                    lineHeight: 1,
                    letterSpacing: "-0.03em", // Tighter tracking for large text
                    transition: "color 0.2s",
                    marginBottom: "0.5rem",
                  }}
                >
                  {exam.label}
                </h2>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.78rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#A89F94",
                  }}
                >
                  PDF
                </span>
              </div>

              <span className="exam-arrow">→</span>
            </div>
          </a>
        ))}
      </section>
    </div>
  );
}

export default Exams;