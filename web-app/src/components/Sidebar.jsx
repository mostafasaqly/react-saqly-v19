import { sections } from "../data/sections";
import { useLang } from "../context/LangContext";
import { useTheme } from "../context/ThemeContext";

function Sidebar({ activeId, onSelect, isOpen, onClose, activeNavRef }) {
  const { lang, toggle } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();
  const isAr = lang === "ar";

  return (
    <>
      {isOpen && (
        <div
          className="overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        id="sidebar"
        className={`sidebar ${isOpen ? "sidebar--open" : ""}`}
        aria-label={isAr ? "قائمة الأقسام" : "Course sections"}
      >
        <div className="sidebar__brand">
          <span className="sidebar__logo" aria-hidden="true">⚛️</span>
          <div>
            <h1 className="sidebar__title">
              {isAr ? "كورس رياكت 19" : "React 19 Course"}
            </h1>
            <p className="sidebar__subtitle">
              {isAr
                ? `${sections.length} قسماً • بالعربية`
                : `${sections.length} sections • Arabic`}
            </p>
          </div>
        </div>

        <div className="sidebar__controls">
          <button
            className="lang-toggle"
            onClick={toggle}
            aria-label={isAr ? "Switch to English" : "التبديل للعربية"}
          >
            {isAr ? "EN" : "AR"}
          </button>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? (isAr ? "تفعيل الوضع الفاتح" : "Switch to light mode") : (isAr ? "تفعيل الوضع الداكن" : "Switch to dark mode")}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>

        <nav className="sidebar__nav" aria-label={isAr ? "الأقسام" : "Sections"}>
          {sections.map((section) => {
            const title = isAr
              ? section.title
              : (section.titleEn || section.title);
            const isActive = section.id === activeId;
            return (
              <button
                key={section.id}
                ref={isActive ? activeNavRef : null}
                className={`nav-item ${isActive ? "nav-item--active" : ""} ${
                  section.comingSoon ? "nav-item--soon" : ""
                }`}
                onClick={() => {
                  if (!section.comingSoon) {
                    onSelect(section.id);
                    onClose();
                  }
                }}
                aria-current={isActive ? "page" : undefined}
                aria-disabled={section.comingSoon ? "true" : undefined}
                aria-label={`${isAr ? "القسم" : "Section"} ${section.id}: ${title}${section.comingSoon ? (isAr ? " — قريباً" : " — coming soon") : ""}`}
              >
                <span className="nav-item__num" aria-hidden="true">{section.id}</span>
                <span className="nav-item__text">{title}</span>
                {section.comingSoon && (
                  <span className="nav-item__badge" aria-hidden="true">
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
