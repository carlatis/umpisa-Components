import type { HTMLAttributes, ReactNode } from 'react';
import { Card } from '../Card';

export function Section({
  title,
  action,
  children,
  ...props
}: HTMLAttributes<HTMLElement> & { title?: ReactNode; action?: ReactNode }) {
  return (
    <Card {...props}>
      {(title || action) && (
        <header className="mb-4 flex items-center justify-between gap-4">
          {title && <h2 className="m-0">{title}</h2>}
          {action}
        </header>
      )}
      {children}
    </Card>
  );
}
