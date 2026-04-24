import type { FinishedFilter } from "../../hooks/useFinishedQuestions";

type ProgressFilterControlsProps = {
  value: FinishedFilter;
  onChange: (value: FinishedFilter) => void;
};

const filters: Array<{ value: FinishedFilter; label: string }> = [
  { value: "all", label: "All" },
  { value: "unfinished", label: "Unfinished" },
  { value: "finished", label: "Finished" },
];

export function ProgressFilterControls({ value, onChange }: ProgressFilterControlsProps) {
  return (
    <div className="progress-filter" role="group" aria-label="Filter questions by completion progress">
      {filters.map(filter => (
        <button
          key={filter.value}
          type="button"
          className={`progress-filter-btn${value === filter.value ? " progress-filter-btn--active" : ""}`}
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
