// NavigateState.jsx
// Sending small data between pages with navigate `state`,
// and reading it on the other side with useLocation.

import { useNavigate, useLocation } from "react-router-dom";

// Page A: sends data without putting it in the URL.
export function PageA() {
  const navigate = useNavigate();

  function goToDetails() {
    navigate("/details", { state: { from: "PageA", id: 42 } });
  }

  return <button onClick={goToDetails}>Go to details</button>;
}

// Page B: reads the data from location.state.
export function Details() {
  const location = useLocation();
  const data = location.state; // { from: "PageA", id: 42 } — or null

  if (!data) return <p>No data was sent.</p>;

  return (
    <div>
      <p>You came from: {data.from}</p>
      <p>Item id: {data.id}</p>
    </div>
  );
}
