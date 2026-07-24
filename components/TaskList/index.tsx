import { Badge } from '../Badge';
import { Card } from '../Card';
import { EmptyState } from '../EmptyState';

export type TaskListStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';
export type TaskSeverity = 'MINOR' | 'MAJOR' | 'CRITICAL';
export type TaskListItem = {
  id: string;
  title: string;
  status: TaskListStatus;
  priority: TaskPriority;
  severity: TaskSeverity;
};
export type TaskUpdate = Partial<Pick<TaskListItem, 'status' | 'priority' | 'severity'>>;
const selectClass =
  'rounded-lg border border-slate-300 bg-white px-2 py-2 text-sm outline-none focus:border-indigo-600';

export function TaskList({
  tasks,
  onChange,
}: {
  tasks: TaskListItem[];
  onChange: (task: TaskListItem, update: TaskUpdate) => void;
}) {
  return (
    <Card>
      <h2>Tasks</h2>
      {!tasks.length ? (
        <EmptyState title="No tasks" description="Break this project into its next actions." />
      ) : (
        <div className="grid gap-3">
          {tasks.map((task) => (
            <div
              className="grid gap-3 rounded-xl border border-slate-200 p-3 md:grid-cols-[1fr_auto] md:items-center"
              key={task.id}
            >
              <div>
                <strong>{task.title}</strong>
                <div className="mt-2 flex gap-2">
                  <Badge tone={task.priority === 'HIGH' ? 'warning' : 'neutral'}>
                    {task.priority} priority
                  </Badge>
                  <Badge
                    tone={
                      task.severity === 'CRITICAL'
                        ? 'warning'
                        : task.severity === 'MINOR'
                          ? 'success'
                          : 'neutral'
                    }
                  >
                    {task.severity} severity
                  </Badge>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <select
                  className={selectClass}
                  aria-label={`Status for ${task.title}`}
                  value={task.status}
                  onChange={(event) =>
                    onChange(task, { status: event.target.value as TaskListStatus })
                  }
                >
                  <option value="TODO">Ongoing</option>
                  <option value="IN_PROGRESS">In progress</option>
                  <option value="DONE">Done</option>
                </select>
                <select
                  className={selectClass}
                  aria-label={`Priority for ${task.title}`}
                  value={task.priority}
                  onChange={(event) =>
                    onChange(task, { priority: event.target.value as TaskPriority })
                  }
                >
                  <option value="LOW">Low priority</option>
                  <option value="MEDIUM">Medium priority</option>
                  <option value="HIGH">High priority</option>
                </select>
                <select
                  className={selectClass}
                  aria-label={`Severity for ${task.title}`}
                  value={task.severity}
                  onChange={(event) =>
                    onChange(task, { severity: event.target.value as TaskSeverity })
                  }
                >
                  <option value="MINOR">Minor</option>
                  <option value="MAJOR">Major</option>
                  <option value="CRITICAL">Critical</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
