// LiftingState.jsx
// LIFTING STATE UP: when two children need the same data,
// move the state to their common PARENT.
// Data flows DOWN via props. Events flow UP via callback props.

import { useState } from "react";

function LiftingState() {
  // The parent owns the shared state.
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* Child A only displays the count (data flows down). */}
      <Display count={count} />

      {/* Child B changes the count (event flows up via onAdd). */}
      <Controls onAdd={() => setCount(count + 1)} />
    </div>
  );
}

function Display({ count }) {
  return <p>Count: {count}</p>;
}

function Controls({ onAdd }) {
  return <button onClick={onAdd}>Add</button>;
}

export default LiftingState;
