'use client';

import { useEffect, useState, type FormEvent } from 'react';

import { Button } from '../Button';
import { Card } from '../Card';
import { Field } from '../Field';
import { Form } from '../Form';
import { Page } from '../Page';
import { PageHeader } from '../PageHeader';

export type AccountProfile = {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
};

export function AccountSettings({
  profile,
  loading = false,
  showPasswordForm = false,
  onUpdateProfile,
  onChangePassword,
}: {
  profile: AccountProfile | null;
  loading?: boolean;
  showPasswordForm?: boolean;
  onUpdateProfile: (values: { name: string; email: string }) => Promise<AccountProfile>;
  onChangePassword: (values: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileBusy, setProfileBusy] = useState(false);
  const [passwordBusy, setPasswordBusy] = useState(false);
  const [profileMessage, setProfileMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [profileError, setProfileError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (!profile) return;

    setName(profile.name);
    setEmail(profile.email);
  }, [profile]);

  async function submitProfile(event: FormEvent) {
    event.preventDefault();
    setProfileBusy(true);
    setProfileError('');
    setProfileMessage('');

    try {
      await onUpdateProfile({ name, email });

      setProfileMessage('Profile updated successfully.');
    } catch (error) {
      setProfileError(error instanceof Error ? error.message : 'Unable to update profile.');
    } finally {
      setProfileBusy(false);
    }
  }

  async function submitPassword(event: FormEvent) {
    event.preventDefault();
    setPasswordError('');
    setPasswordMessage('');

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.');

      return;
    }

    setPasswordBusy(true);

    try {
      await onChangePassword({ currentPassword, newPassword });
      
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordMessage('Password changed successfully.');
    } catch (error) {
      setPasswordError(error instanceof Error ? error.message : 'Unable to change password.');
    } finally {
      setPasswordBusy(false);
    }
  }

  return (
    <Page>
      <PageHeader
        title="Account Settings"
        description="Manage your profile information and account password."
      />

      {loading || !profile ? (
        <Card className="text-sm text-slate-500">Loading account...</Card>
      ) : (
        <div className={`grid gap-6 ${showPasswordForm ? 'lg:grid-cols-2' : 'max-w-2xl'}`}>
          <Card>
            <div className="mb-5">
              <h2 className="m-0 text-xl">Profile information</h2>
              <p className="mb-0 mt-1 text-sm text-slate-500">
                Role: <strong className="text-slate-700">{profile.role}</strong>
              </p>
            </div>

            <Form onSubmit={submitProfile}>
              <Field
                label="Name"
                minLength={2}
                onChange={(event) => setName(event.target.value)}
                required
                value={name}
              />
              <Field
                label="Email address"
                onChange={(event) => setEmail(event.target.value)}
                required
                type="email"
                value={email}
              />
              {profileError && <p className="m-0 text-sm text-red-600">{profileError}</p>}
              {profileMessage && <p className="m-0 text-sm text-emerald-700">{profileMessage}</p>}
              <Button disabled={profileBusy} type="submit">
                {profileBusy ? 'Saving...' : 'Save profile'}
              </Button>
            </Form>
          </Card>

          {showPasswordForm && (
            <Card>
              <div className="mb-5">
                <h2 className="m-0 text-xl">Change password</h2>
                <p className="mb-0 mt-1 text-sm text-slate-500">
                  Use at least 12 characters with uppercase, lowercase, number, and symbol.
                </p>
              </div>

              <Form onSubmit={submitPassword}>
                <Field
                  autoComplete="current-password"
                  label="Current password"
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  required
                  type="password"
                  value={currentPassword}
                />
                <Field
                  autoComplete="new-password"
                  label="New password"
                  minLength={12}
                  onChange={(event) => setNewPassword(event.target.value)}
                  required
                  type="password"
                  value={newPassword}
                />
                <Field
                  autoComplete="new-password"
                  label="Confirm new password"
                  minLength={12}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                  type="password"
                  value={confirmPassword}
                />
                {passwordError && <p className="m-0 text-sm text-red-600">{passwordError}</p>}
                {passwordMessage && (
                  <p className="m-0 text-sm text-emerald-700">{passwordMessage}</p>
                )}
                <Button disabled={passwordBusy} type="submit">
                  {passwordBusy ? 'Changing...' : 'Change password'}
                </Button>
              </Form>
            </Card>
          )}
        </div>
      )}
    </Page>
  );
}
