type FinishToggleProps = {
  finished: boolean;
  onToggle: () => void;
};

export function FinishToggle({ finished, onToggle }: FinishToggleProps) {
  return (
    <button
      type="button"
      className={`finish-toggle${finished ? " finish-toggle--finished" : ""}`}
      onClick={onToggle}
      aria-pressed={finished}
      title={finished ? "Mark this question as unfinished" : "Mark this question as finished"}
    >
      {finished ? "Finished" : "Mark as finished"}
    </button>
  );
}
