// useFetch.jsx
// A reusable data-fetching hook. Returns { data, loading, error }.
// The `active` guard avoids setting state after the component is removed.

import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(url);
        if (!res.ok) throw new Error("Request failed");
        const json = await res.json();
        if (active) setData(json);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();

    // Cleanup: ignore the result if the component unmounts or url changes.
    return () => {
      active = false;
    };
  }, [url]);

  return { data, loading, error };
}

export default useFetch;

// Usage:
//   const { data, loading, error } = useFetch("https://.../users");
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;
//   return <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
