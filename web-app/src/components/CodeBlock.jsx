import { useState } from "react";

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="code-wrapper">
      <button className={`code-copy ${copied ? "code-copy--done" : ""}`} onClick={handleCopy}>
        {copied ? "✓ تم النسخ" : "نسخ"}
      </button>
      <pre className="block-code">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default CodeBlock;
