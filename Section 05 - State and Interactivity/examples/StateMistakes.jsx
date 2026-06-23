// StateMistakes.jsx
// The most common state mistakes, each shown WRONG then RIGHT.

import { useState } from "react";

function StateMistakes() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(["a"]);
  const [user, setUser] = useState({ name: "Sara", age: 25 });

  // MISTAKE 1: changing state directly (React never notices).
  function wrongDirect() {
    // count = count + 1;        // ❌ does nothing visible
    setCount(count + 1);         // ✅
  }

  // MISTAKE 2: push mutates the array in place.
  function wrongPush() {
    // items.push("b");          // ❌ same array, no re-render
    setItems([...items, "b"]);   // ✅ new array
  }

  // MISTAKE 3: mutating an object field.
  function wrongMutate() {
    // user.age = 26;            // ❌
    setUser({ ...user, age: 26 }); // ✅ new object
  }

  // MISTAKE 4 & 5: stale value in quick updates.
  function addTwo() {
    // setCount(count + 1);
    // setCount(count + 1);      // ❌ only +1 (both read the same old count)
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1); // ✅ +2
  }

  return (
    <div>
      <p>count: {count}</p>
      <p>items: {items.join(", ")}</p>
      <p>user: {user.name}, {user.age}</p>
      <button onClick={wrongDirect}>+1</button>
      <button onClick={addTwo}>+2</button>
      <button onClick={wrongPush}>add item</button>
      <button onClick={wrongMutate}>birthday</button>
    </div>
  );
}

export default StateMistakes;
