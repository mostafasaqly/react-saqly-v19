// UseActionStateForm.jsx
// useActionState: wraps an action and gives back
//   [state, formAction, isPending]
//   - state: the last value your action returned (for messages)
//   - formAction: put this on <form action={formAction}>
//   - isPending: true while the action runs

import { useActionState } from "react";

function UseActionStateForm() {
  const [state, formAction, isPending] = useActionState(
    // The action receives (previousState, formData).
    async (prevState, formData) => {
      const text = formData.get("text");

      if (!text || text.trim() === "") {
        return { error: "Text is required" };
      }

      await fakeSave(text); // pretend to call a server

      return { success: "Comment posted!" };
    },
    null // starting state
  );

  return (
    <form action={formAction}>
      <input name="text" placeholder="Write a comment" />

      <button type="submit" disabled={isPending}>
        {isPending ? "Posting..." : "Post"}
      </button>

      {state?.error && <p style={{ color: "red" }}>{state.error}</p>}
      {state?.success && <p style={{ color: "green" }}>{state.success}</p>}
    </form>
  );
}

function fakeSave(text) {
  return new Promise((resolve) => setTimeout(resolve, 800));
}

export default UseActionStateForm;
