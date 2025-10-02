export async function login(email: string, password: string) {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function logout() {
  const res = await fetch('/api/login', {
    method: 'DELETE',
    credentials: 'include',
  });
  return res.json();
}

export async function getCurrentUser() {
  const res = await fetch('/api/login', {
    credentials: 'include',
  });
  return res.json();
}
