// LessonContent.jsx — يعرض محتوى القسم حسب نوع كل "block".

import QABlock from "./QABlock";

function LessonContent({ section }) {
  if (section.comingSoon) {
    return (
      <div className="coming-soon">
        <span className="coming-soon__emoji">🚧</span>
        <h2>هذا القسم قريباً</h2>
        <p>
          القسم «{section.title}» قيد الإعداد. ابدأ بالقسم الأول، وسنضيف باقي
          الأقسام بنفس الطريقة.
        </p>
      </div>
    );
  }

  return (
    <article className="lesson">
      {/* رأس القسم */}
      <header className="lesson__header">
        <div className="lesson__meta">
          <span className="badge">القسم {section.id}</span>
          {section.level && <span className="badge badge--soft">{section.level}</span>}
        </div>
        <h1 className="lesson__title">{section.title}</h1>
        {section.intro && <p className="lesson__intro">{section.intro}</p>}

        {/* قائمة الدروس */}
        {section.lessons?.length > 0 && (
          <div className="lesson__toc">
            <h3>دروس هذا القسم</h3>
            <ol>
              {section.lessons.map((lesson, i) => (
                <li key={i}>{lesson}</li>
              ))}
            </ol>
          </div>
        )}
      </header>

      {/* المحتوى */}
      <div className="lesson__body">
        {section.content.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    </article>
  );
}

// يرسم كل عنصر حسب نوعه.
function Block({ block }) {
  switch (block.type) {
    case "heading":
      return <h2 className="block-heading">{block.text}</h2>;
    case "subheading":
      return <h3 className="block-subheading">{block.text}</h3>;
    case "paragraph":
      return <p className="block-paragraph">{block.text}</p>;
    case "code":
      return (
        <pre className="block-code">
          <code>{block.code}</code>
        </pre>
      );
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
    case "qa":
      return <QABlock question={block.question} answer={block.answer} />;
    default:
      return null;
  }
}

export default LessonContent;
