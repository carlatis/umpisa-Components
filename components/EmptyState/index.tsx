import type { ReactNode } from 'react';

/** Consistent placeholder for collections without data. */
export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="px-8 py-10 text-center text-slate-500">
      <h3 className="mb-2 text-lg font-bold text-slate-800">{title}</h3>
      <p className="mb-4">{description}</p>
      {action}
    </div>
  );
}
