import type { ReactNode } from 'react';
import { Card } from '../Card';

export function AuthLayout({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-linear-to-br from-indigo-50 to-slate-50 p-4">
      <Card className="w-full max-w-[420px]">
        <h1>{title}</h1>
        {description && <p className="text-slate-500">{description}</p>}
        {children}
      </Card>
    </main>
  );
}
