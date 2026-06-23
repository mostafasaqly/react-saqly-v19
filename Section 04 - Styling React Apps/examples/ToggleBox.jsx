// ToggleBox.jsx
// CONDITIONAL STYLING: the look changes based on state.
// Here, clicking the box toggles a "selected" style.

import { useState } from "react";

function ToggleBox() {
  const [selected, setSelected] = useState(false);

  // Pattern: combine a fixed class with a conditional one.
  const classes = ["box", selected && "box-selected"]
    .filter(Boolean) // remove the `false` when not selected
    .join(" ");      // "box box-selected" OR just "box"

  return (
    <div
      className={classes}
      onClick={() => setSelected(!selected)}
      style={{
        padding: 16,
        cursor: "pointer",
        border: "2px solid",
        // inline conditional value
        borderColor: selected ? "royalblue" : "#ccc",
        background: selected ? "#eef2ff" : "white",
      }}
    >
      {selected ? "Selected ✓ (click to unselect)" : "Click to select"}
    </div>
  );
}

export default ToggleBox;
