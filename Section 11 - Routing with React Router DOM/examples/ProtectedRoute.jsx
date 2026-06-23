// ProtectedRoute.jsx
// A guard that only shows its children if the user is logged in.
// Otherwise it redirects to /login.

import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    // `replace` means: don't keep the protected URL in history.
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;

// Usage in your routes:
//   <Route
//     path="/dashboard"
//     element={
//       <ProtectedRoute isLoggedIn={isLoggedIn}>
//         <Dashboard />
//       </ProtectedRoute>
//     }
//   />
