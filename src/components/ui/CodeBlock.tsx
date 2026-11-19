import { highlightJava } from "../../utils/highlightJava";
import { cx } from "../../utils/ui";

type CodeBlockProps = {
  code: string;
  language?: "java" | "text";
};

export function CodeBlock({ code, language = "java" }: CodeBlockProps) {
  return (
    <div className={cx("code-scroll-wrapper", language === "text" && "code-scroll-wrapper--text")}>
      <pre>{language === "text" ? code : highlightJava(code)}</pre>
    </div>
  );
}
