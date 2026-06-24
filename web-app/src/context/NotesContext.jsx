import { createContext, useContext, useState } from "react";

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("notes") || "{}");
    } catch {
      return {};
    }
  });

  function setNote(sectionId, text) {
    setNotes((prev) => {
      const next = { ...prev, [sectionId]: text };
      localStorage.setItem("notes", JSON.stringify(next));
      return next;
    });
  }

  function getNote(sectionId) {
    return notes[sectionId] || "";
  }

  return (
    <NotesContext.Provider value={{ getNote, setNote }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}
