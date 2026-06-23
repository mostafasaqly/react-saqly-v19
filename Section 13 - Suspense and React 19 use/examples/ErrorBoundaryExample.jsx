// ErrorBoundaryExample.jsx
// Pairing Suspense (loading) with an Error Boundary (failure).
// React has no built-in error boundary, so here is a tiny class one.
// In real apps, the `react-error-boundary` package is popular.

import { Component, Suspense, use } from "react";

// A minimal Error Boundary (must be a class component).
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

// A component that reads a promise with `use`. It may suspend or throw.
function Comments({ commentsPromise }) {
  const comments = use(commentsPromise);
  return (
    <ul>
      {comments.map((c) => (
        <li key={c.id}>{c.text}</li>
      ))}
    </ul>
  );
}

function ErrorBoundaryExample({ commentsPromise }) {
  return (
    // Error Boundary catches failures...
    <ErrorBoundary fallback={<p>⚠️ Could not load comments.</p>}>
      {/* ...Suspense shows the loading fallback. */}
      <Suspense fallback={<p>Loading comments...</p>}>
        <Comments commentsPromise={commentsPromise} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default ErrorBoundaryExample;
