// UserForm.jsx
// Updating an OBJECT in state. Never change a field directly.
// Make a NEW object with the spread operator { ...old, field: newValue }.

import { useState } from "react";

function UserForm() {
  const [user, setUser] = useState({ name: "Sara", age: 25 });

  function updateName(newName) {
    // Copy all old fields, then overwrite `name`.
    setUser({ ...user, name: newName });
  }

  function haveBirthday() {
    // Update based on the previous object — safest with a function.
    setUser((prev) => ({ ...prev, age: prev.age + 1 }));
  }

  return (
    <div>
      <input
        value={user.name}
        onChange={(e) => updateName(e.target.value)}
      />
      <p>
        {user.name} is {user.age} years old.
      </p>
      <button onClick={haveBirthday}>Birthday 🎂</button>
    </div>
  );
}

export default UserForm;
