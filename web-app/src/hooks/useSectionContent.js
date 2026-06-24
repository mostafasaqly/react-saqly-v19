import { useState, useEffect, useRef } from "react";
import { loadSection } from "../data/sections";

export function useSectionContent(id) {
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const cache = useRef({});

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    if (cache.current[id]) {
      setSection(cache.current[id]);
      setLoading(false);
      return;
    }

    loadSection(id).then((data) => {
      if (!cancelled) {
        cache.current[id] = data;
        setSection(data);
        setLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, [id]);

  return { section, loading };
}
