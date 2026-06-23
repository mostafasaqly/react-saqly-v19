// App.jsx
// The main routing setup: a layout route wrapping pages,
// a dynamic route, and a catch-all Not Found.

import { Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import Product from "./Product.jsx";

function App() {
  return (
    <Routes>
      {/* Layout route: shared nav + <Outlet /> */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<Product />} />
        {/* Catch-all: must be last */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

function Home() {
  return <h1>Home</h1>;
}
function About() {
  return <h1>About</h1>;
}
function NotFound() {
  return <h1>404 — Page not found</h1>;
}

export default App;

// Remember: wrap <App /> in <BrowserRouter> inside main.jsx.
