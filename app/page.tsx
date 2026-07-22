'use client';

import { AppShell, Badge, Button, Card, EmptyState, Input, Library, useAuth } from '../components';
import { useState } from 'react';

function ComponentGallery() {
  const [name, setName] = useState('Sample project');
  return (
    <AppShell brand="Components" navigation={[{ href: '/', label: 'Components' }]}>
      <div className="mx-auto max-w-6xl p-4 md:p-8">
        <div className="mb-6">
          <span className="text-xs font-extrabold tracking-[0.12em] text-indigo-600 uppercase">
            Component library
          </span>
          <h1 className="my-1 text-4xl font-extrabold tracking-tight">UI playground</h1>
          <p className="mt-0 text-slate-500">
            Interact with every reusable component before publishing the package.
          </p>
        </div>
        <Library>
          <Card>
            <h2 className="mt-0">Buttons and badges</h2>
            <div className="flex flex-wrap items-center gap-3">
              <Button>Primary action</Button>
              <Button disabled>Disabled</Button>
              <Badge>Neutral</Badge>
              <Badge tone="success">Complete</Badge>
              <Badge tone="warning">High priority</Badge>
            </div>
          </Card>
          <Card>
            <h2 className="mt-0">Form fields</h2>
            <div className="grid gap-4">
              <Input
                label="Project name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <Input label="Invalid example" value="" error="This field is required" readOnly />
            </div>
          </Card>
          <Card>
            <h2 className="mt-0">Interactive value</h2>
            <p className="text-slate-500">The field above updates this preview.</p>
            <div className="rounded-xl bg-indigo-50 p-4 font-bold text-indigo-800">
              {name || 'Nothing entered'}
            </div>
          </Card>
          <Card>
            <h2 className="mt-0">Empty state</h2>
            <EmptyState
              title="No projects yet"
              description="Create a project to see it here."
              action={<Button>Create project</Button>}
            />
          </Card>
        </Library>
      </div>
    </AppShell>
  );
}

export default function PlaygroundPage() {
  const { user, ready, login } = useAuth();
  if (!ready) return <div className="grid min-h-screen place-items-center">Loading…</div>;
  if (!user)
    return (
      <main className="grid min-h-screen place-items-center bg-linear-to-br from-indigo-50 to-slate-50 p-4">
        <Card className="w-full max-w-[440px] text-center">
          <span className="text-xs font-extrabold tracking-[0.12em] text-indigo-600 uppercase">
            Standalone Next.js preview
          </span>
          <h1 className="my-1 text-4xl font-extrabold tracking-tight">Components</h1>
          <p className="mt-0 text-slate-500">
            Start a local demo session to test the authenticated shell and shared components.
          </p>
          <Button
            className="w-full"
            onClick={() =>
              login('playground-token', {
                id: 'demo',
                name: 'UI Reviewer',
                email: 'reviewer@example.com',
              })
            }
          >
            Open component playground
          </Button>
        </Card>
      </main>
    );
  return <ComponentGallery />;
}
