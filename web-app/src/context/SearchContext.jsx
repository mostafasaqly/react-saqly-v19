import { createContext, useContext, useState, useEffect, useRef } from "react";
import { sections, loadSection } from "../data/sections";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [indexReady, setIndexReady] = useState(false);
  const indexRef = useRef([]);

  // Build search index by loading all sections once
  useEffect(() => {
    let cancelled = false;
    Promise.all(
      sections
        .filter((s) => !s.comingSoon)
        .map((s) =>
          loadSection(s.id)
            .then((data) => {
              const texts = [];
              (data.content || []).forEach((block) => {
                if (block.text) texts.push(block.text);
                if (block.items) texts.push(...block.items);
                if (block.question) texts.push(block.question);
                if (block.answer) texts.push(block.answer);
              });
              return {
                id: s.id,
                title: s.title,
                titleEn: s.titleEn || s.title,
                texts,
              };
            })
            .catch(() => null)
        )
    ).then((entries) => {
      if (!cancelled) {
        indexRef.current = entries.filter(Boolean);
        setIndexReady(true);
      }
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q || !indexReady) {
      setResults([]);
      return;
    }
    const hits = [];
    for (const entry of indexRef.current) {
      const titleMatch =
        entry.title.toLowerCase().includes(q) ||
        entry.titleEn.toLowerCase().includes(q);
      const snippets = [];
      for (const t of entry.texts) {
        if (t.toLowerCase().includes(q)) {
          snippets.push(t.length > 120 ? t.slice(0, 120) + "…" : t);
          if (snippets.length >= 2) break;
        }
      }
      if (titleMatch || snippets.length > 0) {
        hits.push({ id: entry.id, title: entry.title, titleEn: entry.titleEn, snippets });
      }
    }
    setResults(hits);
  }, [query, indexReady]);

  function clearSearch() {
    setQuery("");
    setResults([]);
  }

  return (
    <SearchContext.Provider value={{ query, setQuery, results, clearSearch, indexReady }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
