// CallbackExample.jsx
// useMemo caches a VALUE. useCallback caches a FUNCTION.
// Both keep a memo child from re-rendering needlessly.

import { memo, useState, useMemo, useCallback } from "react";

const MemoButton = memo(function MemoButton({ onClick, label }) {
  console.log("rendering button:", label);
  return <button onClick={onClick}>{label}</button>;
});

function CallbackExample() {
  const [count, setCount] = useState(0);
  const [numbers] = useState([5, 2, 9, 1, 7]);

  // useMemo: only recompute the sorted list when `numbers` changes.
  const sorted = useMemo(() => {
    return [...numbers].sort((a, b) => a - b);
  }, [numbers]);

  // useCallback: keep the same function reference so MemoButton is stable.
  const handleReset = useCallback(() => {
    setCount(0);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Sorted: {sorted.join(", ")}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      {/* This button does NOT re-render when count changes. */}
      <MemoButton onClick={handleReset} label="Reset" />
    </div>
  );
}

export default CallbackExample;
