import { highlightJava } from "../../utils/highlightJava";

type CodeBlockProps = {
  code: string;
  language?: "java" | "text";
};

export function CodeBlock({ code, language = "java" }: CodeBlockProps) {
  return (
    <div className="code-scroll-wrapper">
      <pre>{language === "text" ? code : highlightJava(code)}</pre>
    </div>
  );
}
