import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const centerLinks = [
  { label: "exams", path: "/exams" },
  { label: "questions", path: "/questions"},
  { label: "solutions", path: "/solutions" },
  { label: "notes", path: "/notes" },
];

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname.startsWith(path);

  const baseLinkStyle = (path: string): React.CSSProperties => ({
    fontFamily: "'DM Mono', monospace",
    fontSize: "1rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: isActive(path) ? "#1A1208" : "rgba(255,255,255,0.88)",
    backgroundColor: isActive(path) ? "rgba(0,0,0,0.15)" : "transparent",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    padding: "0 1.6rem",
    height: "100%",
    transition: "background 0.15s, color 0.15s",
  });

  const hoverOn = (e: React.MouseEvent, path: string) => {
    if (!isActive(path))
      (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(0,0,0,0.08)";
  };

  const hoverOff = (e: React.MouseEvent, path: string) => {
    if (!isActive(path))
      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
  };

  const allLinks = [...centerLinks, { label: "contact", path: "/contact" }];

  return (
    <>
      <style>{`
        .nav-desktop {
          display: flex;
        }
        .nav-mobile-btn {
          display: none;
        }
        .nav-mobile-menu {
          display: none;
        }

        @media (max-width: 640px) {
          .nav-desktop {
            display: none;
          }
          .nav-mobile-btn {
            display: flex;
            align-items: center;
            margin-left: auto;
            padding: 0 1.5rem;
            background: none;
            border: none;
            cursor: pointer;
            color: white;
            font-family: 'DM Mono', monospace;
            font-size: 0.85rem;
            letter-spacing: 0.08em;
            height: 100%;
          }
          .nav-mobile-menu {
            display: flex;
            flex-direction: column;
            background-color: #C96E00;
          }
          .nav-mobile-menu a {
            font-family: 'DM Mono', monospace;
            font-size: 0.88rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.9);
            text-decoration: none;
            padding: 1rem 1.5rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            transition: background 0.15s;
          }
          .nav-mobile-menu a:hover {
            background-color: rgba(0,0,0,0.1);
          }
          .nav-mobile-menu a.active {
            color: #1A1208;
            background-color: rgba(0,0,0,0.15);
          }
        }
      `}</style>

      <nav
        style={{
          backgroundColor: "#E07B00",
          width: "100%",
          display: "flex",
          alignItems: "stretch",
          height: "58px",
          position: "relative",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "1rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#FFFFFF",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            padding: "0 2rem",
            flexShrink: 0,
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          cisc 1115
        </Link>

        {/* Desktop — center links */}
        <div
          className="nav-desktop"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            alignItems: "stretch",
            height: "100%",
          }}
        >
          {centerLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={baseLinkStyle(link.path)}
              onMouseEnter={(e) => hoverOn(e, link.path)}
              onMouseLeave={(e) => hoverOff(e, link.path)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop — contact right */}
        <div
          className="nav-desktop"
          style={{ marginLeft: "auto", alignItems: "stretch" }}
        >
          <Link
            to="/contact"
            style={baseLinkStyle("/contact")}
            onMouseEnter={(e) => hoverOn(e, "/contact")}
            onMouseLeave={(e) => hoverOff(e, "/contact")}
          >
            contact
          </Link>
        </div>

        {/* Mobile — hamburger */}
        <button
          className="nav-mobile-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕ close" : "☰ menu"}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="nav-mobile-menu">
          {allLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={isActive(link.path) ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default Navbar;