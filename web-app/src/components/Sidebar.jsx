import { sections } from "../data/sections";
import { useLang } from "../context/LangContext";

function Sidebar({ activeId, onSelect, isOpen, onClose }) {
  const { lang, toggle } = useLang();
  const isAr = lang === "ar";

  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar__brand">
          <span className="sidebar__logo">⚛️</span>
          <div>
            <h1 className="sidebar__title">
              {isAr ? "كورس رياكت 19" : "React 19 Course"}
            </h1>
            <p className="sidebar__subtitle">
              {isAr ? "21 قسماً • بالعربية" : "21 sections • Arabic"}
            </p>
          </div>
        </div>

        <button className="lang-toggle" onClick={toggle}>
          {isAr ? "EN" : "AR"}
        </button>

        <nav className="sidebar__nav">
          {sections.map((section) => {
            const title = isAr
              ? section.title
              : (section.titleEn || section.title);
            return (
              <button
                key={section.id}
                className={`nav-item ${
                  section.id === activeId ? "nav-item--active" : ""
                } ${section.comingSoon ? "nav-item--soon" : ""}`}
                onClick={() => {
                  if (!section.comingSoon) {
                    onSelect(section.id);
                    onClose();
                  }
                }}
              >
                <span className="nav-item__num">{section.id}</span>
                <span className="nav-item__text">{title}</span>
                {section.comingSoon && (
                  <span className="nav-item__badge">
                    {isAr ? "قريباً" : "Soon"}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
