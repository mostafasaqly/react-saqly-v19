// Alert.jsx
// DYNAMIC CLASSES: decide the className with JavaScript.
// `type` is "success" or "error", and we build the class string from it.

function Alert({ type, children }) {
  // Builds e.g. "alert alert-success" or "alert alert-error".
  const className = `alert alert-${type}`;

  return <div className={className}>{children}</div>;
}

export default Alert;

// Matching CSS would look like:
//   .alert { padding: 12px; border-radius: 6px; }
//   .alert-success { background: #d6f5d6; color: #1a7f1a; }
//   .alert-error   { background: #fcdcdc; color: #b00020; }

// Usage:
//   <Alert type="success">Saved!</Alert>
//   <Alert type="error">Something went wrong.</Alert>
