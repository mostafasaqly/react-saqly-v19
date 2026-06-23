// UsersList.jsx
// Using an async slice in a component:
// dispatch the thunk once, then read isLoading / isError / list.

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "./usersSlice";

function UsersList() {
  const dispatch = useDispatch();
  const { list, isLoading, isError, message } = useSelector(
    (state) => state.users
  );

  // Kick off the fetch when the component first appears.
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p style={{ color: "red" }}>Error: {message}</p>;

  return (
    <ul>
      {list.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default UsersList;
