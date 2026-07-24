'use client';

import type { ReactNode } from 'react';

import { Card } from '../Card';
import { CloseIcon } from '../Icon';

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
          <button
            aria-label="Close modal"
            className="flex h-[25px] w-[25px] shrink-0 cursor-pointer items-center justify-center rounded-md border-0 bg-transparent p-0 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={onClose}
            type="button"
          >
            <CloseIcon className="h-[25px] w-[25px]" />
          </button>
        </div>
        {children}
      </Card>
    </div>
  );
}
