'use client';
import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import { AuthLayout } from '../AuthLayout';
import { Button } from '../Button';
import { Field } from '../Field';
import { Form } from '../Form';

export type LoginCredentials = { email: string; password: string };
export function Login({
  onSubmit,
  initialEmail = '',
  initialPassword = '',
  helper,
}: {
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
  initialEmail?: string;
  initialPassword?: string;
  helper?: ReactNode;
}) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await onSubmit({ email, password });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to sign in');
    } finally {
      setBusy(false);
    }
  }
  return (
    <AuthLayout title="Welcome back" description="Sign in to manage your delivery work.">
      {helper}
      <Form onSubmit={submit}>
        {error && <div className="rounded-lg bg-red-100 px-3 py-2.5 text-red-700">{error}</div>}
        <Field
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <Field
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <Button disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</Button>
        <small>
          New here? <Link href="/register">Create an account</Link>
        </small>
      </Form>
    </AuthLayout>
  );
}
