import { Badge } from '../Badge';
import { Placeholder } from '../Placeholder';
import { Section } from '../Section';

export type TaskListStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type TaskListItem = {
  id: string;
  title: string;
  status: TaskListStatus;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
};
export function TaskList({
  tasks,
  onStatusChange,
}: {
  tasks: TaskListItem[];
  onStatusChange: (task: TaskListItem, status: TaskListStatus) => void;
}) {
  return (
    <Section title="Tasks">
      {!tasks.length ? (
        <Placeholder title="No tasks" description="Break this project into its next actions." />
      ) : (
        <div className="grid gap-3">
          {tasks.map((task) => (
            <div className="flex items-center gap-4" key={task.id}>
              <div className="flex-1">
                <strong>{task.title}</strong>
                <br />
                <Badge tone={task.priority === 'HIGH' ? 'warning' : 'neutral'}>
                  {task.priority}
                </Badge>
              </div>
              <select
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-indigo-600 focus:ring-3 focus:ring-indigo-600/15"
                aria-label={`Status for ${task.title}`}
                value={task.status}
                onChange={(event) => onStatusChange(task, event.target.value as TaskListStatus)}
              >
                <option value="TODO">To do</option>
                <option value="IN_PROGRESS">In progress</option>
                <option value="DONE">Done</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
