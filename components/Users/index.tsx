'use client';
import { useState } from 'react';
import { Button } from '../Button';
import { Field } from '../Field';
import { Form } from '../Form';
import { Modal } from '../Modal';
import { Page } from '../Page';
import { PageHeader } from '../PageHeader';
import { UserList, type UserListItem } from '../UserList';

export type UserDraft = { name: string; email: string; password?: string };

type UserField = keyof UserDraft;
type ValidationError = Error & { issues?: Partial<Record<UserField, string[]>> };

export function Users({
  users,
  loading = false,
  onCreate,
  onUpdate,
  onDelete,
}: {
  users: UserListItem[];
  loading?: boolean;
  onCreate: (draft: Required<UserDraft>) => Promise<void>;
  onUpdate: (id: string, draft: UserDraft) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<UserListItem | null>(null);
  const [draft, setDraft] = useState<UserDraft>({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<UserField, string>>>({});
  const [busy, setBusy] = useState(false);

  function add() {
    setEditing(null);
    setDraft({ name: '', email: '', password: '' });
    setError('');
    setFieldErrors({});
    setOpen(true);
  }

  function edit(user: UserListItem) {
    setEditing(user);
    setDraft({ name: user.name, email: user.email, password: '' });
    setError('');
    setFieldErrors({});
    setOpen(true);
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    setFieldErrors({});
    try {
      if (editing) await onUpdate(editing.id, { ...draft, password: draft.password || undefined });
      else await onCreate(draft as Required<UserDraft>);
      setOpen(false);
    } catch (error) {
      const validationError = error as ValidationError;
      const issues = validationError.issues ?? {};
      setFieldErrors(
        Object.fromEntries(
          Object.entries(issues).map(([field, messages]) => [field, messages?.join('. ')]),
        ),
      );
      setError(
        Object.keys(issues).length
          ? 'Please correct the highlighted fields.'
          : error instanceof Error
            ? error.message
            : 'Unable to save user',
      );
    } finally {
      setBusy(false);
    }
  }

  async function remove(user: UserListItem) {
    if (user.isProtected || !window.confirm(`Delete ${user.name}?`)) return;
    await onDelete(user.id);
  }
  
  return (
    <Page>
      <PageHeader
        title="Users"
        description="Add, edit, and remove registered users."
        action={<Button onClick={add}>Add user</Button>}
      />
      <UserList users={users} loading={loading} onEdit={edit} onDelete={remove} />
      <Modal open={open} title={editing ? 'Edit user' : 'Add user'} onClose={() => setOpen(false)}>
        <Form onSubmit={submit}>
          {error && <div className="rounded-lg bg-red-100 px-3 py-2 text-red-700">{error}</div>}
          <Field
            label="Name"
            error={fieldErrors.name}
            value={draft.name}
            onChange={(event) => {
              setDraft({ ...draft, name: event.target.value });
              setFieldErrors({ ...fieldErrors, name: undefined });
            }}
            required
          />
          <Field
            label="Email"
            error={fieldErrors.email}
            type="email"
            value={draft.email}
            onChange={(event) => {
              setDraft({ ...draft, email: event.target.value });
              setFieldErrors({ ...fieldErrors, email: undefined });
            }}
            required
          />
          <Field
            label={editing ? 'New password (optional)' : 'Password'}
            error={fieldErrors.password}
            hint="Use 12+ characters with uppercase, lowercase, number, and special character."
            type="password"
            minLength={12}
            value={draft.password ?? ''}
            onChange={(event) => {
              setDraft({ ...draft, password: event.target.value });
              setFieldErrors({ ...fieldErrors, password: undefined });
            }}
            required={!editing}
          />
          <Button disabled={busy}>{busy ? 'Saving…' : 'Save user'}</Button>
        </Form>
      </Modal>
    </Page>
  );
}
