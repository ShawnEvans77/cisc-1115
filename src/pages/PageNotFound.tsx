// src/pages/PageNotFound.tsx
import { Link, useLocation } from "react-router-dom";

function PageNotFound() {
  const location = useLocation();

  return (
    <div className="not-found-root">
      <div className="hero-grid-bg" />

      <div className="not-found-inner">
        <p className="not-found-code">404</p>

        <h1 className="not-found-heading">
          page not<br />
          <span className="not-found-heading-italic">found</span>
        </h1>

        <p className="not-found-path">{location.pathname}</p>

        <p className="not-found-message">
          This page doesn't exist or was moved.
        </p>

        <Link to="/" className="not-found-btn">← back home</Link>
      </div>
    </div>
  );
}

export default PageNotFound;