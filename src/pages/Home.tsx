import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const sections = [
  {
    label: "solutions",
    path: "/solutions",
    description:
      "past exam questions with fully commented, step-by-step solutions",
    index: "01",
  },
  {
    label: "exams",
    path: "/exams",
    description:
      "raw exams from previous semesters",
    index: "02",
  },
  {
    label: "notes",
    path: "/notes",
    description:
      "examples of important algorithims & other things",
    index: "03",
  },
  {
    label: "contact",
    path: "/contact",
    description:
      "get in touch with me",
    index: "04",
  },
];

function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

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
        .delay-2 { animation-delay: 0.18s; }
        .delay-3 { animation-delay: 0.30s; }
        .delay-4 { animation-delay: 0.44s; }
        .delay-5 { animation-delay: 0.56s; }

        .cta-group {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .cta-btn {
          display: inline-block;
          font-family: 'DM Mono', monospace;
          font-weight: 500;
          font-size: 0.8rem;
          padding: 0.9rem 2.2rem;
          text-decoration: none;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: background 0.18s, color 0.18s, border-color 0.18s;
          white-space: nowrap;
        }
        .card-link {
          display: block;
          border-top: 1.5px solid #E8E3DC;
          padding: 3.5rem 0;
          cursor: pointer;
          text-decoration: none;
        }
        .card-link:last-child { border-bottom: 1.5px solid #E8E3DC; }
        .card-link:hover .card-arrow { transform: translateX(6px); color: #E07B00; }
        .card-link:hover .card-label { color: #E07B00; }
        .card-arrow {
          transition: transform 0.2s cubic-bezier(0.22,1,0.36,1), color 0.2s;
          color: #A89F94;
          font-size: 2rem;
          font-family: 'DM Mono', monospace;
          flex-shrink: 0;
        }
        .card-grid {
          display: grid;
          grid-template-columns: 3rem 1fr auto;
          align-items: center;
          gap: 2.5rem;
        }

        @media (max-width: 640px) {
          .cta-group { flex-direction: column; align-items: stretch; }
          .cta-btn { text-align: center; padding: 1rem 1.5rem; }
          .card-link { padding: 2rem 0; }
          .card-grid { grid-template-columns: 2rem 1fr auto; gap: 1rem; }
          .card-arrow { font-size: 1.25rem; }
        }
      `}</style>

      {/* ── Hero ── */}
      <section
        style={{
          position: "relative",
          minHeight: "88vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(92,61,46,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(92,61,46,0.07) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            pointerEvents: "none",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          }}
        />

        {/* Vertical line — top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "1px",
            height: loaded ? "48px" : "0",
            backgroundColor: "#E07B00",
            opacity: 0.5,
            transition: "height 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
          }}
        />

        {/* Vertical line — bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "1px",
            height: loaded ? "48px" : "0",
            backgroundColor: "#E07B00",
            opacity: 0.5,
            transition: "height 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
          }}
        />

        {/* Hero content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1100px",
            width: "100%",
            margin: "0 auto",
            padding: "3.5rem 2.5rem 4rem",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p
            className="fade-up delay-1"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#E07B00",
              marginBottom: "2rem",
            }}
          >
            Brooklyn College &nbsp;·&nbsp; Computer Science
          </p>

          <h1
            className="fade-up delay-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(4rem, 18vw, 13rem)",
              fontWeight: 700,
              lineHeight: 0.88,
              letterSpacing: "-0.02em",
              color: "#1A1208",
              marginBottom: "5rem",
            }}
          >
            cisc
            <br />
            <span style={{ color: "#E07B00" }}>1115</span>
          </h1>

          <div className="fade-up delay-3 cta-group">
            <Link
              to="/solutions"
              className="cta-btn"
              style={{ backgroundColor: "#E07B00", color: "#FFFFFF" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#C96E00")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#E07B00")}
            >
              Browse solutions
            </Link>
            <Link
              to="/exams"
              className="cta-btn"
              style={{ backgroundColor: "#5C3D2E", color: "#FFFFFF" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#4A3025")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#5C3D2E")}
            >
              Past exams
            </Link>
            <Link
              to="/notes"
              className="cta-btn"
              style={{ backgroundColor: "#9E8A80", color: "#FFFFFF" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#8A7570")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#9E8A80")}
            >
              Read notes
            </Link>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2.5rem" }}>
        <hr style={{ border: "none", borderTop: "1.5px solid #E8E3DC" }} />
      </div>

      {/* ── What's inside ── */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "5rem 2.5rem 8rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p
          className="fade-up delay-4"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.72rem",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#A89F94",
            marginBottom: "3rem",
          }}
        >
          What's inside
        </p>

        <div className="fade-up delay-5">
          {sections.map((s) => (
            <Link key={s.path} to={s.path} className="card-link">
              <div className="card-grid">
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "1rem",
                    color: "#C8BFAF",
                    fontWeight: 400,
                  }}
                >
                  {s.index}
                </span>
                <div>
                  <h2
                    className="card-label"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
                      fontWeight: 700,
                      color: "#1A1208",
                      marginBottom: "0.6rem",
                      transition: "color 0.2s",
                    }}
                  >
                    {s.label}
                  </h2>
                  <p
                    style={{
                      fontFamily: "'Lora', serif",
                      fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
                      color: "#6B6355",
                      lineHeight: 1.7,
                      maxWidth: "580px",
                    }}
                  >
                    {s.description}
                  </p>
                </div>
                <span className="card-arrow">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;