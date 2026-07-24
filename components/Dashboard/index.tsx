import Link from 'next/link';
import {
  AnalyticsBreakdown,
  type AnalyticsDistribution,
  type SeverityDistribution,
} from '../AnalyticsBreakdown';
import { Page } from '../Page';
import { PageHeader } from '../PageHeader';
import { ProjectCard, type ProjectSummary } from '../ProjectCard';
import { ProjectHealthTable, type ProjectHealth } from '../ProjectHealthTable';
import { StatCard } from '../StatCard';

export type DashboardSummary = {
  projects: number;
  tasks: {
    total: number;
    ongoing: number;
    inProgress: number;
    done: number;
    needsAttention: number;
  };
  priority: AnalyticsDistribution;
  severity: SeverityDistribution;
  projectSummary: ProjectHealth[];
};
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Projects" value={summary.projects} />
        <StatCard label="Ongoing tasks" value={summary.tasks.ongoing} />
        <StatCard label="In-progress tasks" value={summary.tasks.inProgress} />
        <StatCard label="Done tasks" value={summary.tasks.done} />
      </div>
      <AnalyticsBreakdown
        priority={summary.priority}
        severity={summary.severity}
        needsAttention={summary.tasks.needsAttention}
      />
      <ProjectHealthTable projects={summary.projectSummary} />
      <h2 className="mt-8">Recent projects</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {projects.slice(0, 3).map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Page>
  );
}
