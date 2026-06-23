// ThemeContext.jsx
// Step 1: create a context with a default value.
// We export it so other files can provide and read it.

import { createContext } from "react";

export const ThemeContext = createContext("light");
