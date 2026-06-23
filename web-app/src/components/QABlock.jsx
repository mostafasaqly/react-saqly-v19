// QABlock.jsx — سؤال مراجعة مع إجابة قابلة للطيّ.

import { useState } from "react";

function QABlock({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="qa">
      <button className="qa__question" onClick={() => setOpen((o) => !o)}>
        <span>{question}</span>
        <span className="qa__icon">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="qa__answer">{answer}</div>}
    </div>
  );
}

export default QABlock;
