// ProgressBar.jsx
// INLINE STYLES: the `style` prop takes a JavaScript OBJECT (not a string).
// Keys are camelCase: backgroundColor, borderRadius (not background-color).
// Great for values that come from data, like a progress percentage.

function ProgressBar({ percent }) {
  return (
    <div style={{ background: "#ddd", borderRadius: 4, overflow: "hidden" }}>
      <div
        style={{
          width: `${percent}%`, // dynamic value from the prop
          background: "green",
          height: 10,
        }}
      />
    </div>
  );
}

export default ProgressBar;

// Note the DOUBLE braces {{ }}:
//   - outer { } means "JavaScript goes here"
//   - inner { } is the style object itself

// Usage:
//   <ProgressBar percent={70} />
