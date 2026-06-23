// SharedSearch.jsx
// SHARING STATE: the parent owns `search`. Two children share it:
// SearchBar updates it, Results reads it. One source of truth.

import { useState } from "react";

const FRUITS = ["Apple", "Banana", "Cherry", "Grape", "Mango"];

function SharedSearch() {
  const [search, setSearch] = useState("");

  return (
    <div>
      {/* Child 1: updates the shared state */}
      <SearchBar value={search} onChange={setSearch} />
      {/* Child 2: reads the same shared state */}
      <Results query={search} />
    </div>
  );
}

function SearchBar({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search fruits..."
    />
  );
}

function Results({ query }) {
  // Derived from the shared query — always in sync with the input.
  const matches = FRUITS.filter((f) =>
    f.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ul>
      {matches.map((f) => (
        <li key={f}>{f}</li>
      ))}
    </ul>
  );
}

export default SharedSearch;
