import type { InputHTMLAttributes } from 'react';

export type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export function Field({ label, error, hint, ...props }: FieldProps) {
  return (
    <label className="grid gap-1.5 font-semibold text-slate-800">
      <span>{label}</span>
      <input
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 font-normal outline-none transition placeholder:text-slate-400 focus:border-indigo-600 focus:ring-3 focus:ring-indigo-600/15"
        {...props}
      />
      {hint && !error && <small className="font-normal text-slate-500">{hint}</small>}
      {error && <small className="font-normal text-red-600">{error}</small>}
    </label>
  );
}
