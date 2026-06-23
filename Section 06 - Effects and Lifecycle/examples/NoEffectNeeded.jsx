// NoEffectNeeded.jsx
// Shows two things that DON'T need useEffect.

import { useState } from "react";

function NoEffectNeeded() {
  const [first, setFirst] = useState("Sara");
  const [last, setLast] = useState("Ali");

  // ✅ DERIVE during render — no effect, no extra state.
  const fullName = `${first} ${last}`;

  // ✅ Respond to the event in the handler — no effect watching state.
  function handleGreet() {
    alert(`Hello, ${fullName}!`);
  }

  return (
    <div>
      <input value={first} onChange={(e) => setFirst(e.target.value)} />
      <input value={last} onChange={(e) => setLast(e.target.value)} />
      <p>Full name: {fullName}</p>
      <button onClick={handleGreet}>Greet</button>
    </div>
  );
}

export default NoEffectNeeded;

// Compare with the WRONG approach (don't do this):
//   const [fullName, setFullName] = useState("");
//   useEffect(() => { setFullName(`${first} ${last}`); }, [first, last]);
// That adds extra state and an extra render for no reason.
