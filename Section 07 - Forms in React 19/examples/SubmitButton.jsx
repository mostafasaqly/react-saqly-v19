// SubmitButton.jsx
// useFormStatus: a CHILD component reads the status of the <form> above it.
// IMPORTANT: import from "react-dom" (not "react"),
// and this component must be rendered INSIDE the form.

import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Sending..." : "Send"}
    </button>
  );
}

export default SubmitButton;

// Now you can reuse it inside ANY form:
//
//   import SubmitButton from "./SubmitButton.jsx";
//
//   function ContactForm() {
//     async function send(formData) {
//       await fakeSave(formData.get("message"));
//     }
//     return (
//       <form action={send}>
//         <input name="message" />
//         <SubmitButton />   {/* automatically knows when the form is pending */}
//       </form>
//     );
//   }
