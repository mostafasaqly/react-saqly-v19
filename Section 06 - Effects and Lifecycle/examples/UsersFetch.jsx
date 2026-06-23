// UsersFetch.jsx
// Fetching data with useEffect. Always handle the THREE states:
// loading, error, and data.

import { useState, useEffect } from "react";

function UsersFetch() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Failed to load users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []); // load once when the component first appears

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default UsersFetch;
