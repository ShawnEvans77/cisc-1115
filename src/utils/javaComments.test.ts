import { describe, expect, it } from "vitest";
import { hasJavaComments, stripJavaComments } from "./javaComments";

describe("stripJavaComments", () => {
  it("drops lines that only hold a comment", () => {
    const code = [
      "int x = 1;",
      "    // explain y",
      "    int y = 2;",
    ].join("\n");

    expect(stripJavaComments(code)).toBe("int x = 1;\n    int y = 2;");
  });

  it("keeps code before an end-of-line comment and trims what is left", () => {
    expect(stripJavaComments("int x = 1;   // one\nx++;")).toBe("int x = 1;\nx++;");
  });

  it("removes block comments, including ones that span lines", () => {
    const code = [
      "/* header",
      "   more header */",
      "int a = /* inline */ 5;",
      "int b = 6;",
    ].join("\n");

    expect(stripJavaComments(code)).toBe("int a =  5;\nint b = 6;");
  });

  it("leaves comment markers inside strings and chars alone", () => {
    const code = [
      'String url = "http://example.com"; // site',
      'String s = "a /* b */ c";',
      "char slash = '/';",
      'String q = "say \\"// hi\\""; // quote',
      "char quote = '\\'';",
    ].join("\n");

    expect(stripJavaComments(code)).toBe([
      'String url = "http://example.com";',
      'String s = "a /* b */ c";',
      "char slash = '/';",
      'String q = "say \\"// hi\\"";',
      "char quote = '\\'';",
    ].join("\n"));
  });

  it("leaves division alone", () => {
    expect(stripJavaComments("double r = (a / b) / 2.0;")).toBe("double r = (a / b) / 2.0;");
  });

  it("keeps existing blank lines but collapses the gaps comments leave behind", () => {
    const code = [
      "public class A {",
      "",
      "    // first",
      "",
      "    int x = 1;",
      "",
      "    // second",
      "    int y = 2;",
      "}",
    ].join("\n");

    expect(stripJavaComments(code)).toBe([
      "public class A {",
      "",
      "    int x = 1;",
      "",
      "    int y = 2;",
      "}",
    ].join("\n"));
  });

  it("trims blank lines left at the start and end", () => {
    expect(stripJavaComments("// top\n\nint x = 1;\n\n// bottom")).toBe("int x = 1;");
  });

  it("returns code without comments unchanged", () => {
    const code = "int x = 1;\n\nint y = x / 2;";
    expect(stripJavaComments(code)).toBe(code);
  });
});

describe("hasJavaComments", () => {
  it("is true only when there is something to remove", () => {
    expect(hasJavaComments("int x = 1; // one")).toBe(true);
    expect(hasJavaComments("/* a */ int x;")).toBe(true);
    expect(hasJavaComments('String s = "// not a comment";')).toBe(false);
  });
});
