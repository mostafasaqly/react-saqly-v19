// App.jsx — الهيكل الرئيسي: قائمة جانبية + محتوى الدرس.

import { useState, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import LessonContent from "./components/LessonContent";
import { sections } from "./data/sections";
import { useSectionContent } from "./hooks/useSectionContent";
import { useLang } from "./context/LangContext";
import "./App.css";

function getIdFromHash() {
  const id = parseInt(window.location.hash.replace("#section-", ""), 10);
  return sections.some((s) => s.id === id) ? id : sections[0].id;
}

function App() {
  const [activeId, setActiveId] = useState(getIdFromHash);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang } = useLang();
  const activeNavRef = useRef(null);
  const isAr = lang === "ar";

  const { section: activeSection, loading, error, retry } = useSectionContent(activeId);
  const activeMeta = sections.find((s) => s.id === activeId) ?? sections[0];

  // sync URL hash → state (back/forward buttons)
  useEffect(() => {
    function onHashChange() {
      setActiveId(getIdFromHash());
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // normalize an invalid/stale hash so the URL matches what's shown
  useEffect(() => {
    const expected = `#section-${activeId}`;
    if (window.location.hash !== expected) {
      window.history.replaceState(null, "", expected);
    }
  }, [activeId]);

  // update document title when section or language changes
  useEffect(() => {
    const name = isAr ? activeMeta.title : (activeMeta.titleEn || activeMeta.title);
    document.title = `${name} — ${isAr ? "كورس رياكت 19" : "React 19 Course"}`;
  }, [activeMeta, isAr]);

  // scroll active nav item into view inside the sidebar
  useEffect(() => {
    activeNavRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeId]);

  // close sidebar on Escape
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  function selectSection(id) {
    window.location.hash = `#section-${id}`;
    setActiveId(id);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  return (
    <div className="layout">
      <a href="#main-content" className="skip-link">
        {isAr ? "تخطَّ إلى المحتوى" : "Skip to content"}
      </a>

      <Sidebar
        activeId={activeId}
        onSelect={selectSection}
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeNavRef={activeNavRef}
      />

      <main className="content" id="main-content" tabIndex={-1}>
        <div className="topbar">
          <button
            className="topbar__menu"
            onClick={() => setMenuOpen(true)}
            aria-label={isAr ? "فتح القائمة" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="sidebar"
          >
            ☰ {isAr ? "الأقسام" : "Sections"}
          </button>
          <span className="topbar__title">{isAr ? "كورس رياكت 19" : "React 19 Course"}</span>
        </div>

        <div className="content__inner">
          {loading ? (
            <div className="section-loading" aria-live="polite" aria-label={isAr ? "جارٍ التحميل" : "Loading"}>
              <div className="section-loading__bar" />
              <div className="section-loading__bar section-loading__bar--short" />
              <div className="section-loading__bar section-loading__bar--medium" />
            </div>
          ) : error ? (
            <div className="section-error" role="alert">
              <span className="section-error__emoji" aria-hidden="true">⚠️</span>
              <h2>{isAr ? "تعذّر تحميل القسم" : "Couldn't load this section"}</h2>
              <p>
                {isAr
                  ? "حدث خطأ أثناء تحميل المحتوى. تحقّق من اتصالك وحاول مجدّداً."
                  : "Something went wrong loading the content. Check your connection and try again."}
              </p>
              <button className="section-error__retry" onClick={retry}>
                {isAr ? "إعادة المحاولة" : "Try again"}
              </button>
            </div>
          ) : (
            <LessonContent section={activeSection} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
