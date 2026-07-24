'use client';

import { useState } from 'react';
import { AccountSettings, type AccountProfile } from '../components/AccountSettings';
import { AppShell } from '../components/AppShell';
import { Card } from '../components/Card';
import { Dashboard } from '../components/Dashboard';
import { MenuIcon } from '../components/Icon';
import { Login } from '../components/Login';
import { ProjectDetails } from '../components/ProjectDetails';
import type { ProjectSummary } from '../components/ProjectCard';
import { Projects } from '../components/Projects';
import type { TaskListItem } from '../components/TaskList';
import type { UserListItem } from '../components/UserList';
import { Users } from '../components/Users';

type PlaygroundTab =
  | 'login'
  | 'dashboard'
  | 'projects'
  | 'tasks'
  | 'users'
  | 'account'
  | 'icons';

const playgroundTabs: { id: PlaygroundTab; label: string }[] = [
  { id: 'login', label: 'Login' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'projects', label: 'Projects' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'users', label: 'Users' },
  { id: 'account', label: 'Account Settings' },
  { id: 'icons', label: 'Icons' },
];

function ComponentGallery() {
  const [activeTab, setActiveTab] = useState<PlaygroundTab>('login');
  const [result, setResult] = useState('Ready—interact with a component to test it.');
  const [projects, setProjects] = useState<ProjectSummary[]>([
    { id: 'project-1', name: 'Website launch', description: 'Prepare the Umpisa Inc. launch.' },
  ]);
  const [tasks, setTasks] = useState<TaskListItem[]>([
    {
      id: 'task-1',
      title: 'Review production checklist',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      severity: 'MAJOR',
    },
  ]);
  const [users, setUsers] = useState<UserListItem[]>([
    {
      id: 'user-1',
      name: 'First Administrator',
      email: 'admin@umpisa.test',
      createdAt: new Date().toISOString(),
      isProtected: true,
    },
    {
      id: 'user-2',
      name: 'UI Reviewer',
      email: 'reviewer@umpisa.test',
      createdAt: new Date().toISOString(),
      isProtected: false,
    },
  ]);
  const [account, setAccount] = useState<AccountProfile>({
    id: 'user-1',
    name: 'First Administrator',
    email: 'admin@umpisa.test',
    role: 'ADMIN',
  });

  return (
    <AppShell
      brand="Component Library"
      navigation={playgroundTabs.map((tab) => ({
        href: '/',
        label: tab.label,
        active: activeTab === tab.id,
        onSelect: () => setActiveTab(tab.id),
      }))}
      requireAuth={false}
    >
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

        <div className={activeTab === 'login' ? 'block' : 'hidden'} role="tabpanel">
          <h2 className="mb-1 text-2xl font-extrabold">Login component</h2>
          <p className="mt-0 text-slate-500">
            Submit the reusable login form to test its loading and error states.
          </p>
          <Card className="overflow-hidden p-0">
            <Login
              helper={
                <div className="mb-4 rounded-lg border border-indigo-200 bg-indigo-50 p-3 text-sm text-indigo-900">
                  <strong>Default playground credentials</strong>
                  <div>Email: reviewer@umpisa.test</div>
                  <div>Password: Password123!</div>
                </div>
              }
              initialEmail="reviewer@umpisa.test"
              initialPassword="Password123!"
              onSubmit={async (credentials) => {
                if (
                  credentials.email !== 'reviewer@umpisa.test' ||
                  credentials.password !== 'Password123!'
                ) {
                  throw new Error('Invalid playground email or password');
                }

                setResult(`Login form submitted for ${credentials.email}.`);
              }}
            />
          </Card>
        </div>
        <div className="my-8 rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-indigo-900">
          <strong>Interaction result</strong>
          <p className="mb-0">{result}</p>
        </div>

        <section>
          <div className={activeTab === 'dashboard' ? 'block' : 'hidden'} role="tabpanel">
            <h2 className="mb-1 text-2xl font-extrabold">Dashboard component</h2>
            <p className="mt-0 text-slate-500">Rendered with representative project data.</p>
            <Card className="overflow-hidden p-0">
              <Dashboard
                summary={{
                  projects: projects.length,
                  tasks: {
                    total: 6,
                    ongoing: 2,
                    inProgress: 1,
                    done: 3,
                    needsAttention: 2,
                  },
                  priority: { low: 1, medium: 2, high: 3 },
                  severity: { minor: 2, major: 2, critical: 2 },
                  attentionTasks: [
                    {
                      id: 'attention-1',
                      title: 'Review production checklist',
                      projectName: 'Website launch',
                      status: 'IN_PROGRESS',
                      priority: 'HIGH',
                      severity: 'MAJOR',
                    },
                  ],
                }}
                projects={projects}
              />
            </Card>
          </div>

          <div className={activeTab === 'projects' ? 'block' : 'hidden'} role="tabpanel">
            <h2 className="mb-1 text-2xl font-extrabold">Projects component</h2>
            <p className="mt-0 text-slate-500">
              Open the modal and create a project. Data stays inside the playground.
            </p>
            <Card className="overflow-hidden p-0">
              <Projects
                projects={projects}
                tasks={tasks.map((task) => ({ ...task, projectName: 'Website launch' }))}
                onCreate={async (draft) => {
                  setProjects((current) => [
                    ...current,
                    { id: crypto.randomUUID(), name: draft.name, description: draft.description },
                  ]);
                  setResult(`Project “${draft.name}” was created successfully.`);
                }}
              />
            </Card>
          </div>

          <div className={activeTab === 'tasks' ? 'block' : 'hidden'} role="tabpanel">
            <h2 className="mb-1 text-2xl font-extrabold">Project details and tasks</h2>
            <p className="mt-0 text-slate-500">
              Test task creation and manually change status, priority, and severity.
            </p>
            <Card className="overflow-hidden p-0">
              <ProjectDetails
                project={{
                  id: 'project-1',
                  name: 'Website launch',
                  description: 'Interactive task component test.',
                  tasks,
                }}
                onAddTask={async (draft) => {
                  setTasks((current) => [
                    ...current,
                    { id: crypto.randomUUID(), status: 'TODO', ...draft },
                  ]);
                  setResult(`Task “${draft.title}” was added successfully.`);
                }}
                onTaskChange={async (task, update) => {
                  setTasks((current) =>
                    current.map((item) => (item.id === task.id ? { ...item, ...update } : item)),
                  );
                  setResult(`Task “${task.title}” was updated successfully.`);
                }}
              />
            </Card>
          </div>

          <div className={activeTab === 'users' ? 'block' : 'hidden'} role="tabpanel">
            <h2 className="mb-1 text-2xl font-extrabold">Users component</h2>
            <p className="mt-0 text-slate-500">
              Test adding, editing, deleting, validation display, and first-user protection.
            </p>
            <Card className="overflow-hidden p-0">
              <Users
                users={users}
                onCreate={async (draft) => {
                  if (users.some((user) => user.email === draft.email)) {
                    const error = new Error('Validation failed') as Error & {
                      issues: Record<string, string[]>;
                    };

                    error.issues = { email: ['Email already exists in the playground'] };
                    throw error;
                  }

                  setUsers((current) => [
                    ...current,
                    {
                      id: crypto.randomUUID(),
                      name: draft.name,
                      email: draft.email,
                      createdAt: new Date().toISOString(),
                      isProtected: false,
                    },
                  ]);
                  
                  setResult(`User “${draft.name}” was created successfully.`);
                }}
                onUpdate={async (id, draft) => {
                  setUsers((current) =>
                    current.map((user) => (user.id === id ? { ...user, ...draft } : user)),
                  );
                  setResult(`User “${draft.name}” was updated successfully.`);
                }}
                onDelete={async (id) => {
                  setUsers((current) => current.filter((user) => user.id !== id));
                  setResult('User was deleted successfully.');
                }}
              />
            </Card>
          </div>

          <div className={activeTab === 'account' ? 'block' : 'hidden'} role="tabpanel">
            <AccountSettings
              profile={account}
              onUpdateProfile={async (values) => {
                const updated = { ...account, ...values };

                setAccount(updated);
                setResult('Account profile was updated successfully.');

                return updated;
              }}
              onChangePassword={async ({ currentPassword }) => {
                if (currentPassword !== 'Password123!') {
                  throw new Error('Current password is incorrect');
                }

                setResult('Account password was changed successfully.');
              }}
            />
          </div>

          <div className={activeTab === 'icons' ? 'block' : 'hidden'} role="tabpanel">
            <h2 className="mb-1 text-2xl font-extrabold">Icon components</h2>
            <p className="mt-0 text-slate-500">
              Icons inherit their color and size from the consuming application.
            </p>
            <Card className="flex items-center gap-4">
              <MenuIcon className="h-6 w-8 text-indigo-600" title="Menu" />
              <code>MenuIcon</code>
            </Card>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

export default function PlaygroundPage() {
  return <ComponentGallery />;
}
