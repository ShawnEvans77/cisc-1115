import { useState } from "react";
import type { StringExplorerPreset } from "../../types";
import {
  STRING_METHODS,
  javaStringLiteral,
  runStringMethod,
  type CellMark,
  type StringMethodId,
  type StringOutcome,
} from "../../utils/stringMethods";
import { cx } from "../../utils/ui";
import { ContentBlock } from "../ui/ContentBlock";

type StringExplorerProps = StringExplorerPreset;

type CharacterRowProps = {
  label: string;
  text: string;
  marks: (CellMark | null)[];
  pointers?: StringOutcome["pointers"];
  showIndexes?: boolean;
};

const METHOD_GROUPS: { label: string; methods: { id: StringMethodId; label: string }[] }[] = [
  {
    label: "characters",
    methods: [
      { id: "length", label: "length()" },
      { id: "charAt", label: "charAt(i)" },
      { id: "substring1", label: "substring(b)" },
      { id: "substring2", label: "substring(b, e)" },
    ],
  },
  {
    label: "searching",
    methods: [
      { id: "indexOf", label: "indexOf(str)" },
      { id: "indexOfFrom", label: "indexOf(str, from)" },
      { id: "lastIndexOf", label: "lastIndexOf(str)" },
    ],
  },
  {
    label: "comparing",
    methods: [
      { id: "equals", label: "equals(other)" },
      { id: "compareTo", label: "compareTo(other)" },
    ],
  },
  {
    label: "changing",
    methods: [
      { id: "toUpperCase", label: "toUpperCase()" },
      { id: "toLowerCase", label: "toLowerCase()" },
      { id: "split", label: "split(regex)" },
    ],
  },
];

// The arguments each method starts with when it is picked, chosen to show it working.
const DEFAULT_ARGS: Record<StringMethodId, string[]> = {
  length: [],
  charAt: ["4"],
  substring1: ["7"],
  substring2: ["0", "5"],
  indexOf: ["o"],
  indexOfFrom: ["o", "5"],
  lastIndexOf: ["o"],
  equals: ["hello, world"],
  compareTo: ["Help"],
  toUpperCase: [],
  toLowerCase: [],
  split: [", "],
};

const MARK_CLASS: Record<CellMark, string> = {
  pick: "str-cell--pick",
  delim: "str-cell--delim",
  "piece-a": "str-cell--piece-a",
  "piece-b": "str-cell--piece-b",
  differ: "str-cell--differ",
};

// One string drawn as a row of character boxes, with the indexes underneath and an
// extra empty slot at index length, where substring's end and the length point.
function CharacterRow({ label, text, marks, pointers = [], showIndexes = true }: CharacterRowProps) {
  const slots = text.length + 1;
  const pointerAt = (index: number) => pointers.filter(p => p.index === index).map(p => p.label).join(", ");

  return (
    <>
      <tr className="str-row--chars">
        <th scope="row">{label}</th>
        {Array.from({ length: slots }, (_, i) => {
          const ch = text[i];
          const mark = marks[i];
          return (
            <td key={i} className={cx("str-cell", ch === undefined && "str-cell--end", mark && MARK_CLASS[mark])}>
              {ch === " " ? <span className="str-space" aria-label="space">␣</span> : ch}
            </td>
          );
        })}
      </tr>
      {showIndexes && (
        <tr className="str-row--indexes">
          <th scope="row">index</th>
          {Array.from({ length: slots }, (_, i) => <td key={i}>{i}</td>)}
        </tr>
      )}
      {pointers.length > 0 && (
        <tr className="str-row--pointers">
          <th scope="row" />
          {Array.from({ length: slots }, (_, i) => {
            const labelText = pointerAt(i);
            return <td key={i}>{labelText && <span className="str-pointer">▲ {labelText}</span>}</td>;
          })}
        </tr>
      )}
    </>
  );
}

