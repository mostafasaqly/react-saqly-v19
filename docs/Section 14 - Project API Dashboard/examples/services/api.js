// api.js — all API calls live here, in ONE place.
// If the base URL changes, you edit it only here.

const BASE = "https://jsonplaceholder.typicode.com";

export async function getUsers() {
  const res = await fetch(`${BASE}/users`);
  if (!res.ok) throw new Error("Failed to load users");
  return res.json();
}

export async function getUser(id) {
  const res = await fetch(`${BASE}/users/${id}`);
  if (!res.ok) throw new Error("Failed to load user");
  return res.json();
}

// We also export the URLs so the useFetch hook can use them directly.
export const URLS = {
  users: `${BASE}/users`,
  user: (id) => `${BASE}/users/${id}`,
};
