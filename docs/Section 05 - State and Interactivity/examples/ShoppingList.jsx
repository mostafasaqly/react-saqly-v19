// ShoppingList.jsx
// Updating an ARRAY in state. Always make a NEW array.
// Use [...], filter, and map — never push/pop/splice on state.

import { useState } from "react";

function ShoppingList() {
  const [items, setItems] = useState(["Apple", "Banana"]);
  const [text, setText] = useState("");

  function addItem() {
    if (text.trim() === "") return;
    // ADD: spread old items, then add the new one at the end.
    setItems([...items, text]);
    setText(""); // clear the input
  }

  function removeItem(target) {
    // REMOVE: keep everything that is NOT the target.
    setItems(items.filter((item) => item !== target));
  }

  function renameApple() {
    // UPDATE: map returns a changed copy.
    setItems(items.map((item) => (item === "Apple" ? "Avocado" : item)));
  }

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addItem}>Add</button>
      <button onClick={renameApple}>Rename Apple</button>

      <ul>
        {items.map((item) => (
          <li key={item}>
            {item} <button onClick={() => removeItem(item)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
