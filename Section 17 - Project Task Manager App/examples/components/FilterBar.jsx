// FilterBar.jsx
// Three buttons to choose the filter. The active one is highlighted.

const FILTERS = ["all", "active", "completed"];

function FilterBar({ filter, onChange }) {
  return (
    <div style={{ display: "flex", gap: 8, margin: "12px 0" }}>
      {FILTERS.map((name) => (
        <button
          key={name}
          onClick={() => onChange(name)}
          style={{
            fontWeight: filter === name ? "bold" : "normal",
            textTransform: "capitalize",
          }}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
