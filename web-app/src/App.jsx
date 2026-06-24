// App.jsx — الهيكل الرئيسي: قائمة جانبية + محتوى الدرس.

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import LessonContent from "./components/LessonContent";
import { sections } from "./data/sections";
import "./App.css";

function App() {
  const [activeId, setActiveId] = useState(1); // نبدأ بالقسم الأول
  const [menuOpen, setMenuOpen] = useState(false);

  // القسم المختار حالياً.
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
        {/* شريط علوي للموبايل لفتح القائمة */}
        <div className="topbar">
          <button className="topbar__menu" onClick={() => setMenuOpen(true)}>
            ☰ الأقسام
          </button>
          <span className="topbar__title">كورس رياكت 19</span>
        </div>

        <div className="content__inner">
          <LessonContent section={activeSection} />
        </div>
      </main>
    </div>
  );
}

export default App;
