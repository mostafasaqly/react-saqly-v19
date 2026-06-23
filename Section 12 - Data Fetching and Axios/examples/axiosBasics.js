// axiosBasics.js
// The four request types with Axios. Data is always in response.data.

import axios from "axios";

const API = "https://jsonplaceholder.typicode.com";

// GET — read
export async function getPosts() {
  const { data } = await axios.get(`${API}/posts`);
  return data;
}

// POST — create. Pass the body directly (no JSON.stringify).
export async function createPost(title) {
  const { data } = await axios.post(`${API}/posts`, { title });
  return data;
}

// PUT — replace the whole item.
export async function replacePost(id, post) {
  const { data } = await axios.put(`${API}/posts/${id}`, post);
  return data;
}

// PATCH — change only some fields.
export async function patchPost(id, fields) {
  const { data } = await axios.patch(`${API}/posts/${id}`, fields);
  return data;
}

// DELETE — remove.
export async function removePost(id) {
  await axios.delete(`${API}/posts/${id}`);
}
