// DocumentTitle.jsx
// useEffect with a dependency: re-run the effect only when `count` changes.

import { useState, useEffect } from "react";

function DocumentTitle() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Side effect: change the browser tab title.
    document.title = `Count: ${count}`;
  }, [count]); // runs after first render AND whenever count changes

  return (
    <div>
      <p>Look at the browser tab title!</p>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
}

export default DocumentTitle;
