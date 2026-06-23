// ThemeApp.jsx
// Step 2: provide a value at the top.
// Step 3: read it deep below with useContext — no prop drilling.

import { useContext, useState } from "react";
import { ThemeContext } from "./ThemeContext";

function ThemeApp() {
  const [theme, setTheme] = useState("light");

  return (
    // React 19: <ThemeContext value={...}> works directly as the provider.
    // (The older <ThemeContext.Provider value={...}> also still works.)
    <ThemeContext value={theme}>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle theme
      </button>
      <Page />
    </ThemeContext>
  );
}

// This component is deep in the tree but reads theme directly.
function Page() {
  return <Toolbar />;
}

function Toolbar() {
  return <ThemedButton />;
}

function ThemedButton() {
  const theme = useContext(ThemeContext); // reads the current theme
  return <button className={theme}>I am the {theme} theme</button>;
}

export default ThemeApp;
