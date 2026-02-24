// src/pages/Home.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { colors } from "../styles/theme";

// ── Data ──────────────────────────────────────────────────────────────────────

const sections = [
  { index: "01", label: "exams",     path: "/exams",     description: "raw exams from previous semesters" },
  { index: "02", label: "questions", path: "/questions", description: "past exam questions" },
  { index: "03", label: "solutions", path: "/solutions", description: "past exam questions with fully commented, step-by-step solutions" },
  { index: "04", label: "notes",     path: "/notes",     description: "examples of important algorithms & other things" },
  { index: "05", label: "contact",   path: "/contact",   description: "get in touch with me" },
];

const ctaButtons = [
  { label: "exams",     path: "/exams",     color: colors.syrup  },
  { label: "questions", path: "/questions", color: colors.forest  },
  { label: "solutions", path: "/solutions", color: colors.orange  },
  { label: "notes",     path: "/notes",     color: colors.subtle  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function HeroLine({ position }: { position: "top" | "bottom" }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="hero-line"
      data-position={position}
      style={{ height: loaded ? "48px" : "0" }}
    />
  );
}

function CtaButton({ label, path, color }: { label: string; path: string; color: string }) {
  return (
    <Link
      to={path}
      className="cta-btn"
      style={{ "--cta-bg": color } as React.CSSProperties}
    >
      {label}
    </Link>
  );
}

function SectionRow({ index, label, description, path }: typeof sections[0]) {
  return (
    <Link to={path} className="home-card-link">
      <div className="home-card-grid">
        <span className="home-card-index">{index}</span>
        <div>
          <h2 className="home-card-label">{label}</h2>
          <p className="home-card-desc">{description}</p>
        </div>
        <span className="home-card-arrow">→</span>
      </div>
    </Link>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

function Home() {
  return (
    <div className="home-root">

      <section className="hero-section">
        <div className="hero-grid-bg" />
        <HeroLine position="top" />
        <HeroLine position="bottom" />

        <div className="hero-content">
          <p className="fade-up delay-1 hero-eyebrow">
            Brooklyn College &nbsp;·&nbsp; Computer Science
          </p>

          <h1 className="fade-up delay-2 hero-title">
            cisc<br />
            <span className="hero-title-accent">1115</span>
          </h1>

          <div className="fade-up delay-3 cta-group">
            {ctaButtons.map((btn) => (
              <CtaButton key={btn.path} {...btn} />
            ))}
          </div>
        </div>
      </section>

      <div className="home-divider-wrap">
        <hr className="home-divider" />
      </div>

      <section className="home-sections-wrap">
        <p className="fade-up delay-4 home-sections-eyebrow">What's inside</p>

        <div className="fade-up delay-5">
          {sections.map((s) => (
            <SectionRow key={s.path} {...s} />
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;