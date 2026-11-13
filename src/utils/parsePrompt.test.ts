import { describe, expect, it } from "vitest";
import { parsePrompt, stripPromptDelimiters } from "./parsePrompt";

describe("parsePrompt", () => {
  it("returns plain prose as a single text segment", () => {
    expect(parsePrompt("just prose")).toEqual([{ type: "text", content: "just prose" }]);
  });

  it("splits prose, code blocks, and text blocks in order", () => {
    const raw = "before[[code]]int x = 1;[[/code]]middle[[text]]1 2 3[[/text]]after";

    expect(parsePrompt(raw)).toEqual([
      { type: "text", content: "before" },
      { type: "code", content: "int x = 1;" },
      { type: "text", content: "middle" },
      { type: "text-block", content: "1 2 3" },
      { type: "text", content: "after" },
    ]);
  });

  it("keeps newlines inside blocks and drops empty segments", () => {
    expect(parsePrompt("[[code]]a\nb[[/code]][[text]][[/text]]")).toEqual([
      { type: "code", content: "a\nb" },
    ]);
  });
});

describe("stripPromptDelimiters", () => {
  it("removes block delimiters and keeps their content", () => {
    expect(stripPromptDelimiters("a [[code]]b[[/code]] [[text]]c[[/text]]")).toBe("a b c");
  });
});
