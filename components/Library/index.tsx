import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export function Library({
  title,
  description,
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { title?: string; description?: string; children: ReactNode }) {
  const content = (
    <div className={cn('grid grid-cols-1 gap-4 md:grid-cols-2', className)} {...props}>
      {children}
    </div>
  );
  if (!title && !description) return content;
  return (
    <section>
      <header className="mb-6">
        <p className="text-xs font-extrabold tracking-widest text-indigo-600 uppercase">Library</p>
        {title && <h1 className="my-1 text-4xl font-extrabold tracking-tight">{title}</h1>}
        {description && <p className="text-slate-500">{description}</p>}
      </header>
      {content}
    </section>
  );
}
