// Sidebar.jsx — قائمة الأقسام على اليمين (RTL).

import { sections } from "../data/sections";

function Sidebar({ activeId, onSelect, isOpen, onClose }) {
  return (
    <>
      {/* غطاء معتم على الموبايل عند فتح القائمة */}
      {isOpen && <div className="overlay" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar__brand">
          <span className="sidebar__logo">⚛️</span>
          <div>
            <h1 className="sidebar__title">كورس رياكت 19</h1>
            <p className="sidebar__subtitle">21 قسماً • بالعربية</p>
          </div>
        </div>

        <nav className="sidebar__nav">
          {sections.map((section) => (
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
              <span className="nav-item__text">{section.title}</span>
              {section.comingSoon && (
                <span className="nav-item__badge">قريباً</span>
              )}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
