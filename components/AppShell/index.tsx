'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { useAuth } from '../AuthProvider';
import { cn } from '../../utils/cn';

export type NavigationItem = {
  href: string;
  label: string;
  active?: boolean;
  onSelect?: () => void;
};

const defaultNavigation: NavigationItem[] = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/projects', label: 'Projects' },
  { href: '/users', label: 'Users' },
];

export function AppShell({
  children,
  brand = 'Umpisa Inc.',
  homeHref = '/dashboard',
  navigation = defaultNavigation,
  requireAuth = true,
}: {
  children: ReactNode;
  brand?: string;
  homeHref?: string;
  navigation?: NavigationItem[];
  requireAuth?: boolean;
}) {
  const { user, ready, logout } = useAuth();
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (requireAuth && ready && !user) router.replace('/login');
  }, [ready, requireAuth, user, router]);

  if (requireAuth && (!ready || !user))
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 text-slate-500">
        Loading…
      </div>
    );
    
  return (
    <div className="grid min-h-screen grid-cols-1 bg-slate-50 md:grid-cols-[230px_1fr]">
      <aside className="flex items-center gap-4 bg-slate-900 p-4 text-slate-300 md:flex-col md:items-stretch md:p-6">
        <Link href={homeHref} className="text-2xl font-extrabold tracking-tight text-white md:mb-8">
          {brand}
        </Link>
        <nav className="flex gap-1.5 md:grid">
          {navigation.map((item) => {
            const className = cn(
              'rounded-lg px-3 py-2.5 text-left transition hover:bg-white/10 hover:text-white',
              (item.active ?? path.startsWith(item.href)) && 'bg-white/10 text-white',
            );

            return item.onSelect ? (
              <button
                className={`${className} cursor-pointer border-0 bg-transparent font-inherit text-inherit`}
                key={item.label}
                onClick={item.onSelect}
                type="button"
              >
                {item.label}
              </button>
            ) : (
              <Link className={className} href={item.href} key={item.href}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        {requireAuth && user && (
          <button
            className="ml-auto cursor-pointer rounded-lg border-0 bg-transparent px-3 py-2.5 text-left text-inherit transition hover:bg-white/10 hover:text-white md:mt-auto md:ml-0"
            onClick={logout}
          >
            Sign out
          </button>
        )}
      </aside>
      <main className="min-w-0">
        <header className="flex h-[70px] items-center justify-end border-b border-slate-200 bg-white px-8">
          <div className="grid">
            <small className="text-xs text-slate-500">Workspace</small>
            <strong>{requireAuth ? user?.name : 'Component playground'}</strong>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
