// Layout.jsx
// A layout route: shared navigation plus an <Outlet />.
// The current page renders where <Outlet /> is.

import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <nav>
        {/* NavLink adds an "active" class for the current page. */}
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>{" "}
        |{" "}
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          About
        </NavLink>
      </nav>

      <main>
        <Outlet /> {/* the matched child page appears here */}
      </main>
    </div>
  );
}

export default Layout;
