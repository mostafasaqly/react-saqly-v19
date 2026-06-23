// Toggle.jsx
// Updating PRIMITIVE state (number, string, boolean).
// Toggling a boolean is one of the most common patterns.

import { useState } from "react";

function Toggle() {
  const [isOpen, setIsOpen] = useState(false); // boolean primitive

  return (
    <div>
      {/* Flip true/false. The function form is safest. */}
      <button onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? "Hide" : "Show"} details
      </button>

      {isOpen && <p>Here are the secret details! 🎉</p>}
    </div>
  );
}

export default Toggle;
