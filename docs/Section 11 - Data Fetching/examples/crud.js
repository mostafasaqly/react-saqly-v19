// crud.js
// All four CRUD operations against a REST API.
// Demo API: https://jsonplaceholder.typicode.com/posts

const API = "https://jsonplaceholder.typicode.com/posts";

// READ — GET all posts
export async function getPosts() {
  const res = await fetch(API);
  if (!res.ok) throw new Error("Failed to load posts");
  return res.json();
}

// CREATE — POST a new post
export async function createPost(title) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
}

// UPDATE — PUT an existing post
export async function updatePost(id, title) {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error("Failed to update post");
  return res.json();
}

// DELETE — remove a post
export async function deletePost(id) {
  const res = await fetch(`${API}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete post");
  return true;
}
