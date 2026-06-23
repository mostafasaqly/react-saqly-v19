// api.js — all API calls live here, in ONE place, using Axios.
// If the base URL changes, you edit it only here.

import axios from "axios";

const BASE = "https://jsonplaceholder.typicode.com";

// In a real app: baseURL: import.meta.env.VITE_API_URL
const api = axios.create({ baseURL: BASE });

export async function getUsers() {
  const { data } = await api.get("/users");
  return data;
}

export async function getUser(id) {
  const { data } = await api.get(`/users/${id}`);
  return data;
}

// Full URLs for the useFetch hook (it builds its own request).
export const URLS = {
  users: `${BASE}/users`,
  user: (id) => `${BASE}/users/${id}`,
};

export default api;
