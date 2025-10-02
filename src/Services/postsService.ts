// src/services/postsService.ts
export interface Post {
  id?: number;
  title: string;
  content: string;
  category?: string;
  authorId?: number;
  authorName?: string;
}

// Hämta alla inlägg
export async function getAll(): Promise<Post[]> {
  const res = await fetch('/api/posts');
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

// Hämta ett inlägg via ID
export async function getById(id: number): Promise<Post> {
  const res = await fetch(`/api/posts/${id}`);
  if (!res.ok) throw new Error('Failed to fetch post');
  return res.json();
}

// Skapa nytt inlägg
export async function create(post: Post): Promise<void> {
  const res = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error('Failed to create post');
}

// Uppdatera ett inlägg
export async function update(id: number, post: Post): Promise<void> {
  const res = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error('Failed to update post');
}

// Ta bort ett inlägg
export async function remove(id: number): Promise<void> {
  const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete post');
}

