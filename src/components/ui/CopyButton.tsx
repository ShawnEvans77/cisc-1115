import { useState } from "react";

type CopyButtonProps = {
  content: string;
  idleLabel?: string;
  copiedLabel?: string;
};

export function CopyButton({
  content,
  idleLabel = "Copy code",
  copiedLabel = "✓ Copied!",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button onClick={handleCopy} className={`copy-btn${copied ? " copied" : ""}`}>
      {copied ? copiedLabel : idleLabel}
    </button>
  );
}
