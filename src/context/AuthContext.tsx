import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type User = {
  id: string;
  email: string;
  displayName?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth måste användas inom AuthProvider');
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Ladda användare från sessionStorage och verifiera med backend
  useEffect(() => {
    (async () => {
      try {
        const cached = sessionStorage.getItem('user');
        if (cached) {
          setUser(JSON.parse(cached) as User);
        }
        const res = await fetch('/api/login', { credentials: 'include' });
        const j = await res.json();
        if (j && !j.error) {
          setUser(j as User);
          sessionStorage.setItem('user', JSON.stringify(j));
        } else if (!cached) {
          setUser(null);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });
      const j = await res.json();
      if (j && j.error) throw new Error(j.error);
      setUser(j as User);
      sessionStorage.setItem('user', JSON.stringify(j));
    } catch {
      // Demo fallback (no backend): create a temporary user
      const demo: User = { id: String(Date.now()), email, displayName: email.split('@')[0] };
      setUser(demo);
      sessionStorage.setItem('user', JSON.stringify(demo));
    }
  };

  const register = async (email: string, password: string, displayName?: string) => {
    try {
      // Skapa användare och logga in direkt
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password, displayName })
      });
      const j = await res.json();
      if (j && j.error) throw new Error(j.error);
      await login(email, password);
    } catch {
      // Demo fallback (no backend)
      const demo: User = { id: String(Date.now()), email, displayName: displayName || email.split('@')[0] };
      setUser(demo);
      sessionStorage.setItem('user', JSON.stringify(demo));
    }
  };

  const logout = async () => {
    await fetch('/api/login', { method: 'DELETE', credentials: 'include' });
    sessionStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
