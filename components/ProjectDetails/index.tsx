'use client';
import { useState } from 'react';
import { Button } from '../Button';
import { Field } from '../Field';
import { Form } from '../Form';
import { Modal } from '../Modal';
import { Page } from '../Page';
import { PageHeader } from '../PageHeader';
import { TaskList, type TaskListItem, type TaskListStatus } from '../TaskList';

export type ProjectDetailsData = {
  id: string;
  name: string;
  description?: string;
  tasks: TaskListItem[];
};
export function ProjectDetails({
  project,
  onAddTask,
  onStatusChange,
}: {
  project: ProjectDetailsData | null;
  onAddTask: (title: string) => Promise<void>;
  onStatusChange: (task: TaskListItem, status: TaskListStatus) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    try {
      await onAddTask(title);
      setTitle('');
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
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <Button disabled={busy}>{busy ? 'Adding…' : 'Add task'}</Button>
        </Form>
      </Modal>
      <TaskList
        tasks={project?.tasks ?? []}
        onStatusChange={(task, status) => void onStatusChange(task, status)}
      />
    </Page>
  );
}
