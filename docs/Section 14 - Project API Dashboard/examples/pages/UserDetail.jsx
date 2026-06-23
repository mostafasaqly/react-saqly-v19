// UserDetail.jsx — the detail page for one user.
// Reads :id from the URL and fetches that single user.

import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch.jsx";
import { URLS } from "../services/api.js";
import Skeleton from "../components/Skeleton.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

function UserDetail() {
  const { id } = useParams();
  const { data: user, loading, error, reload } = useFetch(URLS.user(id));

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <Link to="/">← Back to list</Link>

      {loading && <Skeleton />}
      {error && <ErrorMessage message={error} onRetry={reload} />}

      {user && (
        <div>
          <h1>{user.name}</h1>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
          <p>Company: {user.company?.name}</p>
          <p>
            City: {user.address?.city}
          </p>
        </div>
      )}
    </div>
  );
}

export default UserDetail;
