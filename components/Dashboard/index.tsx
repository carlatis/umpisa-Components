import Link from 'next/link';
import { AnalyticsSummary, type AnalyticsSummaryData } from '../AnalyticsSummary';
import { Page } from '../Page';
import { PageHeader } from '../PageHeader';
import { ProjectCard, type ProjectSummary } from '../ProjectCard';

export type DashboardSummary = AnalyticsSummaryData;

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
      <AnalyticsSummary summary={summary} />
      <h2 className="mt-8">Recent projects</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {projects.slice(0, 3).map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Page>
  );
}
