// EditForm.jsx
// defaultValues prefill the form (great for editing existing data).
// reset() clears the form or sets it back to values.

import { useForm } from "react-hook-form";

function EditForm() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      username: "sara",
      email: "sara@example.com",
    },
  });

  function onSubmit(data) {
    console.log("Saved:", data);
    // After saving you could reset to the new values:
    // reset(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} />
      <input {...register("email")} />

      <button type="submit">Save</button>
      {/* Clear everything back to defaultValues */}
      <button type="button" onClick={() => reset()}>
        Reset
      </button>
    </form>
  );
}

export default EditForm;
