import { useState } from "react";
import { useLang } from "../context/LangContext";

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const { lang } = useLang();

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const label     = lang === "ar" ? "نسخ"    : "Copy";
  const doneLabel = lang === "ar" ? "✓ تم النسخ" : "✓ Copied";

  return (
    <div className="code-wrapper">
      <button className={`code-copy ${copied ? "code-copy--done" : ""}`} onClick={handleCopy}>
        {copied ? doneLabel : label}
      </button>
      <pre className="block-code">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default CodeBlock;
