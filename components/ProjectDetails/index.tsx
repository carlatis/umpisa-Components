'use client';
import { useState } from 'react';
import { Button } from '../Button';
import { Field } from '../Field';
import { Form } from '../Form';
import { Modal } from '../Modal';
import { Page } from '../Page';
import { PageHeader } from '../PageHeader';
import {
  TaskList,
  type TaskListItem,
  type TaskPriority,
  type TaskSeverity,
  type TaskUpdate,
} from '../TaskList';

export type ProjectDetailsData = {
  id: string;
  name: string;
  description?: string;
  tasks: TaskListItem[];
};
export type TaskDraft = { title: string; priority: TaskPriority; severity: TaskSeverity };
export function ProjectDetails({
  project,
  onAddTask,
  onTaskChange,
}: {
  project: ProjectDetailsData | null;
  onAddTask: (draft: TaskDraft) => Promise<void>;
  onTaskChange: (task: TaskListItem, update: TaskUpdate) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<TaskDraft>({
    title: '',
    priority: 'MEDIUM',
    severity: 'MINOR',
  });
  const [busy, setBusy] = useState(false);
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    try {
      await onAddTask(draft);
      setDraft({ title: '', priority: 'MEDIUM', severity: 'MINOR' });
      setOpen(false);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Page>
      <PageHeader
        title={project?.name ?? 'Project'}
        description={project?.description}
        action={<Button onClick={() => setOpen(true)}>Add task</Button>}
      />
      <Modal open={open} title="Add task" onClose={() => setOpen(false)}>
        <Form onSubmit={submit}>
          <Field
            label="Task title"
            value={draft.title}
            onChange={(event) => setDraft({ ...draft, title: event.target.value })}
            required
          />
          <label className="grid gap-1.5 font-semibold">
            Priority
            <select
              className="rounded-lg border border-slate-300 bg-white px-3 py-3"
              value={draft.priority}
              onChange={(event) =>
                setDraft({ ...draft, priority: event.target.value as TaskPriority })
              }
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </label>
          <label className="grid gap-1.5 font-semibold">
            Severity
            <select
              className="rounded-lg border border-slate-300 bg-white px-3 py-3"
              value={draft.severity}
              onChange={(event) =>
                setDraft({ ...draft, severity: event.target.value as TaskSeverity })
              }
            >
              <option value="MINOR">Minor</option>
              <option value="MAJOR">Major</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </label>
          <Button disabled={busy}>{busy ? 'Adding…' : 'Add task'}</Button>
        </Form>
      </Modal>
      <TaskList
        tasks={project?.tasks ?? []}
        onChange={(task, update) => void onTaskChange(task, update)}
      />
    </Page>
  );
}
