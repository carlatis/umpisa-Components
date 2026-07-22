import Link from 'next/link';
import { Card } from '../Card';

export type ProjectSummary = { id: string; name: string; description?: string; taskCount?: number };
export function ProjectCard({ project }: { project: ProjectSummary }) {
  return (
    <Link href={`/projects/${project.id}`}>
      <Card className="transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md">
        <h3>{project.name}</h3>
        <p className="text-slate-500">{project.description || 'No description'}</p>
        <small>{project.taskCount ?? 0} tasks</small>
      </Card>
    </Link>
  );
}
