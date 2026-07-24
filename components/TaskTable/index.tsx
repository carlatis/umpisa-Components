'use client';

import { useEffect, useMemo, useState } from 'react';

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

export type TaskTableQuery = {
  page: number;
  pageSize: number;
  search: string;
  project: string;
  status: string;
  priority: string;
  severity: string;
};

export type TaskTablePagination = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

const selectClass =
  'rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-600';

const statusLabels: Record<TaskListStatus, string> = {
  TODO: 'Ongoing',
  IN_PROGRESS: 'In progress',
  DONE: 'Done',
};

type PaginationItem = number | 'start-ellipsis' | 'end-ellipsis';

function getPaginationItems(page: number, totalPages: number): PaginationItem[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (page <= 4) return [1, 2, 3, 4, 'end-ellipsis', totalPages];

  if (page >= totalPages - 3) {
    return [
      1,
      'start-ellipsis',
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [1, 'start-ellipsis', page - 1, page, page + 1, 'end-ellipsis', totalPages];
}

export function TaskTable({
  tasks,
  projectOptions,
  pagination,
  loading = false,
  onQueryChange,
}: {
  tasks: TaskTableItem[];
  projectOptions?: string[];
  pagination?: TaskTablePagination;
  loading?: boolean;
  onQueryChange?: (query: TaskTableQuery) => void;
}) {
  const [search, setSearch] = useState('');
  const [project, setProject] = useState('ALL');
  const [status, setStatus] = useState('ALL');
  const [priority, setPriority] = useState('ALL');
  const [severity, setSeverity] = useState('ALL');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const projects = useMemo(
    () => projectOptions ?? [...new Set(tasks.map((task) => task.projectName))].sort(),
    [projectOptions, tasks],
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

  const serverPaginated = Boolean(onQueryChange);
  const total = pagination?.total ?? filteredTasks.length;
  const totalPages = pagination?.totalPages ?? Math.max(1, Math.ceil(total / pageSize));
  const displayedTasks = serverPaginated
    ? tasks
    : filteredTasks.slice((page - 1) * pageSize, page * pageSize);
  const paginationItems = getPaginationItems(page, totalPages);

  useEffect(() => {
    if (!onQueryChange) return;

    const timeout = window.setTimeout(
      () =>
        onQueryChange({ page, pageSize, search, project, status, priority, severity }),
      300,
    );

    return () => window.clearTimeout(timeout);
  }, [onQueryChange, page, priority, project, search, severity, status]);

  function updateFilter(setter: (value: string) => void, value: string) {
    setPage(1);
    setter(value);
  }

  return (
    <Card className="mt-8">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="m-0">All tasks</h2>
          <p className="mb-0 mt-1 text-sm text-slate-500">
            {total} matching task{total === 1 ? '' : 's'}
          </p>
        </div>
        <input
          aria-label="Search tasks"
          className="min-w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-600"
          onChange={(event) => updateFilter(setSearch, event.target.value)}
          placeholder="Search task or project"
          type="search"
          value={search}
        />
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <select
          aria-label="Filter by project"
          className={selectClass}
          onChange={(event) => updateFilter(setProject, event.target.value)}
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
          onChange={(event) => updateFilter(setStatus, event.target.value)}
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
          onChange={(event) => updateFilter(setPriority, event.target.value)}
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
          onChange={(event) => updateFilter(setSeverity, event.target.value)}
          value={severity}
        >
          <option value="ALL">All severities</option>
          <option value="MINOR">Minor</option>
          <option value="MAJOR">Major</option>
          <option value="CRITICAL">Critical</option>
        </select>
      </div>

      {loading ? (
        <div className="py-12 text-center text-sm text-slate-500">Loading tasks...</div>
      ) : !displayedTasks.length ? (
        <EmptyState title="No matching tasks" description="Change the search or filters." />
      ) : (
        <div className="max-h-[28rem] overflow-auto overscroll-contain">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="sticky top-0 z-10 bg-white">
              <tr className="border-b border-slate-200 text-slate-500 shadow-[0_1px_0_0_rgb(226_232_240)]">
                <th className="px-3 py-3 font-semibold">Task name</th>
                <th className="px-3 py-3 font-semibold">Project name</th>
                <th className="px-3 py-3 font-semibold">Status</th>
                <th className="px-3 py-3 font-semibold">Priority</th>
                <th className="px-3 py-3 font-semibold">Severity</th>
              </tr>
            </thead>
            <tbody>
              {displayedTasks.map((task) => (
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

      <div className="mt-4 flex justify-center border-t border-slate-200 pt-4">
        <nav aria-label="Task table pagination">
          <ul className="flex -space-x-px text-sm">
            <li>
              <button
                aria-label="Previous page"
                className="flex h-9 w-9 items-center justify-center rounded-l-lg border border-slate-300 bg-white font-medium text-slate-600 transition hover:z-10 hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={loading || page <= 1}
                onClick={() => setPage((value) => value - 1)}
                type="button"
              >
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m15 19-7-7 7-7"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </li>

            {paginationItems.map((item) => (
              <li key={item}>
                {typeof item === 'number' ? (
                  <button
                    aria-current={item === page ? 'page' : undefined}
                    aria-label={`Page ${item}`}
                    className={`flex h-9 w-9 items-center justify-center border border-slate-300 font-medium transition hover:z-10 ${
                      item === page
                        ? 'z-10 bg-white font-bold text-black hover:bg-slate-100'
                        : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                    disabled={loading}
                    onClick={() => setPage(item)}
                    type="button"
                  >
                    {item}
                  </button>
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 items-center justify-center border border-slate-300 bg-white font-medium text-slate-500"
                  >
                    ...
                  </span>
                )}
              </li>
            ))}

            <li>
              <button
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center rounded-r-lg border border-slate-300 bg-white font-medium text-slate-600 transition hover:z-10 hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={loading || page >= totalPages}
                onClick={() => setPage((value) => value + 1)}
                type="button"
              >
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m9 5 7 7-7 7"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </Card>
  );
}
