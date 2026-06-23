// 07-ReusableButton.jsx
// COMPONENT REUSABILITY: write a component once, change it with props.
// The same Button becomes Save, Delete, or Cancel.

function Button({ label, color = "royalblue", onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: color,
        color: "white",
        border: "none",
        borderRadius: 6,
        padding: "8px 14px",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

export default Button;

// Reuse it with different props instead of copy-pasting JSX:
//
//   <Button label="Save"   color="green" onClick={save} />
//   <Button label="Delete" color="red"   onClick={remove} />
//   <Button label="Cancel" color="gray"  onClick={cancel} />
//
// Rule of thumb: if you write the same JSX twice,
// turn it into a reusable component with props.
