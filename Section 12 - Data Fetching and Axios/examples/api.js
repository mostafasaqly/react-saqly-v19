// api.js
// A reusable API service built on ONE axios instance.
// The base URL lives here only — change it in one place.

import axios from "axios";

const api = axios.create({
  // In a real app: baseURL: import.meta.env.VITE_API_URL
  baseURL: "https://jsonplaceholder.typicode.com",
});

// Small, clean functions for the rest of the app to call.
export const getPosts = () => api.get("/posts").then((r) => r.data);
export const getPost = (id) => api.get(`/posts/${id}`).then((r) => r.data);
export const createPost = (data) => api.post("/posts", data).then((r) => r.data);
export const updatePost = (id, data) =>
  api.put(`/posts/${id}`, data).then((r) => r.data);
export const deletePost = (id) => api.delete(`/posts/${id}`);

export default api;
