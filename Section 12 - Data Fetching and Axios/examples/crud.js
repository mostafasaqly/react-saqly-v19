// crud.js
// All four CRUD operations with Axios against a REST API.
// Demo API: https://jsonplaceholder.typicode.com/posts

import axios from "axios";

const API = "https://jsonplaceholder.typicode.com/posts";

// READ — GET all posts
export async function getPosts() {
  const { data } = await axios.get(API);
  return data;
}

// CREATE — POST a new post
export async function createPost(title) {
  const { data } = await axios.post(API, { title });
  return data;
}

// UPDATE — PUT an existing post
export async function updatePost(id, title) {
  const { data } = await axios.put(`${API}/${id}`, { title });
  return data;
}

// DELETE — remove a post
export async function deletePost(id) {
  await axios.delete(`${API}/${id}`);
  return true;
}

// Note: Axios throws on HTTP errors, so wrap calls in try/catch where you use them.
