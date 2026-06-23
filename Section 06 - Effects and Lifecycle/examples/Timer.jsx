// Timer.jsx
// CLEANUP: an effect that starts a timer must also stop it.
// We return a cleanup function from the effect.

import { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Start a timer that ticks every second.
    const id = setInterval(() => {
      // Use the function form so we always get the latest value.
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Cleanup: React calls this when the component is removed,
    // or before the effect runs again. It stops the timer.
    return () => clearInterval(id);
  }, []); // [] = set up the timer once

  return <p>Seconds on screen: {seconds}</p>;
}

export default Timer;

// Without the cleanup, every time this component mounts/unmounts you would
// leave a timer running in the background — a memory leak.
