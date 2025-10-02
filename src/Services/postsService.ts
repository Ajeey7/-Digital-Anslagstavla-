export type PostData = {
  id?: number;          // optional för nya poster
  title: string;
  content: string;
  authorId?: number;
  authorName?: string;
  category?: string;
};

// Hämta alla poster
export async function getPosts(): Promise<PostData[]> {
  const res = await fetch('/api/posts');
  return res.json();
}

// Skapa ett nytt inlägg
export async function createPost(post: PostData): Promise<PostData> {
  const res = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  return res.json();
}

// (Valfritt) hämta ett enskilt inlägg
export async function getPost(id: number): Promise<PostData | null> {
  const res = await fetch(`/api/posts/${id}`);
  if (!res.ok) return null;
  return res.json();
}
