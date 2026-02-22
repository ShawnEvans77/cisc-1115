import React from "react";

interface Solution {
  label: string;
  year: string;
  path: string;
  index: string;
  delay: string;
}

const solutions: Solution[] = [
  {
    label: "Fall 2020",
    year: "2020",
    path: "/solutions/fall-2020",
    index: "01",
    delay: "0.20s",
  },
  {
    label: "Spring 2021",
    year: "2021",
    path: "/solutions/spring-2021",
    index: "02",
    delay: "0.32s",
  },
];

function Solutions(): React.ReactElement {
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

        .solution-link {
          display: block;
          border-top: 1.5px solid #E8E3DC;
          padding: 4rem 1rem;
          text-decoration: none;
          margin-left: -1rem;
          margin-right: -1rem;
          border-radius: 4px;
          transition: background 0.22s cubic-bezier(0.22,1,0.36,1);
        }
        .solution-link:last-child {
          border-bottom: 1.5px solid #E8E3DC;
        }
        .solution-link:hover {
          background-color: rgba(224,123,0,0.04);
        }
        .solution-link:hover .solution-label {
          color: #E07B00;
        }
        .solution-link:hover .solution-arrow {
          transform: translateX(8px);
          color: #E07B00;
        }
        .solution-arrow {
          transition: transform 0.2s cubic-bezier(0.22,1,0.36,1), color 0.2s;
          color: #C8BFAF;
          font-size: 2.5rem;
          font-family: 'DM Mono', monospace;
          flex-shrink: 0;
        }
        @media (max-width: 640px) {
          .solution-link { padding: 2.5rem 1rem; }
          .solution-arrow { font-size: 1.5rem; }
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
          Solutions
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
          Select a semester to browse its solutions.
        </p>
      </div>

      {/* Solution list */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 2.5rem 8rem" }}>
        {solutions.map((solution: Solution): React.ReactElement => {
          return (
            <a
              key={solution.path}
              href={solution.path}
              className="solution-link fade-up"
              style={{ animationDelay: solution.delay }}
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
                  {solution.index}
                </span>

                <div>
                  <h2
                    className="solution-label"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
                      fontWeight: 400,
                      color: "#1A1208",
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                      transition: "color 0.2s",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {solution.label}
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
                    {solution.year} &nbsp;·&nbsp; View solutions
                  </span>
                </div>

                <span className="solution-arrow">→</span>
              </div>
            </a>
          );
        })}
      </section>
    </div>
  );
}

export default Solutions;