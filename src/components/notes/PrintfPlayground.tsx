import { useMemo, useState } from "react";
import type { PrintfPreset } from "../../types";
import { runPrintf, type PrintfSegment } from "../../utils/javaPrintf";
import { cx } from "../../utils/ui";
import { ContentBlock } from "../ui/ContentBlock";

type PrintfPlaygroundProps = PrintfPreset;

type OutputLinesProps = {
  segments: PrintfSegment[];
};

const EXAMPLES: { label: string; format: string; args: string }[] = [
  { label: "Table row", format: "%-10s%8.2f%n", args: "\"Coffee\", 3.5" },
  { label: "Money", format: "Total: $%,.2f%n", args: "1234567.891" },
  { label: "Rounding", format: "%.2f and %.0f%n", args: "2.675, 0.5" },
  { label: "Padding ints", format: "[%5d] [%-5d] [%05d]%n", args: "42, 42, 42" },
  { label: "Too narrow", format: "[%3d]%n", args: "123456" },
  { label: "Wrong type", format: "%d%n", args: "3.5" },
];

// One color per specifier, cycling, so each piece of output matches its row below.
const SEGMENT_COLORS = 4;

type OutputCell = { ch: string; segment: number | null };

// Splits the output into lines of single characters, remembering which specifier
// printed each one, so spaces can be drawn as dots and every column lines up.
function toLines(segments: PrintfSegment[]): OutputCell[][] {
  const lines: OutputCell[][] = [[]];
  let specNumber = 0;
  for (const segment of segments) {
    const text = segment.kind === "text" ? segment.text : segment.output;
    const owner = segment.kind === "spec" ? specNumber++ : null;
    for (const ch of text) {
      if (ch === "\n") lines.push([]);
      else lines[lines.length - 1].push({ ch, segment: owner });
    }
  }
  if (lines.length > 1 && lines[lines.length - 1].length === 0) lines.pop();
  return lines;
}

function OutputLines({ segments }: OutputLinesProps) {
  const lines = toLines(segments);

  return (
    <div className="printf-output">
      {lines.map((line, i) => (
        <div key={i} className="printf-line">
          {line.length === 0 ? <span className="printf-empty">(empty line)</span> : line.map((cell, k) => (
            <span
              key={k}
              className={cx(
                "printf-char",
                cell.ch === " " && "printf-char--space",
                cell.segment !== null && `printf-seg printf-seg--${cell.segment % SEGMENT_COLORS}`,
              )}
            >
              {cell.ch === " " ? "·" : cell.ch}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function shownOutput(text: string): string {
  if (text === "\n") return "line break";
  return `"${text.replace(/ /g, "·")}"`;
}

export function PrintfPlayground({ format: initialFormat, args: initialArgs }: PrintfPlaygroundProps) {
  const [format, setFormat] = useState(initialFormat);
  const [args, setArgs] = useState(initialArgs);
  const result = useMemo(() => runPrintf(format, args), [format, args]);

  const specs = result.kind === "output"
    ? result.segments.flatMap(segment => (segment.kind === "spec" ? [segment] : []))
    : [];
  const argList = args.trim() === "" ? "" : `, ${args.trim()}`;

  return (
    <ContentBlock label="printf playground">
      <div className="printf">
        <div className="printf-examples" role="group" aria-label="Examples">
          <span className="viz-field-label">try</span>
          {EXAMPLES.map(example => (
            <button
              key={example.label}
              type="button"
              className={cx("str-method", example.format === format && example.args === args && "str-method--active")}
              onClick={() => {
                setFormat(example.format);
                setArgs(example.args);
              }}
            >
              {example.label}
            </button>
          ))}
        </div>

        <div className="printf-inputs">
          <label className="viz-field printf-field--format">
            <span className="viz-field-label">format string</span>
            <span className="str-quoted">
              <span className="str-quote" aria-hidden="true">"</span>
              <input
                className="viz-input"
                value={format}
                onChange={event => setFormat(event.target.value)}
                spellCheck={false}
                autoComplete="off"
              />
              <span className="str-quote" aria-hidden="true">"</span>
            </span>
          </label>
          <label className="viz-field printf-field--args">
            <span className="viz-field-label">arguments, separated by commas</span>
            <input
              className="viz-input"
              value={args}
              onChange={event => setArgs(event.target.value)}
              spellCheck={false}
              autoComplete="off"
            />
          </label>
        </div>

        <code className="printf-code">System.out.printf("{format}"{argList});</code>

        {result.kind === "error" && <p className="viz-notice viz-notice--error" role="alert">{result.message}</p>}
        {result.kind === "unsupported" && <p className="viz-notice" role="status">{result.message}</p>}

        {result.kind === "exception" && (
          <div className="printf-exception" role="alert">
            <p className="printf-exception-name">Java throws {result.exception}</p>
            <code className="printf-exception-message">{result.exception}: {result.message}</code>
            <p className="printf-explanation">{result.explanation}</p>
            <p className="printf-explanation printf-before">
              {result.printedBefore
                ? "System.out.printf prints everything before the problem, then stops:"
                : "Java checks the whole format string before printing, so nothing is printed."}
            </p>
            {result.printedBefore && <OutputLines segments={[{ kind: "text", text: result.printedBefore }]} />}
          </div>
        )}

        {result.kind === "output" && format === "" && args.trim() === "" && (
          <p className="viz-notice">Type a format string and its arguments, or pick an example above.</p>
        )}

        {result.kind === "output" && (format !== "" || args.trim() !== "") && (
          <>
            <p className="viz-field-label printf-label">output, with each space drawn as ·</p>
            <OutputLines segments={result.segments} />

            {specs.length > 0 && (
              <div className="content-table-wrap">
                <table className="content-table printf-table">
                  <thead>
                    <tr>
                      <th>Specifier</th>
                      <th>Argument</th>
                      <th>Prints</th>
                      <th>Why</th>
                    </tr>
                  </thead>
                  <tbody>
                    {specs.map((spec, i) => (
                      <tr key={i}>
                        <td>
                          <span className={cx("printf-swatch", `printf-seg--${i % SEGMENT_COLORS}`)} />
                          {spec.spec.raw}
                        </td>
                        <td>{spec.argument ?? "none"}</td>
                        <td className="printf-prints">{shownOutput(spec.output)}</td>
                        <td className="printf-why">{spec.explanation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {result.extraArgs > 0 && (
              <p className="viz-notice">
                {result.extraArgs === 1 ? "There is 1 more argument than specifiers. Java ignores it." : `There are ${result.extraArgs} more arguments than specifiers. Java ignores them.`}
              </p>
            )}
          </>
        )}
      </div>
    </ContentBlock>
  );
}

