'use client';
import Link from 'next/link';
import { useState } from 'react';
import { AuthLayout } from '../AuthLayout';
import { Button } from '../Button';
import { Field } from '../Field';
import { Form } from '../Form';

export type RegistrationDetails = { name: string; email: string; password: string };

export function Register({
  onSubmit,
}: {
  onSubmit: (details: RegistrationDetails) => Promise<void>;
}) {
  const [form, setForm] = useState<RegistrationDetails>({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await onSubmit(form);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to register');
    } finally {
      setBusy(false);
    }
  }
  
  return (
    <AuthLayout title="Create account">
      <Form onSubmit={submit}>
        {error && <div className="rounded-lg bg-red-100 px-3 py-2.5 text-red-700">{error}</div>}
        <Field
          label="Name"
          autoComplete="name"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          required
        />
        <Field
          label="Email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          required
        />
        <Field
          label="Password"
          type="password"
          autoComplete="new-password"
          minLength={12}
          maxLength={128}
          pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{12,}"
          value={form.password}
          onChange={(event) => setForm({ ...form, password: event.target.value })}
          hint="12+ characters with uppercase, lowercase, number, and special character."
          required
        />
        <Button disabled={busy}>{busy ? 'Creating account…' : 'Create account'}</Button>
        <small>
          Already registered? <Link href="/login">Sign in</Link>
        </small>
      </Form>
    </AuthLayout>
  );
}
