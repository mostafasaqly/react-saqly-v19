// QABlock.jsx — سؤال مراجعة مع إجابة قابلة للطيّ.

import { useState, useId } from "react";

function QABlock({ question, answer }) {
  const [open, setOpen] = useState(false);
  const answerId = useId();

  return (
    <div className="qa">
      <button
        className="qa__question"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={answerId}
      >
        <span>{question}</span>
        <span className={`qa__icon ${open ? "qa__icon--open" : ""}`} aria-hidden="true">▼</span>
      </button>
      <div
        id={answerId}
        className="qa__answer"
        hidden={!open}
        role="region"
        aria-label={question}
      >
        {answer}
      </div>
    </div>
  );
}

export default QABlock;
