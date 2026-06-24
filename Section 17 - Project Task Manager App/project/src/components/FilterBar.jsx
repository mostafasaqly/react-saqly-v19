const FILTERS = ["all", "active", "completed"];

function FilterBar({ filter, onChange }) {
  return (
    <div className="filter-bar">
      {FILTERS.map((name) => (
        <button
          key={name}
          onClick={() => onChange(name)}
          className={`filter-btn${filter === name ? " filter-btn--active" : ""}`}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
