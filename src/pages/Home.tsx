import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HeroSort } from "../components/home/HeroSort";
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

function HeroLine({ position }: { position: "top" | "bottom" }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={cx("hero-line", loaded && "hero-line--loaded")}
      data-position={position}
    />
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
  return (
    <div className="home-root">

      <section className="hero-section">
        <div className="hero-grid-bg" />
        <HeroLine position="top" />
        <HeroLine position="bottom" />

        <div className="hero-content">
          <h1 className="fade-up delay-1 hero-title">
            cisc<br />
            <span className="hero-title-accent">1115</span>
          </h1>

          <div className="fade-up delay-2">
            <HeroSort />
          </div>

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