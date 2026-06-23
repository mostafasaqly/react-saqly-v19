// TransitionButton.jsx
// useTransition: run slow async work without freezing the UI.
// You get [isPending, startTransition].

import { useState, useTransition } from "react";

function TransitionButton() {
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleClick() {
    // Wrap the slow work in startTransition.
    startTransition(async () => {
      await fakeSave();
      setSaved(true);
    });
  }

  return (
    <button onClick={handleClick} disabled={isPending}>
      {isPending ? "Saving..." : saved ? "Saved ✓" : "Save"}
    </button>
  );
}

function fakeSave() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

export default TransitionButton;
