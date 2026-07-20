import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { Role, User } from '@/types';
import { authApi } from '@/api';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  login: (email: string, password: string, role?: Role) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<User>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = 'aicm_token';
const USER_KEY = 'aicm_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  });
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY)
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user]);

  const login = async (email: string, password: string, role: Role = 'customer') => {
    setLoading(true);
    try {
      const u = await authApi.login(email, password);
      if (role === 'admin' && u.role !== 'admin') {
        throw new Error('Not an admin account');
      }
      const fakeToken = 'mock.' + btoa(u.id + '.' + u.role);
      localStorage.setItem(TOKEN_KEY, fakeToken);
      setToken(fakeToken);
      setUser(u);
      return u;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const u = await authApi.register(name, email, password);
      const fakeToken = 'mock.' + btoa(u.id + '.' + u.role);
      localStorage.setItem(TOKEN_KEY, fakeToken);
      setToken(fakeToken);
      setUser(u);
      return u;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
