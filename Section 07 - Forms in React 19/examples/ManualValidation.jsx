// ManualValidation.jsx
// Manual form validation: check values yourself, store messages in state.

import { useState } from "react";

function ManualValidation() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  function validate() {
    const next = {};
    if (!email.includes("@")) next.email = "Enter a valid email.";
    if (password.length < 6) next.password = "At least 6 characters.";
    setErrors(next);
    return Object.keys(next).length === 0; // valid if no errors
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return; // stop if invalid
    alert("All good, submitting!");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}

      <input
        type="password"
        placeholder="Password"
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

export default ManualValidation;
