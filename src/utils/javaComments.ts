// Removes // and /* */ comments from Java source.
//   - Comment markers inside "strings" and 'c'har literals are left alone.
//   - A line that held only a comment is dropped.
//   - A line that ended with a comment keeps its code, minus trailing spaces.
//   - Runs of blank lines left behind collapse to one, and blank lines at the
//     start and end are trimmed.
export function stripJavaComments(code: string): string {
  let out = "";
  let line = 0;
  const lineHadComment = new Set<number>();

  let i = 0;
  while (i < code.length) {
    const c = code[i];
    const next = code[i + 1];

    if (c === "/" && next === "/") {
      lineHadComment.add(line);
      while (i < code.length && code[i] !== "\n") i++;
      continue;
    }

    if (c === "/" && next === "*") {
      lineHadComment.add(line);
      i += 2;
      while (i < code.length && !(code[i] === "*" && code[i + 1] === "/")) {
        // keep the line breaks so line numbers still line up
        if (code[i] === "\n") {
          out += "\n";
          line++;
          lineHadComment.add(line);
        }
        i++;
      }
      i += 2;
      continue;
    }

    if (c === '"' || c === "'") {
      // copy the whole literal, escapes included
      out += c;
      i++;
      while (i < code.length && code[i] !== c && code[i] !== "\n") {
        if (code[i] === "\\" && i + 1 < code.length) {
          out += code[i] + code[i + 1];
          i += 2;
          continue;
        }
        out += code[i];
        i++;
      }
      if (i < code.length && code[i] === c) {
        out += c;
        i++;
      }
      continue;
    }

    if (c === "\n") line++;
    out += c;
    i++;
  }

  const kept: string[] = [];
  out.split("\n").forEach((text, n) => {
    if (!lineHadComment.has(n)) {
      kept.push(text);
    } else if (text.trim() !== "") {
      kept.push(text.trimEnd());
    }
  });

  const collapsed = kept.filter((text, n) => !(text.trim() === "" && n > 0 && kept[n - 1].trim() === ""));

  while (collapsed.length > 0 && collapsed[0].trim() === "") collapsed.shift();
  while (collapsed.length > 0 && collapsed[collapsed.length - 1].trim() === "") collapsed.pop();

  return collapsed.join("\n");
}

export function hasJavaComments(code: string): boolean {
  return stripJavaComments(code) !== code;
}
