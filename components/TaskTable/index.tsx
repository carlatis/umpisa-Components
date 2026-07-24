'use client';

import { useMemo, useState } from 'react';
import { Card } from '../Card';
import { EmptyState } from '../EmptyState';
import type { TaskListStatus, TaskPriority, TaskSeverity } from '../TaskList';

export type TaskTableItem = {
  id: string;
  title: string;
  projectName: string;
  status: TaskListStatus;
  priority: TaskPriority;
  severity: TaskSeverity;
};

const selectClass =
  'rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-600';

const statusLabels: Record<TaskListStatus, string> = {
  TODO: 'Ongoing',
  IN_PROGRESS: 'In progress',
  DONE: 'Done',
};

export function TaskTable({ tasks }: { tasks: TaskTableItem[] }) {
  const [search, setSearch] = useState('');
  const [project, setProject] = useState('ALL');
  const [status, setStatus] = useState('ALL');
  const [priority, setPriority] = useState('ALL');
  const [severity, setSeverity] = useState('ALL');

  const projects = useMemo(
    () => [...new Set(tasks.map((task) => task.projectName))].sort(),
    [tasks],
  );

  const filteredTasks = useMemo(() => {
    const term = search.trim().toLowerCase();

    return tasks.filter(
      (task) =>
        (!term ||
          task.title.toLowerCase().includes(term) ||
          task.projectName.toLowerCase().includes(term)) &&
        (project === 'ALL' || task.projectName === project) &&
        (status === 'ALL' || task.status === status) &&
        (priority === 'ALL' || task.priority === priority) &&
        (severity === 'ALL' || task.severity === severity),
    );
  }, [priority, project, search, severity, status, tasks]);

  return (
    <Card className="mt-8">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="m-0">All tasks</h2>
          <p className="mb-0 mt-1 text-sm text-slate-500">
            {filteredTasks.length} of {tasks.length} tasks
          </p>
        </div>
        <input
          aria-label="Search tasks"
          className="min-w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-600"
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search task or project"
          type="search"
          value={search}
        />
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <select
          aria-label="Filter by project"
          className={selectClass}
          onChange={(event) => setProject(event.target.value)}
          value={project}
        >
          <option value="ALL">All projects</option>
          {projects.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <select
          aria-label="Filter by status"
          className={selectClass}
          onChange={(event) => setStatus(event.target.value)}
          value={status}
        >
          <option value="ALL">All statuses</option>
          <option value="TODO">Ongoing</option>
          <option value="IN_PROGRESS">In progress</option>
          <option value="DONE">Done</option>
        </select>
        <select
          aria-label="Filter by priority"
          className={selectClass}
          onChange={(event) => setPriority(event.target.value)}
          value={priority}
        >
          <option value="ALL">All priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <select
          aria-label="Filter by severity"
          className={selectClass}
          onChange={(event) => setSeverity(event.target.value)}
          value={severity}
        >
          <option value="ALL">All severities</option>
          <option value="MINOR">Minor</option>
          <option value="MAJOR">Major</option>
          <option value="CRITICAL">Critical</option>
        </select>
      </div>

      {!filteredTasks.length ? (
        <EmptyState title="No matching tasks" description="Change the search or filters." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-3 py-3 font-semibold">Task name</th>
                <th className="px-3 py-3 font-semibold">Project name</th>
                <th className="px-3 py-3 font-semibold">Status</th>
                <th className="px-3 py-3 font-semibold">Priority</th>
                <th className="px-3 py-3 font-semibold">Severity</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr className="border-b border-slate-100 last:border-0" key={task.id}>
                  <td className="px-3 py-3 font-semibold text-slate-900">{task.title}</td>
                  <td className="px-3 py-3">{task.projectName}</td>
                  <td className="px-3 py-3">{statusLabels[task.status]}</td>
                  <td className="px-3 py-3 capitalize">{task.priority.toLowerCase()}</td>
                  <td className="px-3 py-3 capitalize">{task.severity.toLowerCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
