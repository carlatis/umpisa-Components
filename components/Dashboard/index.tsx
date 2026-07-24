import Link from 'next/link';
import { Page } from '../Page';
import { PageHeader } from '../PageHeader';
import { ProjectCard, type ProjectSummary } from '../ProjectCard';
import { StatCard } from '../StatCard';

export type DashboardSummary = { projects: number; todo: number; inProgress: number; done: number };
export function Dashboard({
  summary,
  projects,
}: {
  summary: DashboardSummary;
  projects: ProjectSummary[];
}) {
  return (
    <Page>
      <PageHeader
        title="Dashboard"
        description="A quick view of work in motion."
        action={
          <Link
            className="rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white"
            href="/projects"
          >
            View projects
          </Link>
        }
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard label="Ongoing tasks" value={summary.todo} />
        <StatCard label="In-progress tasks" value={summary.inProgress} />
        <StatCard label="Done tasks" value={summary.done} />
      </div>
      <h2 className="mt-8">Recent projects</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {projects.slice(0, 3).map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Page>
  );
}
