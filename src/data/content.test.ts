// Guards the hand-written content in src/data. Run after adding or editing an
// exam, a question, a note, or an exam PDF.
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { parsePrompt, parseTable } from "../utils/parsePrompt";
import { examPdfs } from "./examPdfs";
import { exams } from "./exams";
import { notes } from "./notes";

// Ids become URL segments and localStorage keys.
const ID_PATTERN = /^[a-z0-9-]+$/;

function expectUnique(values: string[], what: string) {
  const duplicates = values.filter((value, i) => values.indexOf(value) !== i);
  expect(duplicates, `duplicate ${what}`).toEqual([]);
}

function expectValidIds(ids: string[], what: string) {
  expectUnique(ids, what);
  for (const id of ids) expect(id, `${what} "${id}"`).toMatch(ID_PATTERN);
}

function count(text: string, token: string): number {
  return text.split(token).length - 1;
}

function expectBalancedBlocks(text: string, where: string) {
  for (const block of ["code", "text", "table"]) {
    expect(count(text, `[[${block}]]`), `unbalanced [[${block}]] in ${where}`).toBe(count(text, `[[/${block}]]`));
  }
}

// An odd number of "*" or "__" on a prose line leaves a marker unpaired, so part of
// the line renders in the wrong style. Put arithmetic like a * b in a [[code]] block.
function expectPairedInlineMarkup(line: string, where: string) {
  expect(count(line, "**") % 2, `unpaired ** in ${where}: ${line}`).toBe(0);
  expect(count(line.replaceAll("**", ""), "*") % 2, `unpaired * in ${where}: ${line}`).toBe(0);
  expect(count(line, "__") % 2, `unpaired __ in ${where}: ${line}`).toBe(0);
}

// Checks everything PromptBody renders: block delimiters, table shapes, and inline markup.
function expectValidMarkup(text: string, where: string) {
  expectBalancedBlocks(text, where);

  for (const segment of parsePrompt(text)) {
    if (segment.type === "table") {
      const [header, ...rows] = parseTable(segment.content);
      expect(rows.length, `table without rows in ${where}`).toBeGreaterThan(0);

      for (const row of rows) {
        expect(row.length, `table row "${row.join(" | ")}" in ${where} has the wrong number of cells`).toBe(header.length);
      }
      for (const cell of [...header, ...rows.flat()]) expectPairedInlineMarkup(cell, where);
    }

    if (segment.type === "text") {
      for (const line of segment.content.split("\n")) expectPairedInlineMarkup(line, where);
    }
  }
}

describe("exams", () => {
  it("has unique, URL-safe exam ids", () => {
    expectValidIds(exams.map(exam => exam.id), "exam id");
  });

  for (const exam of exams) {
    describe(exam.id, () => {
      it("has unique, URL-safe question ids", () => {
        expect(exam.questions.length).toBeGreaterThan(0);
        expectValidIds(exam.questions.map(question => question.id), "question id");
      });

      it("has complete questions with valid markup", () => {
        for (const question of exam.questions) {
          const where = `${exam.id}/${question.id}`;

          for (const field of ["title", "prompt", "explanation", "solution"] as const) {
            expect(question[field].trim(), `${where} ${field} is empty`).not.toBe("");
          }
          expect(question.topics.length, `${where} has no topics`).toBeGreaterThan(0);
          expectUnique(question.topics, `topic in ${where}`);
          expectValidMarkup(question.prompt, `${where} prompt`);
          expectValidMarkup(question.explanation, `${where} explanation`);

          if (question.solutionType === "text") {
            expectValidMarkup(question.solution, `${where} solution`);
          } else {
            expect(question.solution, `${where} is a Java solution but contains [[ markup`).not.toContain("[[");
          }
        }
      });
    });
  }
});

describe("exam PDFs", () => {
  it("has unique ids and points at files that exist in public/", () => {
    expectValidIds(examPdfs.map(pdf => pdf.id), "exam pdf id");

    for (const pdf of examPdfs) {
      expect(existsSync(join(process.cwd(), "public", pdf.pdf)), `missing file for ${pdf.pdf}`).toBe(true);
    }
  });

  it("uses the same id as the matching exam", () => {
    const pdfIds = new Set(examPdfs.map(pdf => pdf.id));
    for (const exam of exams) expect(pdfIds, `no PDF entry for exam ${exam.id}`).toContain(exam.id);
  });
});

describe("notes", () => {
  it("has unique, URL-safe topic ids", () => {
    expectValidIds(notes.map(topic => topic.id), "topic id");
  });

  for (const topic of notes) {
    it(`${topic.id} has unique, complete entries`, () => {
      expect(topic.entries.length).toBeGreaterThan(0);
      expectValidIds(topic.entries.map(entry => entry.id), "note id");

      for (const entry of topic.entries) {
        const where = `${topic.id}/${entry.id}`;

        expect(entry.title.trim(), `${where} title is empty`).not.toBe("");
        expect(entry.sections.length, `${where} has no sections`).toBeGreaterThan(0);
        expectUnique(entry.tags, `tag in ${where}`);

        for (const section of entry.sections) {
          expect(section.content.trim(), `${where} "${section.label}" is empty`).not.toBe("");
          if (section.type === "text") expectValidMarkup(section.content, `${where} "${section.label}"`);
        }
      }
    });
  }
});
