// Counter.jsx
// useState: the most important hook. It gives a value and a setter function.

import { useState } from "react";

function Counter() {
  // [current value, function to change it] = useState(starting value)
  const [count, setCount] = useState(0);

  function add() {
    // Correct: use the setter so React re-renders.
    setCount(count + 1);

    // Wrong: count = count + 1;  // React never notices this.
  }

  function addSafe() {
    // When the new value depends on the old value, pass a function.
    // This always uses the latest value, even with many quick updates.
    setCount((prev) => prev + 1);
  }

  function reset() {
    setCount(0);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={add}>+1</button>
      <button onClick={addSafe}>+1 (safe)</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Counter;
