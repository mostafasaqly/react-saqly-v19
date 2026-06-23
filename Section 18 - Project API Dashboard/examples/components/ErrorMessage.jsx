// ErrorMessage.jsx — a friendly error box with an optional "Try again" button.

function ErrorMessage({ message, onRetry }) {
  return (
    <div
      style={{
        padding: 16,
        margin: "12px 0",
        background: "#fcdcdc",
        color: "#b00020",
        borderRadius: 8,
      }}
    >
      <p>⚠️ {message}</p>
      {onRetry && <button onClick={onRetry}>Try again</button>}
    </div>
  );
}

export default ErrorMessage;
