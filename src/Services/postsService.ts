// src/services/postsService.ts
import type { Post } from '../interfaces/Post';

import { request } from '../utils/request';

const LS_KEY = 'posts';

export async function getAll(): Promise<Post[]> {
  try {
    return await request<Post[]>('/api/posts');
  } catch {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw) as Post[];
    const seed: Post[] = [
      { id: String(Date.now()), title: 'Välkommen till Anslagstavlan', content: 'Skapa ditt första inlägg via knappen ”Nytt”.', createdAt: new Date().toISOString(), category: 'Info' },
      { id: String(Date.now() - 1), title: 'Säljes: Cykel i fint skick', content: 'Hybridcykel, 3 växlar. Pris 1200 kr. PM vid intresse.', createdAt: new Date(Date.now() - 86400000).toISOString(), category: 'Säljes' },
      { id: String(Date.now() - 2), title: 'Evenemang: Loppis i parken', content: 'Söndag kl 10–14 vid stadsparken. Boka bord!', createdAt: new Date(Date.now() - 172800000).toISOString(), category: 'Evenemang' }
    ];
    localStorage.setItem(LS_KEY, JSON.stringify(seed));
    return seed;
  }
}

export async function getById(id: number): Promise<Post> {
  try {
    return await request<Post>(`/api/posts/${id}`);
  } catch {
    const all = await getAll();
    const found = all.find(p => String(p.id) === String(id));
    if (!found) throw new Error('Not found');
    return found;
  }
}

export async function create(post: Post): Promise<void> {
  try {
    await request<void>('/api/posts', {
      method: 'POST',
      body: JSON.stringify(post),
    });
  } catch {
    const all = await getAll();
    const toSave: Post = {
      ...post,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
    } as Post;
    localStorage.setItem(LS_KEY, JSON.stringify([toSave, ...all]));
  }
}

export async function update(id: number, post: Post): Promise<void> {
  try {
    await request<void>(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(post),
    });
  } catch {
    const all = await getAll();
    const updated = all.map(p => (String(p.id) === String(id) ? { ...p, ...post } : p));
    localStorage.setItem(LS_KEY, JSON.stringify(updated));
  }
}

export async function remove(id: number): Promise<void> {
  try {
    await request<void>(`/api/posts/${id}`, { method: 'DELETE' });
  } catch {
    const all = await getAll();
    const filtered = all.filter(p => String(p.id) !== String(id));
    localStorage.setItem(LS_KEY, JSON.stringify(filtered));
  }
}

export async function search(params: { q?: string; category?: string }): Promise<Post[]> {
  const whereParts: string[] = [];
  if (params.q && params.q.trim()) {
    const term = `%${params.q.trim()}%`;
    whereParts.push(`title _LIKE_ ${term} _OR_ content _LIKE_ ${term}`);
  }
  if (params.category && params.category.trim()) {
    whereParts.push(`category = ${params.category.trim()}`);
  }
  const where = whereParts.join(' _AND_ ');
  const qs = where ? `?where=${encodeURIComponent(where)}` : '';
  try {
    return await request<Post[]>(`/api/posts${qs}`);
  } catch {
    const all = await getAll();
    return all.filter(p => {
      const inCat = !params.category || p.category === params.category;
      const text = `${p.title ?? ''} ${p.content ?? ''}`.toLowerCase();
      const inText = !params.q || text.includes(params.q.toLowerCase());
      return inCat && inText;
    });
  }
}

