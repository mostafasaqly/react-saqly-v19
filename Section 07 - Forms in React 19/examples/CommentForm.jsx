// CommentForm.jsx
// React 19 ACTIONS: pass an async function to the form's `action` prop.
// Inputs use `name`, and we read them from formData. No preventDefault needed.

function CommentForm() {
  // An action is an async function that receives the form's data.
  async function submitComment(formData) {
    const text = formData.get("text"); // read input by its name="text"
    console.log("Sending:", text);
    await fakeSave(text);               // pretend to call a server
    console.log("Saved!");
  }

  return (
    <form action={submitComment}>
      <input name="text" placeholder="Write a comment" />
      <button type="submit">Post</button>
    </form>
  );
}

// A fake async server call for the demo.
function fakeSave(text) {
  return new Promise((resolve) => setTimeout(resolve, 800));
}

export default CommentForm;
