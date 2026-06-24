import { sections } from "../data/sections";
import { useLang } from "../context/LangContext";
import { useTheme } from "../context/ThemeContext";
import { useProgress } from "../context/ProgressContext";
import { useSearch } from "../context/SearchContext";

function Sidebar({ activeId, onSelect, isOpen, onClose, activeNavRef }) {
  const { lang, toggle } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();
  const { isComplete, percent, completed, total } = useProgress();
  const { query, setQuery, results, clearSearch, indexReady } = useSearch();
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

        {/* Progress bar */}
        <div className="progress-box" aria-label={isAr ? `تقدمك: ${percent}%` : `Progress: ${percent}%`}>
          <div className="progress-box__header">
            <span>{isAr ? "تقدمك" : "Progress"}</span>
            <span className="progress-box__nums">{completed.length}/{total}</span>
          </div>
          <div className="progress-bar" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
            <div className="progress-bar__fill" style={{ width: `${percent}%` }} />
          </div>
          <span className="progress-box__pct">{percent}%</span>
        </div>

        {/* Search */}
        <div className="sidebar__search">
          <input
            className="search-input"
            type="search"
            placeholder={indexReady ? (isAr ? "ابحث في الكورس…" : "Search course…") : (isAr ? "جارٍ التحميل…" : "Loading…")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={isAr ? "بحث" : "Search"}
            disabled={!indexReady}
          />
          {query && (
            <button className="search-clear" onClick={clearSearch} aria-label={isAr ? "مسح البحث" : "Clear search"}>✕</button>
          )}
        </div>

        {/* Search results */}
        {query && (
          <div className="search-results" role="listbox">
            {results.length === 0 ? (
              <p className="search-empty">{isAr ? "لا نتائج" : "No results"}</p>
            ) : (
              results.map((r) => (
                <button
                  key={r.id}
                  className="search-result-item"
                  role="option"
                  onClick={() => { onSelect(r.id); clearSearch(); onClose(); }}
                >
                  <span className="search-result-item__title">
                    {isAr ? r.title : r.titleEn}
                  </span>
                  {r.snippets.map((s, i) => (
                    <span key={i} className="search-result-item__snippet">{s}</span>
                  ))}
                </button>
              ))
            )}
          </div>
        )}

        <nav className="sidebar__nav" aria-label={isAr ? "الأقسام" : "Sections"}>
          {sections.map((section) => {
            const title = isAr
              ? section.title
              : (section.titleEn || section.title);
            const isActive = section.id === activeId;
            const done = isComplete(section.id);
            return (
              <button
                key={section.id}
                ref={isActive ? activeNavRef : null}
                className={`nav-item ${isActive ? "nav-item--active" : ""} ${
                  section.comingSoon ? "nav-item--soon" : ""
                } ${done ? "nav-item--done" : ""}`}
                onClick={() => {
                  if (!section.comingSoon) {
                    onSelect(section.id);
                    onClose();
                  }
                }}
                aria-current={isActive ? "page" : undefined}
                aria-disabled={section.comingSoon ? "true" : undefined}
                aria-label={`${isAr ? "القسم" : "Section"} ${section.id}: ${title}${section.comingSoon ? (isAr ? " — قريباً" : " — coming soon") : ""}${done ? (isAr ? " — مكتمل" : " — completed") : ""}`}
              >
                <span className="nav-item__num" aria-hidden="true">
                  {done ? "✓" : section.id}
                </span>
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
