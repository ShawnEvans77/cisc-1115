// src/components/Footer.tsx
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <span className="footer-logo">cisc 1115</span>

      <p className="footer-tagline">
        a study resource for brooklyn college cisc 1115 students
      </p>

      <Link to="/contact" className="footer-contribute">
        contribute →
      </Link>
    </footer>
  );
}

export default Footer;