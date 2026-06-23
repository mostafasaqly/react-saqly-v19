// ApiForm.jsx
// Submitting to an API. onSubmit is async; isSubmitting shows pending.

import { useForm } from "react-hook-form";

function ApiForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    try {
      await fakeSignup(data); // pretend to POST to a server
      reset();                // clear the form on success
      alert("Signed up!");
    } catch (err) {
      alert("Something went wrong. Try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", { required: "Email is required" })}
        placeholder="Email"
      />
      {errors.email && (
        <small style={{ color: "red" }}>{errors.email.message}</small>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Sign up"}
      </button>
    </form>
  );
}

function fakeSignup(data) {
  return new Promise((resolve) => setTimeout(resolve, 800));
}

export default ApiForm;
