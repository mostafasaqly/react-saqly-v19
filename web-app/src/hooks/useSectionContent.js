import { useState, useEffect, useRef, useCallback } from "react";
import { loadSection } from "../data/sections";

export function useSectionContent(id) {
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const cache = useRef({});

  // retry re-runs the effect even when id is unchanged
  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    if (cache.current[id]) {
      setSection(cache.current[id]);
      setLoading(false);
      return;
    }

    loadSection(id)
      .then((data) => {
        if (!cancelled) {
          cache.current[id] = data;
          setSection(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSection(null);
          setError(true);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [id, attempt]);

  return { section, loading, error, retry };
}
