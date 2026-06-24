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

  const visibleUsers = (users || []).filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <div className="page-header">
        <h1>Users Dashboard</h1>
        <p>Fetched from JSONPlaceholder API</p>
      </div>

      <SearchBar value={search} onChange={setSearch} />

      {loading && (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      )}

      {error && <ErrorMessage message={error} onRetry={reload} />}

      {!loading && !error && visibleUsers.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}

      {!loading && !error && visibleUsers.length === 0 && (
        <p className="empty-state">No users match your search.</p>
      )}
    </div>
  );
}

export default Dashboard;
