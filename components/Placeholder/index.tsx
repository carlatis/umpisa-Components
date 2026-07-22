import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export function Placeholder({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-8 py-10 text-center',
        className,
      )}
    >
      <h3 className="mb-2 text-lg font-bold text-slate-800">{title}</h3>
      <p className="mb-4 text-slate-500">{description}</p>
      {action}
    </div>
  );
}
