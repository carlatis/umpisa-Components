'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export type AuthUser = { id: string; name: string; email: string };

type AuthValue = {
  user: AuthUser | null;
  ready: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthValue | null>(null);

/** Client-side authentication context shared by consuming Next.js applications. */
export function AuthProvider({
  children,
  storagePrefix = 'umpisa',
}: {
  children: ReactNode;
  storagePrefix?: string;
}) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const tokenKey = `${storagePrefix}_token`;
  const userKey = `${storagePrefix}_user`;

  useEffect(() => {
    const raw = localStorage.getItem(userKey);

    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        localStorage.removeItem(userKey);
      }
    }

    setReady(true);
  }, [userKey]);

  function login(token: string, nextUser: AuthUser) {
    localStorage.setItem(tokenKey, token);
    localStorage.setItem(userKey, JSON.stringify(nextUser));

    setUser(nextUser);
  }

  function logout() {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(userKey);

    setUser(null);
    router.push('/login');
  }

  return (
    <AuthContext.Provider value={{ user, ready, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  
  return value;
}
