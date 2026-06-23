# Section 8: React Hook Form

> **React 19 Course** — Section 8 of 21
> Level: Intermediate

In Section 7 we wrote validation by hand. For big forms that gets long and repetitive. **React Hook Form** is a popular library that handles inputs, validation, and errors with very little code — and it's fast.

---

## Table of Contents

1. [Why React Hook Form?](#1-why-react-hook-form)
2. [Installing React Hook Form](#2-installing-react-hook-form)
3. [Creating Your First Form](#3-creating-your-first-form)
4. [Registering Inputs](#4-registering-inputs)
5. [Handling Submit](#5-handling-submit)
6. [Required Field Validation](#6-required-field-validation)
7. [Pattern and Min Length Validation](#7-pattern-and-min-length-validation)
8. [Showing Error Messages](#8-showing-error-messages)
9. [Default Values](#9-default-values)
10. [Resetting Forms](#10-resetting-forms)
11. [React Hook Form with API Submit](#11-react-hook-form-with-api-submit)
12. [React Hook Form vs React 19 Actions](#12-react-hook-form-vs-react-19-actions)

📁 **Code for this section:** see the [`examples/`](./examples) folder.

---

## 1. Why React Hook Form?

### The problem

Manual forms (Section 7, lesson 3) need a `useState` for every field, an `onChange` for every input, and your own validation and error objects. For a form with 8 fields, that's a lot of repeated code — and every keystroke re-renders the whole form.

### The solution: React Hook Form (RHF)

RHF gives you:
- **Less code** — no `useState` per field.
- **Built-in validation** — required, min length, patterns, and more.
- **Fast** — it uses uncontrolled inputs under the hood, so typing doesn't re-render everything.
- **Easy errors** — error messages are ready for you to show.

> 💡 RHF is one of the most-used form libraries in React jobs. Worth knowing well.

---

## 2. Installing React Hook Form

```bash
npm install react-hook-form
```

That's it — one small package, no extra setup.

---

## 3. Creating Your First Form

Everything starts with the `useForm` hook. It gives you tools to connect and submit your form.

```jsx
import { useForm } from "react-hook-form";

function MyForm() {
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data); // { username: "...", email: "..." }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} />
      <input {...register("email")} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

Notice: **no `useState`, no `onChange`.** RHF collects all the values for you and hands them to `onSubmit` as one `data` object.

---

## 4. Registering Inputs

`register("name")` connects an input to the form. The string is the field's name — it becomes the key in your `data` object.

```jsx
<input {...register("email")} />
// data will be: { email: "what the user typed" }
```

The `{...register("email")}` spread adds the needed props (`name`, `onChange`, `onBlur`, `ref`) to the input automatically. You just give it a name.

👉 See [`examples/BasicForm.jsx`](./examples/BasicForm.jsx)

---

## 5. Handling Submit

Wrap your submit function with `handleSubmit`. RHF will:
1. Run validation.
2. If everything is valid, call **your** function with the data.
3. If not, stop and fill the `errors` object instead.

```jsx
const { register, handleSubmit } = useForm();

function onSubmit(data) {
  // Only runs when the form is valid.
  console.log("Valid data:", data);
}

<form onSubmit={handleSubmit(onSubmit)}>...</form>
```

You never call `e.preventDefault()` — `handleSubmit` does it for you.

---

## 6. Required Field Validation

Pass rules as the **second argument** to `register`. The simplest is `required`.

```jsx
<input {...register("username", { required: "Username is required" })} />
```

The message (`"Username is required"`) is what shows if the field is empty when the user submits.

---

## 7. Pattern and Min Length Validation

You can add more rules in the same object:

```jsx
<input
  {...register("email", {
    required: "Email is required",
    pattern: {
      value: /^\S+@\S+$/,            // a simple email pattern
      message: "Enter a valid email",
    },
  })}
/>

<input
  type="password"
  {...register("password", {
    required: "Password is required",
    minLength: { value: 6, message: "At least 6 characters" },
  })}
/>
```

Common rules: `required`, `minLength`, `maxLength`, `pattern`, `min`, `max`, and `validate` (for custom checks).

👉 See [`examples/ValidatedForm.jsx`](./examples/ValidatedForm.jsx)

---

## 8. Showing Error Messages

Pull `formState: { errors }` from `useForm`. Each failed field appears in `errors` with its message.

```jsx
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();

<input {...register("email", { required: "Email is required" })} />
{errors.email && <small style={{ color: "red" }}>{errors.email.message}</small>}
```

`errors.email.message` is the exact text you wrote in the rule. Show it right next to the input.

---

## 9. Default Values

Give the form starting values with `defaultValues`. Great for "edit" forms that load existing data.

```jsx
const { register, handleSubmit } = useForm({
  defaultValues: {
    username: "sara",
    email: "sara@example.com",
  },
});
```

Now the inputs start filled with those values.

---

## 10. Resetting Forms

`reset()` clears the form (or sets it back to default values). Call it after a successful submit.

```jsx
const { register, handleSubmit, reset } = useForm();

function onSubmit(data) {
  console.log(data);
  reset(); // clear all fields
  // reset({ username: "" }); // or set specific values
}
```

👉 See [`examples/EditForm.jsx`](./examples/EditForm.jsx)

---

## 11. React Hook Form with API Submit

Real forms send data to a server. Make `onSubmit` async and handle loading/errors. `isSubmitting` (from `formState`) tells you when it's busy.

```jsx
const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting },
} = useForm();

async function onSubmit(data) {
  try {
    await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    reset(); // clear on success
  } catch (err) {
    alert("Something went wrong. Try again.");
  }
}

<button type="submit" disabled={isSubmitting}>
  {isSubmitting ? "Saving..." : "Sign up"}
</button>
```

`isSubmitting` is `true` while your async `onSubmit` runs — perfect for disabling the button.

👉 See [`examples/ApiForm.jsx`](./examples/ApiForm.jsx)

---

## 12. React Hook Form vs React 19 Actions

Both handle forms well. Which should you use?

| | React Hook Form | React 19 Actions |
| --- | --- | --- |
| Comes from | A library (install it) | Built into React 19 |
| Validation | Rich, built-in rules | You write it in the action |
| Best for | Big forms, complex validation | Simple forms, server actions |
| Pending state | `isSubmitting` | `isPending` / `useFormStatus` |
| Re-renders | Very few (fast) | Normal |

**When to use which:**
- **React Hook Form** — large forms with many fields and detailed validation (signup, checkout, settings).
- **React 19 Actions** — simple forms, or when you want zero dependencies and like the built-in pending/reset.

> 🧠 They aren't enemies. Many apps use Actions for simple forms and RHF for the big, complex ones.

---

## ✅ Section 8 Recap

- **React Hook Form** handles inputs, validation, and errors with little code.
- **`useForm`** gives `register`, `handleSubmit`, `reset`, and `formState`.
- **`register("name")`** connects an input; the name becomes the data key.
- **Validation rules** go in `register`'s second argument (`required`, `minLength`, `pattern`...).
- **`errors.field.message`** shows the message you wrote.
- **`defaultValues`** prefill; **`reset()`** clears; **`isSubmitting`** shows pending.
- **vs Actions:** RHF for big/complex forms, Actions for simple/built-in ones.

### Knowledge check

1. What does `register("email")` do?
2. Where do you put validation rules like `required`?
3. When would you choose RHF over React 19 Actions?

<details>
<summary>Show answers</summary>

1. It connects the input to the form and makes `email` a key in the submitted `data` object.
2. In the second argument to `register`, e.g. `register("email", { required: "..." })`.
3. For big forms with many fields and complex validation, where RHF's built-in rules and fewer re-renders shine.

</details>

---

**Next up → [Section 9: Async UI and Optimistic Updates](../Section%2009%20-%20Async%20UI%20and%20Optimistic%20Updates/README.md)**
Make the UI feel instant with transitions and optimistic updates. ⚡
