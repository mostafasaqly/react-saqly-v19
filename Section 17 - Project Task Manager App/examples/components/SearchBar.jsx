// SearchBar.jsx — a controlled input for searching tasks by text.

function SearchBar({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search tasks..."
      style={{ width: "100%", padding: 8, margin: "8px 0", boxSizing: "border-box" }}
    />
  );
}

export default SearchBar;
