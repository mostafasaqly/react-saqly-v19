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
          <a
            href="https://mostafasaqly.github.io/react-saqly-v19/"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar__react-link"
            title={isAr ? "كورس React 19" : "React 19 Course"}
            aria-label={isAr ? "أنت في كورس React" : "You are in React Course"}
          >
            <svg className="sidebar__react-logo" viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg">
              <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
              <g stroke="#61dafb" strokeWidth="1" fill="none">
                <ellipse rx="11" ry="4.2"/>
                <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
              </g>
            </svg>
            <span className="sidebar__react-label">
              {isAr ? "كورس React 19" : "React 19 Course"}
            </span>
          </a>
          <div className="sidebar__brand-icons">
            <a
              href="https://mostafasaqly.github.io/vue-saqly-v3/#section-1"
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar__course-link"
              title={isAr ? "كورس Vue v3" : "Vue v3 Course"}
              aria-label={isAr ? "انتقل إلى كورس Vue" : "Go to Vue Course"}
            >
              <svg className="sidebar__vue-logo" viewBox="0 0 261.76 226.69" xmlns="http://www.w3.org/2000/svg">
                <path fill="#41B883" d="M161.096.001l-30.224 52.35L100.647.001H-.005l130.877 226.688L261.749.001z" />
                <path fill="#34495E" d="M161.096.001l-30.224 52.35L100.647.001H52.346l78.526 136.01L209.398.001z" />
              </svg>
            </a>
            <a
              href="https://mostafasaqly.github.io/angular-saqly-v22/section/1"
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar__course-link"
              title={isAr ? "كورس أنجولار v22" : "Angular v22 Course"}
              aria-label={isAr ? "انتقل إلى كورس أنجولار" : "Go to Angular Course"}
            >
              <svg className="sidebar__angular-logo" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg">
                <polygon fill="#DD0031" points="125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2" />
                <polygon fill="#C3002F" points="125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 125,230 203.9,186.3 218.1,63.2" />
                <path fill="#FFFFFF" d="M125,52.1L66.8,182.6h0h21.7h0l11.7-29.2h49.4l11.7,29.2h0h21.7h0L125,52.1L125,52.1z M142,135.4H108l17-40.9L142,135.4z" />
              </svg>
            </a>
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
