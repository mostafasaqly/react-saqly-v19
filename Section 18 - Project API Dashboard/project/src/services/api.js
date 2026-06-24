import axios from "axios";

const BASE = "https://jsonplaceholder.typicode.com";

const api = axios.create({ baseURL: BASE });

export async function getUsers() {
  const { data } = await api.get("/users");
  return data;
}

export async function getUser(id) {
  const { data } = await api.get(`/users/${id}`);
  return data;
}

export const URLS = {
  users: `${BASE}/users`,
  user: (id) => `${BASE}/users/${id}`,
};

export default api;
