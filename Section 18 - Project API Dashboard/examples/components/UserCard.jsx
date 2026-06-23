// UserCard.jsx — one user in the list. Clicking it goes to the detail page.
// We pass the whole user via `state` so the detail page can skip re-fetching.

import { Link } from "react-router-dom";

function UserCard({ user }) {
  return (
    <Link
      to={`/users/${user.id}`}
      state={{ user }} // carry the user data to the detail page
      style={{
        display: "block",
        padding: 12,
        margin: "8px 0",
        border: "1px solid #ddd",
        borderRadius: 8,
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <strong>{user.name}</strong>
      <div style={{ color: "#666", fontSize: 14 }}>{user.email}</div>
    </Link>
  );
}

export default UserCard;
