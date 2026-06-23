// SearchParams.jsx
// Query params (?q=...&page=...) with useSearchParams.
// The URL becomes shareable and bookmarkable.

import { useSearchParams } from "react-router-dom";

function SearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read current values from the URL (with sensible defaults).
  const q = searchParams.get("q") || "";
  const page = searchParams.get("page") || "1";

  function onSearch(text) {
    // Writing updates the URL: /search?q=text&page=1
    setSearchParams({ q: text, page: "1" });
  }

  function nextPage() {
    setSearchParams({ q, page: String(Number(page) + 1) });
  }

  return (
    <div>
      <input
        value={q}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search..."
      />
      <p>
        Searching "{q}" — page {page}
      </p>
      <button onClick={nextPage}>Next page</button>
    </div>
  );
}

export default SearchParams;
