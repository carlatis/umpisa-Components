'use client';
import type { ReactNode } from 'react';
import { Button } from '../Button';
import { Card } from '../Card';

export function Modal({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={onClose}
    >
      <Card className="w-full max-w-lg" onMouseDown={(event) => event.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="m-0">{title}</h2>
          <Button
            className="bg-slate-200 px-3 py-2 text-slate-700 hover:bg-slate-300"
            type="button"
            onClick={onClose}
            aria-label="Close modal"
          >
            Close
          </Button>
        </div>
        {children}
      </Card>
    </div>
  );
}
