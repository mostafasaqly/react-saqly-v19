// Dashboard.jsx — the list page with search.
// Shows skeletons while loading and an error UI on failure.

import { useState } from "react";
import useFetch from "../hooks/useFetch.jsx";
import { URLS } from "../services/api.js";
import SearchBar from "../components/SearchBar.jsx";
import UserCard from "../components/UserCard.jsx";
import Skeleton from "../components/Skeleton.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

function Dashboard() {
  const { data: users, loading, error, reload } = useFetch(URLS.users);
  const [search, setSearch] = useState("");

  // DERIVED STATE: filter the fetched users by the search text.
  const visibleUsers = (users || []).filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h1>Users Dashboard</h1>
      <SearchBar value={search} onChange={setSearch} />

      {/* LOADING: show a few skeletons. */}
      {loading && (
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      )}

      {/* ERROR: friendly message with retry. */}
      {error && <ErrorMessage message={error} onRetry={reload} />}

      {/* DATA: the filtered list. */}
      {!loading &&
        !error &&
        visibleUsers.map((user) => <UserCard key={user.id} user={user} />)}

      {!loading && !error && visibleUsers.length === 0 && (
        <p>No users match your search.</p>
      )}
    </div>
  );
}

export default Dashboard;