export function StringExplorer({ text: initialText, method: initialMethod, args: initialArgs }: StringExplorerProps) {
  const [text, setText] = useState(initialText);
  const [method, setMethod] = useState(initialMethod);
  const [args, setArgs] = useState(initialArgs);

  const info = STRING_METHODS.find(m => m.id === method)!;
  const outcome = runStringMethod(text, method, args);

  function pick(id: StringMethodId) {
    setMethod(id);
    setArgs(DEFAULT_ARGS[id]);
  }

  function setArg(index: number, value: string) {
    setArgs(current => info.params.map((_, i) => (i === index ? value : current[i] ?? "")));
  }

  return (
    <ContentBlock label="String explorer">
      <div className="str">
        <label className="viz-field str-field--text">
          <span className="viz-field-label">String s =</span>
          <span className="str-quoted">
            <span className="str-quote" aria-hidden="true">"</span>
            <input
              className="viz-input"
              value={text}
              onChange={event => setText(event.target.value)}
              spellCheck={false}
              autoComplete="off"
            />
            <span className="str-quote" aria-hidden="true">"</span>
          </span>
        </label>

        <div className="str-methods">
          {METHOD_GROUPS.map(group => (
            <div key={group.label} className="str-method-group" role="group" aria-label={`${group.label} methods`}>
              <span className="viz-field-label">{group.label}</span>
              <div className="str-method-buttons">
                {group.methods.map(m => (
                  <button
                    key={m.id}
                    type="button"
                    className={cx("str-method", m.id === method && "str-method--active")}
                    aria-pressed={m.id === method}
                    onClick={() => pick(m.id)}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {info.params.length > 0 && (
          <div className="str-args">
            {info.params.map((param, i) => (
              <label key={`${method}-${param.name}`} className={cx("viz-field", param.kind === "int" ? "str-field--int" : "str-field--string")}>
                <span className="viz-field-label">{param.kind === "int" ? "int" : "String"} {param.name}</span>
                {param.kind === "int" ? (
                  <input
                    className="viz-input"
                    value={args[i] ?? ""}
                    onChange={event => setArg(i, event.target.value)}
                    inputMode="numeric"
                    spellCheck={false}
                    autoComplete="off"
                  />
                ) : (
                  <span className="str-quoted">
                    <span className="str-quote" aria-hidden="true">"</span>
                    <input
                      className="viz-input"
                      value={args[i] ?? ""}
                      onChange={event => setArg(i, event.target.value)}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    <span className="str-quote" aria-hidden="true">"</span>
                  </span>
                )}
              </label>
            ))}
          </div>
        )}

        {"error" in outcome ? (
          <p className="viz-notice viz-notice--error" role="alert">{outcome.error}</p>
        ) : (
          <>
            <div className="str-call" aria-live="polite">
              <code className="str-call-code">{outcome.call}</code>
              <span className="str-call-arrow" aria-hidden="true">→</span>
              {outcome.exception ? (
                <span className="str-call-result str-call-result--exception">throws {outcome.exception}</span>
              ) : (
                <>
                  <code className="str-call-result">{outcome.result}</code>
                  <span className="str-type">{outcome.type}</span>
                </>
              )}
            </div>

            <div className="str-stage">
              <table className="str-sheet">
                <tbody>
                  <CharacterRow label="s" text={text} marks={outcome.marks} pointers={outcome.pointers} />
                  {outcome.other && (
                    <CharacterRow label="other" text={outcome.other.text} marks={outcome.other.marks} showIndexes={false} />
                  )}
                </tbody>
              </table>
              {text.length === 0 && <p className="str-empty">s is the empty string: it has no characters, and its length is 0.</p>}
            </div>

            {outcome.pieces && (
              <div className="str-pieces">
                <span className="viz-field-label">String[] pieces, length {outcome.pieces.length}</span>
                {outcome.pieces.length === 0 ? (
                  <p className="str-empty">The array is empty.</p>
                ) : (
                  <ol className="str-piece-list">
                    {outcome.pieces.map((piece, i) => (
                      <li key={i} className={cx("str-piece", i % 2 === 0 ? "str-piece--a" : "str-piece--b")}>
                        <span className="str-piece-index">[{i}]</span>
                        <code>{javaStringLiteral(piece)}</code>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            )}

            <p className="str-explanation">{outcome.explanation}</p>
          </>
        )}
      </div>
    </ContentBlock>
  );
}
