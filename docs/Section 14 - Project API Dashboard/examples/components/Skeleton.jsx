// Skeleton.jsx — a gray, pulsing placeholder shaped like a card.
// Shown while data loads to keep the layout stable.

function Skeleton() {
  return (
    <div
      style={{
        height: 60,
        margin: "8px 0",
        borderRadius: 8,
        background: "linear-gradient(90deg, #eee, #f5f5f5, #eee)",
        backgroundSize: "200% 100%",
        animation: "pulse 1.2s ease-in-out infinite",
      }}
    />
  );
}

export default Skeleton;

// Add this CSS once (e.g. in index.css) for the shimmer animation:
//
//   @keyframes pulse {
//     0%   { background-position: 200% 0; }
//     100% { background-position: -200% 0; }
//   }
