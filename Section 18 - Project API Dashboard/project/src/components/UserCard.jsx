import { Link } from "react-router-dom";

function UserCard({ user }) {
  const initial = user.name.charAt(0).toUpperCase();

  return (
    <Link
      to={`/users/${user.id}`}
      state={{ user }}
      className="user-card"
    >
      <div className="user-card__avatar">{initial}</div>
      <div className="user-card__info">
        <div className="user-card__name">{user.name}</div>
        <div className="user-card__email">{user.email}</div>
      </div>
      <span className="user-card__arrow">›</span>
    </Link>
  );
}

export default UserCard;
