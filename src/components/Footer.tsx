import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1.5px solid #E8E3DC",
        backgroundColor: "#FAFAF8",
        padding: "2rem 2.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      {/* Logo */}
      <span
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.1rem",
          fontWeight: 700,
          color: "#E07B00",
        }}
      >
        cisc 1115
      </span>

      {/* Center text */}
      <p
        style={{
          fontFamily: "'Lora', serif",
          fontSize: "0.88rem",
          fontStyle: "italic",
          color: "#9E8A80",
          margin: 0,
        }}
      >
        a study resource for Brooklyn College CISC 1115 students
      </p>

      {/* Contribute link */}
      <Link
        to="/contact"
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.75rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#E07B00",
          textDecoration: "none",
        }}
        onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
        onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
      >
        contribute →
      </Link>
    </footer>
  );
}

export default Footer;