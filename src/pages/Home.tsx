import { Link } from "react-router-dom";

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

const DIGIT_CYCLE = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

type HeroLineProps = {
  position: "top" | "bottom";
};

function HeroLine({ position }: HeroLineProps) {
  return (
    <div className="hero-line" data-position={position}>
      <span className="hero-line-spark" />
    </div>
  );
}

type HeroWordProps = {
  word: string;
};

function HeroWord({ word }: HeroWordProps) {
  return (
    <span className="hero-word" aria-hidden="true">
      {[...word].map((char, i) => (
        <span key={i} className="hero-char">{char}</span>
      ))}
    </span>
  );
}

type HeroDigitsProps = {
  digits: string;
};

function HeroDigits({ digits }: HeroDigitsProps) {
  return (
    <span className="hero-word hero-title-accent" aria-hidden="true">
      {[...digits].map((digit, i) => (
        <span key={i} className="hero-digit">
          <span className="hero-digit-size">{digit}</span>
          <span className="hero-digit-strip">
            {[...DIGIT_CYCLE, digit].map((cell, j) => (
              <span key={j} className="hero-digit-cell">{cell}</span>
            ))}
          </span>
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
  return (
    <div className="home-root">

      <section className="hero-section">
        <div className="hero-grid-bg" />
        <div className="hero-glow" />
        <HeroLine position="top" />
        <HeroLine position="bottom" />

        <div className="hero-content">
          <h1 className="hero-title" aria-label="cisc 1115">
            <HeroWord word="cisc" />
            <br />
            <HeroDigits digits="1115" />
          </h1>

          <span className="hero-rule" />

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
        <div className="home-sections">
          {sections.map((s) => (
            <SectionRow key={s.path} {...s} />
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;