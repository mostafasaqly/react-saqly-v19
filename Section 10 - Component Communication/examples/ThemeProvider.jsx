// ThemeProvider.jsx
// Holds the theme state + a toggle function, and provides BOTH to the app.
// This lets any child read AND change the theme.

import { useState } from "react";
import { ThemeContext } from "./ThemeContext";

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  function toggle() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  // Share an object: the value AND a way to change it.
  return <ThemeContext value={{ theme, toggle }}>{children}</ThemeContext>;
}

export default ThemeProvider;
