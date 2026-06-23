// SearchBar.jsx — a controlled input for searching.

function SearchBar({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by name..."
      style={{
        width: "100%",
        padding: 10,
        margin: "12px 0",
        boxSizing: "border-box",
      }}
    />
  );
}

export default SearchBar;
