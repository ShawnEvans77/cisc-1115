import type { ReactElement } from "react";

// Each token type gets a class; the colors are --syntax-* variables in tokens.css,
// so light mode and dark mode (Tokyo Night) each have their own palette.
const TOKEN_CLASS = {
  keyword:     "tok-keyword",
  comment:     "tok-comment",
  string:      "tok-string",
  number:      "tok-number",
  punctuation: "tok-punctuation",
} as const;

const KEYWORDS = new Set([
  "public", "private", "protected", "class", "static", "void", "int", "long",
  "double", "float", "boolean", "char", "String", "new", "return", "if", "else",
  "for", "while", "do", "switch", "case", "break", "continue", "import", "package",
  "null", "true", "false", "this", "super", "extends", "implements", "interface",
  "final", "abstract", "try", "catch", "finally", "throw", "throws", "instanceof",
]);

const PUNCTUATION = /[{}()[\];,.]/;

export function highlightJava(code: string): ReactElement[] {
  return code.split("\n").map((line, li) => {
    const tokens: ReactElement[] = [];
    let i = 0;

    while (i < line.length) {
      // Line comment
      if (line[i] === "/" && line[i + 1] === "/") {
        tokens.push(<span key={i} className={TOKEN_CLASS.comment}>{line.slice(i)}</span>);
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
        tokens.push(<span key={i} className={TOKEN_CLASS.string}>{line.slice(i, j)}</span>);
        i = j;
        continue;
      }

      // Number
      if (/[0-9]/.test(line[i])) {
        let j = i;
        while (j < line.length && /[0-9.]/.test(line[j])) j++;
        tokens.push(<span key={i} className={TOKEN_CLASS.number}>{line.slice(i, j)}</span>);
        i = j;
        continue;
      }

      // Word / keyword
      if (/[a-zA-Z_]/.test(line[i])) {
        let j = i;
        while (j < line.length && /[a-zA-Z0-9_]/.test(line[j])) j++;
        const word = line.slice(i, j);
        tokens.push(
          <span key={i} className={KEYWORDS.has(word) ? TOKEN_CLASS.keyword : undefined}>
            {word}
          </span>
        );
        i = j;
        continue;
      }

      // Punctuation
      if (PUNCTUATION.test(line[i])) {
        tokens.push(<span key={i} className={TOKEN_CLASS.punctuation}>{line[i]}</span>);
        i++;
        continue;
      }

      tokens.push(<span key={i}>{line[i]}</span>);
      i++;
    }

    return <div key={li} className="code-line">{tokens}</div>;
  });
}
