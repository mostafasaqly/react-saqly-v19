// FormErrors.jsx
// Handling BOTH kinds of errors in one action:
//   1) validation errors (bad input) -> return { error }
//   2) server errors (request failed) -> try/catch -> return { error }

import { useActionState } from "react";

function FormErrors() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const email = formData.get("email");

      // 1) Validation error.
      if (!email || !email.includes("@")) {
        return { error: "Please enter a valid email." };
      }

      // 2) Server error.
      try {
        await fakeSubscribe(email);
        return { success: "Subscribed! 🎉" };
      } catch (err) {
        return { error: "Could not subscribe. Please try again." };
      }
    },
    null
  );

  return (
    <form action={formAction}>
      <input name="email" placeholder="you@example.com" />
      <button type="submit" disabled={isPending}>
        {isPending ? "Subscribing..." : "Subscribe"}
      </button>
      {state?.error && <p style={{ color: "red" }}>{state.error}</p>}
      {state?.success && <p style={{ color: "green" }}>{state.success}</p>}
    </form>
  );
}

// Fails ~half the time to demo the server-error path.
function fakeSubscribe(email) {
  return new Promise((resolve, reject) =>
    setTimeout(() => (Math.random() > 0.5 ? resolve() : reject()), 700)
  );
}

export default FormErrors;
