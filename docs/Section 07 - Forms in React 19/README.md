# Section 7: Forms in React 19

> **React 19 Crash Course** — Section 7 of 16
> Level: Intermediate

Forms are everywhere: login, search, comments, checkout. React 19 makes forms much easier with a new feature called **Actions** and three helpful hooks. This is one of the biggest reasons to learn React 19.

---

## Table of Contents

1. [Controlled Forms Review](#1-controlled-forms-review)
2. [Form Submission](#2-form-submission)
3. [React 19 Actions](#3-react-19-actions)
4. [`useActionState`](#4-useactionstate)
5. [`useFormStatus`](#5-useformstatus)
6. [Form Validation](#6-form-validation)
7. [Pending and Error States](#7-pending-and-error-states)
8. [Resetting Forms](#8-resetting-forms)

📁 **Code for this section:** see the [`examples/`](./examples) folder.

---

## 1. Controlled Forms Review

From Section 5, a **controlled input** keeps its value in state:

```jsx
const [email, setEmail] = useState("");

<input value={email} onChange={(e) => setEmail(e.target.value)} />
```

This is still useful — for example, to show a live preview or validate as the user types. But for *submitting* a form, React 19 gives us a simpler path. Let's build up to it.

---

## 2. Form Submission

### The old way (still works)

You listen for `onSubmit` and call `e.preventDefault()` to stop the browser from reloading the page:

```jsx
function LoginForm() {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();           // stop the page reload
    console.log("Submitting:", email);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Log in</button>
    </form>
  );
}
```

This works, but you must manage state, pending, and errors all by hand. React 19 does most of that for you.

---

## 3. React 19 Actions

### The problem

A real form submit usually does something **async** (sends data to a server). You then have to track: "is it submitting?", "did it fail?", "did it succeed?". That is a lot of manual `useState`.

### The solution: Actions

In React 19, you can pass an **async function** to a form's `action` prop. React calls it with the form data and manages the pending state for you. No `preventDefault`, no manual state.

```jsx
function CommentForm() {
  // An "action" is just an async function that receives formData.
  async function submitComment(formData) {
    const text = formData.get("text"); // read input by its `name`
    await saveToServer(text);          // do the async work
  }

  return (
    <form action={submitComment}>
      <input name="text" />            {/* note: we use `name`, not value/state */}
      <button type="submit">Post</button>
    </form>
  );
}
```

**Key idea:** You give inputs a `name`, and read them from `formData` with `formData.get("name")`. React handles the rest.

👉 See [`examples/CommentForm.jsx`](./examples/CommentForm.jsx)

---

## 4. `useActionState`

### The problem

You want to show the **result** of an action (a success message or an error) and know when it is **pending**.

### The solution: `useActionState`

This hook wraps your action and gives you back: the latest **state** (result), a **wrapped action** to put on the form, and a **pending** boolean.

```jsx
import { useActionState } from "react";

function CommentForm() {
  const [state, formAction, isPending] = useActionState(
    // 1) your action: receives (previousState, formData)
    async (prevState, formData) => {
      const text = formData.get("text");
      if (!text) return { error: "Text is required" };
      await saveToServer(text);
      return { success: "Comment posted!" };
    },
    // 2) the starting state
    null
  );

  return (
    <form action={formAction}>
      <input name="text" />
      <button type="submit" disabled={isPending}>
        {isPending ? "Posting..." : "Post"}
      </button>

      {state?.error && <p style={{ color: "red" }}>{state.error}</p>}
      {state?.success && <p style={{ color: "green" }}>{state.success}</p>}
    </form>
  );
}
```

**The three returned values:**
- `state` — whatever your action returned last (use it for messages).
- `formAction` — put this on `<form action={formAction}>`.
- `isPending` — `true` while the action runs (use it to disable the button).

👉 See [`examples/UseActionStateForm.jsx`](./examples/UseActionStateForm.jsx)

---

## 5. `useFormStatus`

### The problem

You built a nice reusable `SubmitButton` component. It needs to know if the parent form is submitting — but it does not have direct access to that state.

### The solution: `useFormStatus`

This hook lets a child component read the status of the `<form>` **above** it — no props needed.

```jsx
import { useFormStatus } from "react-dom"; // note: from "react-dom"!

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Sending..." : "Send"}
    </button>
  );
}
```

Now you can drop `<SubmitButton />` inside any `<form>` and it automatically shows the right state.

> ⚠️ **Import note:** `useFormStatus` comes from **`react-dom`**, not `react`. And the component using it must be **inside** the `<form>`.

👉 See [`examples/SubmitButton.jsx`](./examples/SubmitButton.jsx)

---

## 6. Form Validation

You can validate inside your action and return an error message.

```jsx
async function signup(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  // Simple checks
  if (!email.includes("@")) {
    return { error: "Please enter a valid email." };
  }
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  await createAccount(email, password);
  return { success: "Account created!" };
}
```

Then show `state.error` in the UI (as in section 4 above). For instant, field-by-field validation you can still use controlled inputs — combine both approaches as needed.

---

## 7. Pending and Error States

Good forms tell the user what is happening. With React 19 you already have the tools:

- **Pending:** use `isPending` (from `useActionState`) or `pending` (from `useFormStatus`) to disable the button and show "Sending...".
- **Error:** return `{ error: "..." }` from your action and display it.
- **Success:** return `{ success: "..." }` and display it.

```jsx
<button disabled={isPending}>
  {isPending ? "Saving..." : "Save"}
</button>

{state?.error && <p className="error">{state.error}</p>}
```

This pattern — pending + error + success — is exactly the same idea as the three fetch states from Section 6. Learn it once, use it everywhere.

---

## 8. Resetting Forms

### The problem

After a successful submit, you often want to clear the form.

### The solution

When you use the `action` prop (not controlled state), React **automatically resets** the form's uncontrolled inputs after a successful action. You usually get this for free!

If you need to reset manually, you can use a `ref` to the form and call `form.reset()`, or change the form's `key` to force a fresh one. But for most cases, the automatic reset is enough.

```jsx
// With action forms, inputs clear automatically after success.
<form action={formAction}>
  <input name="text" />
  <SubmitButton />
</form>
```

---

## ✅ Section 7 Recap

- **Actions:** pass an `async` function to `<form action={...}>`. Read inputs with `formData.get("name")`.
- **`useActionState`:** gives `[state, formAction, isPending]` — result, action, and pending flag.
- **`useFormStatus`:** lets a child read the parent form's pending status (import from `react-dom`).
- **Validation:** check inside the action, return `{ error }` or `{ success }`.
- **Pending/error/success** states make forms feel professional.
- **Reset:** action forms clear automatically after success.

### Knowledge check

1. How do you read an input's value inside an action?
2. What three things does `useActionState` return?
3. Where must `useFormStatus` be imported from, and where must the component live?

<details>
<summary>Show answers</summary>

1. With `formData.get("name")`, where `name` is the input's `name` attribute.
2. `[state, formAction, isPending]` — the last returned result, the wrapped action for the form, and a pending boolean.
3. Imported from `react-dom`, and the component must be **inside** the `<form>` it reports on.

</details>

---

**Next up → [Section 8: Async UI and Optimistic Updates](../Section%2008%20-%20Async%20UI%20and%20Optimistic%20Updates/README.md)**
We make the UI feel instant with `useTransition` and `useOptimistic`. ⚡
