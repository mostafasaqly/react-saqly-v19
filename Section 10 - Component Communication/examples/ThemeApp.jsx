// ThemeApp.jsx
// Practical example: wrap the app in ThemeProvider, then read & toggle
// the theme from a deep component — no prop drilling.

import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import ThemeProvider from "./ThemeProvider";

function ThemeApp() {
  return (
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  );
}

// Deep in the tree...
function Page() {
  return <Toolbar />;
}

function Toolbar() {
  return <ThemedButton />;
}

// Reads { theme, toggle } from context and can change it.
function ThemedButton() {
  const { theme, toggle } = useContext(ThemeContext);
  return (
    <button className={theme} onClick={toggle}>
      I am the {theme} theme (click to toggle)
    </button>
  );
}

export default ThemeApp;
