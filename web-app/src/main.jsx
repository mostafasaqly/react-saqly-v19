import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { LangProvider } from "./context/LangContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ProgressProvider } from "./context/ProgressContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";
import { NotesProvider } from "./context/NotesContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <LangProvider>
          <ProgressProvider>
            <SearchProvider>
              <NotesProvider>
                <App />
              </NotesProvider>
            </SearchProvider>
          </ProgressProvider>
        </LangProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
