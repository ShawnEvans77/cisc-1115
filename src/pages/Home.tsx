import { useState, useEffect, type PointerEvent } from "react";
import { Link } from "react-router-dom";
import { cx } from "../utils/ui";

type Section = {
  label: string;
  path: string;
  description?: string;
};

const sections: Section[] = [
  { label: "exams",     path: "/exams",     description: "raw exams from previous semesters" },
  { label: "questions", path: "/questions", description: "past exam questions" },
  { label: "solutions", path: "/solutions", description: "past exam questions with fully commented, step-by-step solutions" },
  { label: "notes",     path: "/notes",     description: "examples of important algorithms" },
  { label: "contact",   path: "/contact" },
];

const ctaButtons = [
  { label: "exams",     path: "/exams",     variant: "syrup"   },
  { label: "questions", path: "/questions", variant: "green"   },
  { label: "solutions", path: "/solutions", variant: "orange"  },
  { label: "notes",     path: "/notes",     variant: "neutral" },
];

type SplitWordProps = {
  text: string;
  className?: string;
};

function SplitWord({ text, className }: SplitWordProps) {
  return (
    <span className={cx("hero-split", className)} aria-hidden="true">
      {[...text].map((char, i) => (
        <span key={i} className="hero-split-mask">
          <span className="hero-split-char">{char}</span>
        </span>
      ))}
    </span>
  );
}

function CtaButton({ label, path, variant }: { label: string; path: string; variant: string }) {
  return (
    <Link to={path} className={`cta-btn cta-btn--${variant}`}>
      {label}
    </Link>
  );
}

function SectionRow({ label, description, path }: Section) {
  return (
    <Link to={path} className="home-card-link">
      <div className="home-card-grid">
        <div>
          <h2 className="home-card-label">{label}</h2>
          {description && <p className="home-card-desc">{description}</p>}
        </div>
        <span className="home-card-arrow">→</span>
      </div>
    </Link>
  );
}

function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div className="home-root">

      <section className={cx("hero-section", loaded && "is-loaded")} onPointerMove={onPointerMove}>
        <div className="hero-aurora" aria-hidden="true">
          <span className="hero-blob hero-blob--warm" />
          <span className="hero-blob hero-blob--cool" />
        </div>
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="hero-grid-spot" aria-hidden="true" />
        <div className="hero-line hero-line--top" aria-hidden="true" />
        <div className="hero-line hero-line--bottom" aria-hidden="true" />

        <div className="hero-content">
          <h1 className="hero-title" aria-label="cisc 1115">
            <SplitWord text="cisc" />
            <SplitWord text="1115" className="hero-title-accent" />
          </h1>

          <div className="cta-group">
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
        <div className="fade-up delay-4">
          {sections.map((s) => (
            <SectionRow key={s.path} {...s} />
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;