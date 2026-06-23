// MemoExample.jsx
// memo: skip re-rendering a component when its props are unchanged.

import { memo, useState } from "react";

// Without memo, this would re-render every time the parent does.
const ExpensiveList = memo(function ExpensiveList({ items }) {
  console.log("rendering list"); // watch the console: it won't log on every click
  return (
    <ul>
      {items.map((i) => (
        <li key={i.id}>{i.name}</li>
      ))}
    </ul>
  );
});

function MemoExample() {
  const [count, setCount] = useState(0);

  // `items` is created once and never changes, so the memo child is skipped.
  const items = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
  ];

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      {/* Clicking the button re-renders the parent, but NOT the list. */}
      <ExpensiveList items={items} />
    </div>
  );
}

export default MemoExample;
