// ControlledInput.jsx
// A CONTROLLED INPUT: the input's value comes from state,
// and typing updates that state. React is the single source of truth.

import { useState } from "react";

function ControlledInput() {
  const [name, setName] = useState("");

  return (
    <div>
      <input
        value={name}                              // value comes FROM state
        onChange={(e) => setName(e.target.value)} // typing updates state
        placeholder="Type your name"
      />
      <p>Hello, {name || "stranger"}</p>
    </div>
  );
}

export default ControlledInput;

// The flow on every keystroke:
//   user types -> onChange fires -> setName updates state
//   -> React re-renders -> input shows new value
// This loop is the foundation of every form in React.
