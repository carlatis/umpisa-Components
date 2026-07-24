import { Card } from '../Card';
import { EmptyState } from '../EmptyState';

export type ProjectHealth = {
  id: string;
  name: string;
  tasks: number;
  ongoing: number;
  inProgress: number;
  done: number;
  highPriority: number;
  criticalSeverity: number;
};

export function ProjectHealthTable({ projects }: { projects: ProjectHealth[] }) {
  return (
    <Card className="mt-6">
      <h2 className="mt-0">Project health</h2>
      {!projects.length ? (
        <EmptyState title="No project analytics" description="Create a project to see its health." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-3 py-3 font-semibold">Project</th>
                <th className="px-3 py-3 font-semibold">Tasks</th>
                <th className="px-3 py-3 font-semibold">Ongoing</th>
                <th className="px-3 py-3 font-semibold">In progress</th>
                <th className="px-3 py-3 font-semibold">Done</th>
                <th className="px-3 py-3 font-semibold">High priority</th>
                <th className="px-3 py-3 font-semibold">Critical</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr className="border-b border-slate-100 last:border-0" key={project.id}>
                  <td className="px-3 py-3 font-semibold text-slate-900">{project.name}</td>
                  <td className="px-3 py-3">{project.tasks}</td>
                  <td className="px-3 py-3">{project.ongoing}</td>
                  <td className="px-3 py-3">{project.inProgress}</td>
                  <td className="px-3 py-3">{project.done}</td>
                  <td className="px-3 py-3">{project.highPriority}</td>
                  <td className="px-3 py-3">{project.criticalSeverity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
