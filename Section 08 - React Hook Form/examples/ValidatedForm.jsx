// ValidatedForm.jsx
// Validation rules go in register's second argument.
// Error messages come from formState.errors.

import { useForm } from "react-hook-form";

function ValidatedForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    alert("Valid! " + JSON.stringify(data));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Required */}
      <input
        {...register("username", { required: "Username is required" })}
        placeholder="Username"
      />
      {errors.username && (
        <small style={{ color: "red" }}>{errors.username.message}</small>
      )}

      {/* Required + pattern */}
      <input
        {...register("email", {
          required: "Email is required",
          pattern: { value: /^\S+@\S+$/, message: "Enter a valid email" },
        })}
        placeholder="Email"
      />
      {errors.email && (
        <small style={{ color: "red" }}>{errors.email.message}</small>
      )}

      {/* Required + min length */}
      <input
        type="password"
        {...register("password", {
          required: "Password is required",
          minLength: { value: 6, message: "At least 6 characters" },
        })}
        placeholder="Password"
      />
      {errors.password && (
        <small style={{ color: "red" }}>{errors.password.message}</small>
      )}

      <button type="submit">Sign up</button>
    </form>
  );
}

export default ValidatedForm;
