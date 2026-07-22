import type { ReactNode } from 'react';

export function PageHeader({
  title,
  description,
  action,
}: {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <div>
        <h1>{title}</h1>
        {description && <p className="text-slate-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}
