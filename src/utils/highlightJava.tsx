// src/utils/highlightJava.tsx
import React from "react";

// ── Syntax color tokens ───────────────────────────────────────────────────────
// These are code-specific colors, separate from the UI design tokens.
// Inline styles are intentional here — each token type gets a unique color
// and there are too many per-character spans to manage via classnames.

const syntaxColors = {
  keyword:     { color: "#E07B00", fontWeight: 600 }, // orange — matches site accent
  comment:     { color: "#9E8A80", fontStyle: "italic" as const },
  string:      { color: "#B07D3A" },                  // warm amber
  number:      { color: "#6B8E6B" },                  // muted green
  punctuation: { color: "#8A7570" },                  // warm grey
} as const;

const KEYWORDS = new Set([
  "public", "private", "protected", "class", "static", "void", "int", "long",
  "double", "float", "boolean", "char", "String", "new", "return", "if", "else",
  "for", "while", "do", "switch", "case", "break", "continue", "import", "package",
  "null", "true", "false", "this", "super", "extends", "implements", "interface",
  "final", "abstract", "try", "catch", "finally", "throw", "throws", "instanceof",
]);

const PUNCTUATION = /[{}()[\];,.]/;

export function highlightJava(code: string): React.ReactElement[] {
  return code.split("\n").map((line, li) => {
    const tokens: React.ReactElement[] = [];
    let i = 0;

    while (i < line.length) {
      // Line comment
      if (line[i] === "/" && line[i + 1] === "/") {
        tokens.push(<span key={i} style={syntaxColors.comment}>{line.slice(i)}</span>);
        break;
      }

      // String literal
      if (line[i] === '"') {
        let j = i + 1;
        while (j < line.length && line[j] !== '"') {
          if (line[j] === "\\") j++;
          j++;
        }
        j++;
        tokens.push(<span key={i} style={syntaxColors.string}>{line.slice(i, j)}</span>);
        i = j;
        continue;
      }

      // Number
      if (/[0-9]/.test(line[i])) {
        let j = i;
        while (j < line.length && /[0-9.]/.test(line[j])) j++;
        tokens.push(<span key={i} style={syntaxColors.number}>{line.slice(i, j)}</span>);
        i = j;
        continue;
      }

      // Word / keyword
      if (/[a-zA-Z_]/.test(line[i])) {
        let j = i;
        while (j < line.length && /[a-zA-Z0-9_]/.test(line[j])) j++;
        const word = line.slice(i, j);
        tokens.push(
          <span key={i} style={KEYWORDS.has(word) ? syntaxColors.keyword : undefined}>
            {word}
          </span>
        );
        i = j;
        continue;
      }

      // Punctuation
      if (PUNCTUATION.test(line[i])) {
        tokens.push(<span key={i} style={syntaxColors.punctuation}>{line[i]}</span>);
        i++;
        continue;
      }

      tokens.push(<span key={i}>{line[i]}</span>);
      i++;
    }

    return <div key={li} className="code-line">{tokens}</div>;
  });
}