// UserDetail.jsx — the detail page for one user.
// Uses the user passed via navigate state if present (fast),
// otherwise falls back to fetching by the :id route param (reliable).

import { useParams, useLocation, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch.jsx";
import { URLS } from "../services/api.js";
import Skeleton from "../components/Skeleton.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

function UserDetail() {
  const { id } = useParams();              // always from the URL
  const location = useLocation();
  const passedUser = location.state?.user; // only when navigated from the list

  // Skip fetching if we already have the user (pass null to useFetch).
  const { data: fetchedUser, loading, error, reload } = useFetch(
    passedUser ? null : URLS.user(id)
  );

  const user = passedUser || fetchedUser;

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
          <p>City: {user.address?.city}</p>
        </div>
      )}
    </div>
  );
}

export default UserDetail;
