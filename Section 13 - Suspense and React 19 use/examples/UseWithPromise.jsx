// UseWithPromise.jsx
// React 19 `use` + <Suspense>: read a promise directly, no loading state.

import { use, Suspense } from "react";

// IMPORTANT: create the promise OUTSIDE the component that calls `use`,
// so it is not recreated on every render. Here we make it once at module load.
const commentsPromise = fetchComments();

function Comments() {
  // `use` unwraps the promise. While it is pending, the nearest
  // <Suspense> shows its fallback automatically.
  const comments = use(commentsPromise);

  return (
    <ul>
      {comments.map((c) => (
        <li key={c.id}>{c.text}</li>
      ))}
    </ul>
  );
}

function UseWithPromise() {
  return (
    <Suspense fallback={<p>Loading comments...</p>}>
      <Comments />
    </Suspense>
  );
}

export default UseWithPromise;

// A fake async data source for the demo.
function fetchComments() {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          { id: 1, text: "Great post!" },
          { id: 2, text: "Thanks for sharing." },
        ]),
      1000
    )
  );
}
