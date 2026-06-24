// App.jsx — الهيكل الرئيسي: قائمة جانبية + محتوى الدرس.

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import LessonContent from "./components/LessonContent";
import { sections } from "./data/sections";
import { useLang } from "./context/LangContext";
import "./App.css";

function App() {
  const [activeId, setActiveId] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang } = useLang();

  const activeSection = sections.find((s) => s.id === activeId);

  return (
    <div className="layout">
      <Sidebar
        activeId={activeId}
        onSelect={(id) => { setActiveId(id); window.scrollTo({ top: 0, behavior: "instant" }); }}
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <main className="content">
        <div className="topbar">
          <button className="topbar__menu" onClick={() => setMenuOpen(true)}>
            ☰ {lang === "ar" ? "الأقسام" : "Sections"}
          </button>
          <span className="topbar__title">{lang === "ar" ? "كورس رياكت 19" : "React 19 Course"}</span>
        </div>

        <div className="content__inner">
          <LessonContent section={activeSection} />
        </div>
      </main>
    </div>
  );
}

export default App;
