import { useState, useMemo } from "react";
import { useLang } from "../context/LangContext";
import { tokenize } from "../utils/highlight";

function CodeBlock({ code }) {
  const [status, setStatus] = useState("idle"); // "idle" | "copied" | "error"
  const { lang } = useLang();
  const isAr = lang === "ar";

  const tokens = useMemo(() => tokenize(code), [code]);

  async function handleCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        const ta = document.createElement("textarea");
        ta.value = code;
        ta.style.cssText = "position:fixed;opacity:0;pointer-events:none";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        if (!ok) throw new Error("execCommand failed");
      }
      setStatus("copied");
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 2000);
    }
  }

  const labels = {
    idle:   isAr ? "نسخ"         : "Copy",
    copied: isAr ? "✓ تم النسخ"  : "✓ Copied",
    error:  isAr ? "✗ فشل النسخ" : "✗ Failed",
  };

  return (
    <div className="code-wrapper">
      <button
        className={`code-copy${status === "copied" ? " code-copy--done" : ""}${status === "error" ? " code-copy--error" : ""}`}
        onClick={handleCopy}
        aria-label={isAr ? "نسخ الكود" : "Copy code"}
      >
        {labels[status]}
      </button>
      <pre className="block-code">
        <code>
          {tokens.map((tok, i) => (
            <span key={i} className={`tok-${tok.type}`}>{tok.value}</span>
          ))}
        </code>
      </pre>
    </div>
  );
}

export default CodeBlock;
