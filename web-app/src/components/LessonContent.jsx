import QABlock from "./QABlock";
import CodeBlock from "./CodeBlock";
import { useLang } from "../context/LangContext";
import { useProgress } from "../context/ProgressContext";
import { useNotes } from "../context/NotesContext";

function LessonContent({ section }) {
  const { lang } = useLang();
  const { isComplete, toggleComplete } = useProgress();
  const { getNote, setNote } = useNotes();
  const isAr = lang === "ar";

  if (!section) return null;

  const done = isComplete(section.id);
  const note = getNote(section.id);

  const title   = isAr ? section.title   : (section.titleEn   || section.title);
  const intro   = isAr ? section.intro   : (section.introEn   || section.intro);
  const level   = isAr ? section.level   : (section.levelEn   || section.level);
  const lessons = isAr ? section.lessons : (section.lessonsEn || section.lessons);
  const content = isAr ? section.content : (section.contentEn || section.content);

  if (section.comingSoon) {
    return (
      <div className="coming-soon">
        <span className="coming-soon__emoji">🚧</span>
        <h2>{isAr ? "هذا القسم قريباً" : "Coming Soon"}</h2>
        <p>
          {isAr
            ? `القسم «${title}» قيد الإعداد. ابدأ بالقسم الأول.`
            : `Section «${title}» is being prepared. Start with section one.`}
        </p>
      </div>
    );
  }

  return (
    <article className="lesson">
      <header className="lesson__header">
        <div className="lesson__meta">
          <span className="badge">{isAr ? `القسم ${section.id}` : `Section ${section.id}`}</span>
          {level && <span className="badge badge--soft">{level}</span>}
        </div>
        <h1 className="lesson__title">{title}</h1>
        {intro && <p className="lesson__intro">{intro}</p>}

        {lessons?.length > 0 && (
          <div className="lesson__toc">
            <h3>{isAr ? "دروس هذا القسم" : "Lessons in this section"}</h3>
            <ol>
              {lessons.map((lesson, i) => (
                <li key={i}>{lesson}</li>
              ))}
            </ol>
          </div>
        )}
      </header>

      <div className="lesson__body">
        {content.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>

      {/* Notes */}
      <div className="lesson__notes">
        <label className="lesson__notes-label" htmlFor={`notes-${section.id}`}>
          📝 {isAr ? "ملاحظاتي" : "My Notes"}
        </label>
        <textarea
          id={`notes-${section.id}`}
          className="lesson__notes-textarea"
          value={note}
          onChange={(e) => setNote(section.id, e.target.value)}
          placeholder={isAr ? "اكتب ملاحظاتك هنا… تُحفظ تلقائياً." : "Write your notes here… saved automatically."}
          rows={4}
        />
      </div>

      {/* Mark Complete */}
      <div className="lesson__complete">
        <button
          className={`complete-btn ${done ? "complete-btn--done" : ""}`}
          onClick={() => toggleComplete(section.id)}
          aria-pressed={done}
        >
          {done
            ? (isAr ? "✓ أتممت هذا القسم" : "✓ Section completed")
            : (isAr ? "وضّع علامة مكتمل" : "Mark as complete")}
        </button>
      </div>
    </article>
  );
}

function Block({ block }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="block-heading">
          {block.text}
          {block.term && !block.text.includes(block.term) && (
            <span className="block-heading__term">{block.term}</span>
          )}
        </h2>
      );
    case "subheading":
      return <h3 className="block-subheading">{block.text}</h3>;
    case "paragraph":
      return <p className="block-paragraph">{block.text}</p>;
    case "code":
      return <CodeBlock code={block.code} />;
    case "tip":
      return (
        <div className="callout callout--tip">
          <span className="callout__icon">💡</span>
          <p>{block.text}</p>
        </div>
      );
    case "warning":
      return (
        <div className="callout callout--warning">
          <span className="callout__icon">⚠️</span>
          <p>{block.text}</p>
        </div>
      );
    case "list":
      return (
        <ul className="block-list">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "cta":
      return (
        <p className="block-paragraph">
          {block.text}{" "}
          <a href={block.link} target="_blank" rel="noopener noreferrer" className="cta-link">
            {block.linkLabel}
          </a>
        </p>
      );
    case "qa":
      return <QABlock question={block.question} answer={block.answer} />;
    default:
      return null;
  }
}

export default LessonContent;
