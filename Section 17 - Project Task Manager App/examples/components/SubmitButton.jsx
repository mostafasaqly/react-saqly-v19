// SubmitButton.jsx — reusable submit button with built-in pending UI.
// useFormStatus reads the parent <form>'s pending state (from react-dom).

import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Adding..." : "Add"}
    </button>
  );
}

export default SubmitButton;
