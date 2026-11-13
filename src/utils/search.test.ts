import { describe, expect, it } from "vitest";
import {
  collectNestedSearchResults,
  defaultPreview,
  hasQuery,
  normalizeQuery,
  pluralize,
  promptSnippet,
  resultCountLabel,
  searchablePrompt,
  snippetAround,
} from "./search";

describe("query helpers", () => {
  it("normalizes case and surrounding whitespace", () => {
    expect(normalizeQuery("  ArRays ")).toBe("arrays");
    expect(hasQuery("   ")).toBe(false);
    expect(hasQuery(" a ")).toBe(true);
  });
});

describe("labels", () => {
  it("pluralizes by count", () => {
    expect(pluralize(1, "note")).toBe("1 note");
    expect(pluralize(0, "note")).toBe("0 notes");
    expect(pluralize(2, "entry", "entries")).toBe("2 entries");
  });

  it("describes result counts", () => {
    expect(resultCountLabel(0)).toBe("no results");
    expect(resultCountLabel(1)).toBe("1 result");
    expect(resultCountLabel(3)).toBe("3 results");
    expect(resultCountLabel(2, 5, "question")).toBe("2 of 5 questions");
    expect(resultCountLabel(1, 1, "question")).toBe("1 of 1 question");
  });
});

describe("prompt text", () => {
  it("strips block delimiters and inline markup for searching", () => {
    expect(searchablePrompt("a **bold** *it* __u__ [[code]]x[[/code]]")).toBe("a bold it u x");
  });

  it("returns a snippet around the first match, with ellipses where it was cut", () => {
    const text = `${"a".repeat(50)}needle${"b".repeat(70)}`;

    expect(snippetAround(text, "NEEDLE")).toBe(`…${"a".repeat(40)}needle${"b".repeat(60)}…`);
    expect(snippetAround("short needle text", "needle")).toBe("short needle text");
    expect(snippetAround("no match", "needle")).toBeNull();
    expect(snippetAround("anything", "  ")).toBeNull();
  });

  it("finds snippets through markup", () => {
    expect(promptSnippet("use **Math.sqrt** here", "math.sqrt here")).toBe("use Math.sqrt here");
  });

  it("truncates default previews", () => {
    expect(defaultPreview("abc", 5)).toBe("abc");
    expect(defaultPreview("abcdefgh", 5)).toBe("abcde…");
  });
});

describe("collectNestedSearchResults", () => {
  const parents = [
    { name: "fruit", children: ["apple", "pear"] },
    { name: "tools", children: ["hammer", "apple corer"] },
  ];

  const search = (query: string) => collectNestedSearchResults(
    parents,
    parent => parent.children,
    parent => parent.name.includes(query),
    child => child.includes(query),
    parent => `parent:${parent.name}`,
    (parent, child) => `child:${parent.name}/${child}`,
  );

  it("returns matching children across parents", () => {
    expect(search("apple")).toEqual(["child:fruit/apple", "child:tools/apple corer"]);
  });

  it("returns a matching parent once, without its children", () => {
    expect(search("fruit")).toEqual(["parent:fruit"]);
  });
});
