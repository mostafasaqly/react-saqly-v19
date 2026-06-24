import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!url) return;
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load };
}

export default useFetch;
