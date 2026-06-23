// LikeButton.jsx
// useOptimistic: show the expected value INSTANTLY, before the server replies.
// If the request fails, React rolls back to the true value automatically.

import { useState, useOptimistic } from "react";

function LikeButton() {
  const [likes, setLikes] = useState(0); // the "real" value

  // optimisticLikes shows the guessed value during the action.
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (current) => current + 1 // how to compute the optimistic value
  );

  async function handleLike() {
    // 1) UI jumps up immediately.
    addOptimisticLike();
    // 2) Real request runs in the background.
    const saved = await fakeLike(likes + 1);
    // 3) Commit the real value.
    setLikes(saved);
  }

  return <button onClick={handleLike}>❤️ {optimisticLikes}</button>;
}

function fakeLike(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), 700));
}

export default LikeButton;
