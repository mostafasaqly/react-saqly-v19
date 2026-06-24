import { useParams, useLocation, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch.jsx";
import { URLS } from "../services/api.js";
import Skeleton from "../components/Skeleton.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

function UserDetail() {
  const { id } = useParams();
  const location = useLocation();
  const passedUser = location.state?.user;

  // Skip fetch if we already have the user from navigation state
  const { data: fetchedUser, loading, error, reload } = useFetch(
    passedUser ? null : URLS.user(id)
  );

  const user = passedUser || fetchedUser;
  const initial = user?.name?.charAt(0).toUpperCase();

  return (
    <div className="page">
      <Link to="/" className="back-link">← Back to list</Link>

      {loading && (
        <>
          <Skeleton short />
          <Skeleton />
        </>
      )}
      {error && <ErrorMessage message={error} onRetry={reload} />}

      {user && (
        <div className="user-detail">
          <div className="user-detail__avatar">{initial}</div>
          <h1 className="user-detail__name">{user.name}</h1>
          <div className="user-detail__fields">
            <Field label="Email"   value={user.email} />
            <Field label="Phone"   value={user.phone} />
            <Field label="Website" value={user.website} />
            <Field label="Company" value={user.company?.name} />
            <Field label="City"    value={user.address?.city} />
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value }) {
  if (!value) return null;
  return (
    <div className="user-detail__field">
      <span className="user-detail__label">{label}</span>
      <span className="user-detail__value">{value}</span>
    </div>
  );
}

export default UserDetail;
