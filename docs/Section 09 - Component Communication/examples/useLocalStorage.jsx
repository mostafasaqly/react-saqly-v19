// useLocalStorage.jsx
// A CUSTOM HOOK: reusable logic that syncs a state value with localStorage.
// Rule: a custom hook's name must start with "use" and it can call other hooks.

import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    // Read the saved value once, when the component first appears.
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    // Save to localStorage whenever the value changes.
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // Return the same shape as useState, so it feels familiar.
  return [value, setValue];
}

export default useLocalStorage;

// Usage:
//   const [name, setName] = useLocalStorage("name", "");
//   // `name` now survives page reloads automatically.
