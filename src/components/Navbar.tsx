// src/components/Navbar.tsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

const centerLinks = [
  { label: "exams",     path: "/exams" },
  { label: "questions", path: "/questions" },
  { label: "solutions", path: "/solutions" },
  { label: "notes",     path: "/notes" },
];

const allLinks = [...centerLinks, { label: "contact", path: "/contact" }];

function Navbar() {
  const location  = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <>
      <nav className="navbar">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          cisc 1115
        </Link>

        {/* Desktop — center links */}
        <div className="navbar-center">
          {centerLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar-link ${isActive(link.path) ? "navbar-link--active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop — right side */}
        <div className="navbar-right">
          <ThemeToggle />
          <Link
            to="/contact"
            className={`navbar-link ${isActive("/contact") ? "navbar-link--active" : ""}`}
          >
            contact
          </Link>
        </div>

        {/* Mobile — hamburger */}
        <button
          className="navbar-mobile-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕ close" : "☰ menu"}
        </button>

      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="navbar-mobile-menu">
          {allLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar-mobile-link ${isActive(link.path) ? "navbar-mobile-link--active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="navbar-mobile-theme">
            <ThemeToggle />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;