// BasicForm.jsx
// The simplest React Hook Form: register inputs, handle submit.
// No useState, no onChange — RHF collects the values for you.

import { useForm } from "react-hook-form";

function BasicForm() {
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    // data is one object with all field values.
    console.log(data); // { username: "...", email: "..." }
    alert(JSON.stringify(data, null, 2));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} placeholder="Username" />
      <input {...register("email")} placeholder="Email" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default BasicForm;
