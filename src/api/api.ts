const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('token');
  const headers = new Headers(options.headers ?? {});
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  // Some endpoints might return 204 No Content
  if (res.status === 204) return {} as T;
  return (await res.json()) as T;
}
