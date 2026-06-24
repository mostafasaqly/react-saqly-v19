import { useState, useId } from "react";
import { useLang } from "../context/LangContext";

function scoreAnswer(userAnswer, correctAnswer) {
  const normalize = (s) => s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").trim();
  const userWords = new Set(normalize(userAnswer).split(/\s+/).filter((w) => w.length > 2));
  const correctWords = normalize(correctAnswer).split(/\s+/).filter((w) => w.length > 2);
  if (!correctWords.length || !userWords.size) return 0;
  const hits = correctWords.filter((w) => userWords.has(w)).length;
  return Math.min(100, Math.round((hits / Math.min(correctWords.length, 8)) * 100));
}

function QABlock({ question, answer }) {
  const [mode, setMode] = useState("idle"); // idle | writing | checked | revealed
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(null);
  const answerId = useId();
  const inputId = useId();
  const { lang } = useLang();
  const isAr = lang === "ar";

  function handleCheck() {
    const s = scoreAnswer(userAnswer, answer);
    setScore(s);
    setMode("checked");
  }

  function handleReveal() {
    setMode("revealed");
  }

  function handleReset() {
    setMode("idle");
    setUserAnswer("");
    setScore(null);
  }

  const scoreLabel =
    score === null ? "" :
    score >= 70 ? (isAr ? "ممتاز 🎉" : "Great! 🎉") :
    score >= 40 ? (isAr ? "جيد، راجع الإجابة" : "Good, review the answer") :
    (isAr ? "راجع الإجابة" : "Review the answer");

  const scoreClass =
    score === null ? "" :
    score >= 70 ? "qa__score--high" :
    score >= 40 ? "qa__score--mid" :
    "qa__score--low";

  return (
    <div className="qa">
      <button
        className="qa__question"
        onClick={() => mode === "idle" ? setMode("writing") : handleReset()}
        aria-expanded={mode !== "idle"}
        aria-controls={answerId}
      >
        <span>{question}</span>
        <span className={`qa__icon ${mode !== "idle" ? "qa__icon--open" : ""}`} aria-hidden="true">
          {mode === "idle" ? "✏️" : "✕"}
        </span>
      </button>

      <div id={answerId} className="qa__body" hidden={mode === "idle"} role="region" aria-label={question}>
        {(mode === "writing" || mode === "checked") && (
          <div className="qa__write-area">
            <label htmlFor={inputId} className="qa__write-label">
              {isAr ? "اكتب إجابتك:" : "Write your answer:"}
            </label>
            <textarea
              id={inputId}
              className="qa__textarea"
              value={userAnswer}
              onChange={(e) => { setUserAnswer(e.target.value); if (mode === "checked") setMode("writing"); }}
              placeholder={isAr ? "اكتب إجابتك هنا…" : "Type your answer here…"}
              rows={3}
            />
            <div className="qa__actions">
              <button
                className="qa__btn qa__btn--check"
                onClick={handleCheck}
                disabled={!userAnswer.trim()}
              >
                {isAr ? "تحقق من إجابتي" : "Check my answer"}
              </button>
              <button className="qa__btn qa__btn--reveal" onClick={handleReveal}>
                {isAr ? "أظهر الإجابة" : "Show answer"}
              </button>
            </div>
          </div>
        )}

        {mode === "checked" && score !== null && (
          <div className={`qa__score ${scoreClass}`}>
            <span className="qa__score-pct">{score}%</span>
            <span className="qa__score-label">{scoreLabel}</span>
            {score < 70 && (
              <button className="qa__btn qa__btn--reveal qa__btn--sm" onClick={handleReveal}>
                {isAr ? "أظهر الإجابة الصحيحة" : "Show correct answer"}
              </button>
            )}
          </div>
        )}

        {mode === "revealed" && (
          <div className="qa__answer">
            {userAnswer.trim() && (
              <div className="qa__user-answer">
                <strong>{isAr ? "إجابتك:" : "Your answer:"}</strong>
                <p>{userAnswer}</p>
                {score !== null && (
                  <span className={`qa__score-badge ${scoreClass}`}>{score}% — {scoreLabel}</span>
                )}
              </div>
            )}
            <div className="qa__correct-answer">
              <strong>{isAr ? "الإجابة الصحيحة:" : "Correct answer:"}</strong>
              <p>{answer}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QABlock;
