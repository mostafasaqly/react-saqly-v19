# Section 7: Forms in React 19

> **React 19 Course** — Section 7 of 21
> Level: Intermediate

Forms are everywhere: login, search, comments, checkout. React 19 makes forms much easier with a feature called **Actions** and three helpful hooks. This is one of the biggest reasons to learn React 19.

---

## Table of Contents

1. [Controlled Forms Review](#1-controlled-forms-review)
2. [Form Submission](#2-form-submission)
3. [Manual Form Validation](#3-manual-form-validation)
4. [React 19 Actions](#4-react-19-actions)
5. [`useActionState`](#5-useactionstate)
6. [`useFormStatus`](#6-useformstatus)
7. [Pending and Error States](#7-pending-and-error-states)
8. [Resetting Forms](#8-resetting-forms)
9. [Handling Form Errors](#9-handling-form-errors)
10. [React 19 Form Best Practices](#10-react-19-form-best-practices)

📁 **Code for this section:** see the [`examples/`](./examples) folder.

---

## 1. Controlled Forms Review

From Section 5, a **controlled input** keeps its value in state:

```jsx
const [email, setEmail] = useState("");

<input value={email} onChange={(e) => setEmail(e.target.value)} />
```

This is still useful — for a live preview or instant validation. But for *submitting*, React 19 gives a simpler path. Let's build up to it.

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

This works, but you manage state, pending, and errors all by hand. React 19 does most of that for you.

---

## 3. Manual Form Validation

Before React 19's tools, you check the values yourself and store error messages in state. Knowing this helps you understand what the newer tools automate.

```jsx
function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  function validate() {
    const next = {};
    if (!email.includes("@")) next.email = "Enter a valid email.";
    if (password.length < 6) next.password = "At least 6 characters.";
    setErrors(next);
    // Valid only if there are no error keys.
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return; // stop if invalid
    console.log("All good, submitting!");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && (
        <small style={{ color: "red" }}>{errors.password}</small>
      )}

      <button type="submit">Sign up</button>
    </form>
  );
}
```

**The pattern:** check each field → collect messages in an `errors` object → show them next to the inputs → only submit if there are none.

> 💡 This manual style works, but it's a lot of code. Section 8 (React Hook Form) and React 19 Actions both reduce it.

👉 See [`examples/ManualValidation.jsx`](./examples/ManualValidation.jsx)

---

## 4. React 19 Actions

### The problem

A real submit usually does something **async** (sends data to a server). You then track "is it submitting?", "did it fail?". That's a lot of manual `useState`.

### The solution: Actions

In React 19, pass an **async function** to a form's `action` prop. React calls it with the form data and manages the pending state. No `preventDefault`, no manual state.

```jsx
function CommentForm() {
  async function submitComment(formData) {
    const text = formData.get("text"); // read input by its `name`
    await saveToServer(text);
  }

  return (
    <form action={submitComment}>
      <input name="text" />            {/* use `name`, not value/state */}
      <button type="submit">Post</button>
    </form>
  );
}
```

**Key idea:** give inputs a `name`, read them with `formData.get("name")`. React handles the rest.

👉 See [`examples/CommentForm.jsx`](./examples/CommentForm.jsx)

---

## 5. `useActionState`

### The problem

You want to show the **result** of an action (success or error) and know when it's **pending**.

### The solution: `useActionState`

This hook wraps your action and returns the latest **state** (result), a **wrapped action**, and a **pending** boolean.

```jsx
import { useActionState } from "react";

function CommentForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const text = formData.get("text");
      if (!text) return { error: "Text is required" };
      await saveToServer(text);
      return { success: "Comment posted!" };
    },
    null // starting state
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
- `isPending` — `true` while the action runs.

👉 See [`examples/UseActionStateForm.jsx`](./examples/UseActionStateForm.jsx)

---

## 6. `useFormStatus`

### The problem

You built a reusable `SubmitButton`. It needs to know if the parent form is submitting — without props.

### The solution: `useFormStatus`

This hook lets a child read the status of the `<form>` **above** it.

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

> ⚠️ **Import note:** `useFormStatus` comes from **`react-dom`**, not `react`. The component must be **inside** the `<form>`.

👉 See [`examples/SubmitButton.jsx`](./examples/SubmitButton.jsx)

---

## 7. Pending and Error States

Good forms tell the user what's happening. With React 19 you already have the tools:

- **Pending:** use `isPending` (from `useActionState`) or `pending` (from `useFormStatus`) to disable the button and show "Sending...".
- **Error:** return `{ error: "..." }` from your action and display it.
- **Success:** return `{ success: "..." }` and display it.

```jsx
<button disabled={isPending}>{isPending ? "Saving..." : "Save"}</button>
{state?.error && <p className="error">{state.error}</p>}
```

This pending + error + success pattern is the same idea as the three fetch states from Section 6.

---

## 8. Resetting Forms

### The problem

After a successful submit, you often want to clear the form.

### The solution

When you use the `action` prop (not controlled state), React **automatically resets** the form's uncontrolled inputs after a successful action. You usually get this for free.

If you need to reset manually, keep a `ref` to the form and call `form.reset()`, or change the form's `key` to force a fresh one.

```jsx
<form action={formAction}>
  <input name="text" />
  <SubmitButton />
</form>
```

---

## 9. Handling Form Errors

Errors come in two kinds. Handle both:

**1. Validation errors** (the user's input is wrong) — return a message from the action:
```jsx
if (!email.includes("@")) {
  return { error: "Please enter a valid email." };
}
```

**2. Server/network errors** (something failed) — wrap the request in `try/catch`:
```jsx
async (prevState, formData) => {
  try {
    await saveToServer(formData.get("text"));
    return { success: "Saved!" };
  } catch (err) {
    return { error: "Could not save. Please try again." };
  }
}
```

Because you **return** the error into `state`, the form re-renders with the message and the user can fix and retry. Keep what they typed so they don't start over.

👉 See [`examples/FormErrors.jsx`](./examples/FormErrors.jsx)

---

## 10. React 19 Form Best Practices

A checklist for forms that feel professional:

1. **Prefer Actions** over manual `onSubmit` + `preventDefault` for submitting.
2. **Validate in the action**, return `{ error }` — don't throw for normal validation.
3. **Wrap server calls in try/catch** so network failures show a friendly message.
4. **Show pending state** (`isPending` / `useFormStatus`) — disable the button, change its label.
5. **Make a reusable `SubmitButton`** with `useFormStatus` and drop it into any form.
6. **Use the right input `type`** (`email`, `password`, `number`) and `name` attributes.
7. **Keep the user's input on error** — don't clear the form when validation fails.
8. **Add HTML attributes** like `required` and `minLength` for instant browser hints (a free first layer).

> 🧠 **Big picture:** describe *what* should happen in an action; let React manage *pending, error, and reset* for you.

---

## ✅ Section 7 Recap

- **Manual validation:** check values, store messages in an `errors` object, show them.
- **Actions:** pass an `async` function to `<form action={...}>`; read inputs with `formData.get("name")`.
- **`useActionState`:** `[state, formAction, isPending]`.
- **`useFormStatus`:** child reads parent form's pending status (from `react-dom`).
- **Pending / error / success** states make forms feel solid.
- **Reset:** action forms clear automatically after success.
- **Handle both** validation and server errors; keep the user's input.

### Knowledge check

1. How do you read an input's value inside an action?
2. What does `useActionState` return?
3. What's the difference between a validation error and a server error, and how do you handle each?

<details>
<summary>Show answers</summary>

1. With `formData.get("name")`, where `name` is the input's `name` attribute.
2. `[state, formAction, isPending]` — the last returned result, the wrapped action for the form, and a pending boolean.
3. A validation error means the input is wrong — check it and `return { error }`. A server error means a request failed — wrap it in `try/catch` and `return { error }`. Both put a message in `state` so the form re-renders with it.

</details>

---

**Next up → [Section 8: React Hook Form](../Section%2008%20-%20React%20Hook%20Form/README.md)**
A popular library that makes big, validated forms easy. 📋
