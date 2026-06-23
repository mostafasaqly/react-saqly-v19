// LazyExample.jsx
// Code splitting: load a component only when it is needed.
// lazy() splits it into a separate file; <Suspense> shows a fallback while it loads.

import { lazy, Suspense, useState } from "react";

// Dashboard is NOT downloaded until it is actually shown.
const Dashboard = lazy(() => import("./Dashboard.jsx"));

function LazyExample() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(true)}>Open Dashboard</button>

      {show && (
        <Suspense fallback={<p>Loading dashboard...</p>}>
          <Dashboard />
        </Suspense>
      )}
    </div>
  );
}

export default LazyExample;

// Dashboard.jsx would be a normal component with `export default`.
// It only downloads the first time the user clicks "Open Dashboard".
