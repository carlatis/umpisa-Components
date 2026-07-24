'use client';
import { useState } from 'react';
import { Button } from '../Button';
import { Field } from '../Field';
import { Form } from '../Form';
import { Library } from '../Library';
import { Modal } from '../Modal';
import { Page } from '../Page';
import { PageHeader } from '../PageHeader';
import { Placeholder } from '../Placeholder';
import { ProjectCard, type ProjectSummary } from '../ProjectCard';
import { TaskTable, type TaskTableItem } from '../TaskTable';

export type ProjectDraft = { name: string; description: string };

export function Projects({
  projects,
  tasks = [],
  onCreate,
}: {
  projects: ProjectSummary[];
  tasks?: TaskTableItem[];
  onCreate: (draft: ProjectDraft) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<ProjectDraft>({ name: '', description: '' });
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    
    try {
      await onCreate(draft);

      setDraft({ name: '', description: '' });
      setOpen(false);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Page>
      <PageHeader
        title="Projects"
        description="Plan outcomes and organize related tasks."
        action={<Button onClick={() => setOpen(true)}>New project</Button>}
      />
      <Modal open={open} title="Create project" onClose={() => setOpen(false)}>
        <Form onSubmit={submit}>
          <Field
            label="Project name"
            value={draft.name}
            onChange={(event) => setDraft({ ...draft, name: event.target.value })}
            required
          />
          <Field
            label="Description"
            value={draft.description}
            onChange={(event) => setDraft({ ...draft, description: event.target.value })}
          />
          <Button disabled={busy}>{busy ? 'Creating…' : 'Create project'}</Button>
        </Form>
      </Modal>
      {!projects.length ? (
        <Placeholder title="No projects yet" description="Create your first project to begin." />
      ) : (
        <Library className="md:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Library>
      )}
      <TaskTable tasks={tasks} />
    </Page>
  );
}
