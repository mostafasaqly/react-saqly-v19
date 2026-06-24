import { createContext, useContext, useState } from "react";
import { sections } from "../data/sections";

const ProgressContext = createContext();

const TOTAL = sections.filter((s) => !s.comingSoon).length;

export function ProgressProvider({ children }) {
  const [completed, setCompleted] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("progress") || "[]");
    } catch {
      return [];
    }
  });

  function toggleComplete(id) {
    setCompleted((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem("progress", JSON.stringify(next));
      return next;
    });
  }

  function isComplete(id) {
    return completed.includes(id);
  }

  const percent = Math.round((completed.length / TOTAL) * 100);

  return (
    <ProgressContext.Provider value={{ completed, toggleComplete, isComplete, percent, total: TOTAL }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}
