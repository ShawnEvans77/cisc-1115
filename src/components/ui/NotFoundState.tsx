import { Link } from "react-router-dom";

type NotFoundStateProps = {
  title: string;
  backTo: string;
  backLabel: string;
};

export function NotFoundState({ title, backTo, backLabel }: NotFoundStateProps) {
  return (
    <div className="page-root not-found-center">
      <div className="not-found-content">
        <p className="page-eyebrow">404</p>
        <h1 className="not-found-title">{title}</h1>
        <Link to={backTo} className="back-link">{backLabel}</Link>
      </div>
    </div>
  );
}
