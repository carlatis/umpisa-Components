'use client';

import { useState } from 'react';
import { Card } from '../Card';
import { Modal } from '../Modal';
import type { TaskListStatus, TaskPriority, TaskSeverity } from '../TaskList';

export type AttentionTask = {
  id: string;
  title: string;
  projectName: string;
  status: TaskListStatus;
  priority: TaskPriority;
  severity: TaskSeverity;
};

export type AnalyticsSummaryData = {
  projects: number;
  tasks: {
    total: number;
    ongoing: number;
    inProgress: number;
    done: number;
    needsAttention: number;
  };
  priority: {
    low: number;
    medium: number;
    high: number;
  };
  severity: {
    minor: number;
    major: number;
    critical: number;
  };
  attentionTasks: AttentionTask[];
};

function MainMetric({ label, value }: { label: string; value: number }) {
  return (
    <Card className="min-w-0">
      <span className="text-sm text-slate-500">{label}</span>
      <strong className="mt-2 block text-3xl text-slate-900">{value}</strong>
    </Card>
  );
}

function InlineMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <span className="text-sm text-slate-500">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function AnalyticsSummary({ summary }: { summary: AnalyticsSummaryData }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <MainMetric label="Total projects" value={summary.projects} />
        <MainMetric label="Ongoing tasks" value={summary.tasks.ongoing} />
        <MainMetric label="In-progress tasks" value={summary.tasks.inProgress} />
        <MainMetric label="Done tasks" value={summary.tasks.done} />
        <button
          className="min-w-0 cursor-pointer rounded-2xl border border-amber-300 bg-amber-100 p-5 text-left shadow-sm transition hover:bg-amber-200"
          onClick={() => setOpen(true)}
          type="button"
        >
          <span className="text-sm font-semibold text-amber-800">Needs-attention tasks</span>
          <strong className="mt-2 block text-3xl text-amber-950">
            {summary.tasks.needsAttention}
          </strong>
          <small className="mt-2 block text-amber-700">View tasks</small>
        </button>
      </div>

      <Card className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <InlineMetric label="Total tasks" value={summary.tasks.total} />
        <span className="hidden h-6 w-px bg-slate-200 sm:block" />
        <InlineMetric label="High priority" value={summary.priority.high} />
        <InlineMetric label="Medium" value={summary.priority.medium} />
        <InlineMetric label="Low" value={summary.priority.low} />
        <span className="hidden h-6 w-px bg-slate-200 sm:block" />
        <InlineMetric label="Critical severity" value={summary.severity.critical} />
        <InlineMetric label="Major" value={summary.severity.major} />
        <InlineMetric label="Minor" value={summary.severity.minor} />
      </Card>

      <Modal open={open} title="Tasks needing attention" onClose={() => setOpen(false)}>
        {!summary.attentionTasks.length ? (
          <p className="m-0 text-slate-500">No unfinished tasks currently need attention.</p>
        ) : (
          <div className="grid gap-3">
            {summary.attentionTasks.map((task) => (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3" key={task.id}>
                <strong className="block text-slate-900">{task.title}</strong>
                <span className="mt-1 block text-sm text-slate-600">{task.projectName}</span>
                <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold text-amber-900">
                  <span>{task.status === 'TODO' ? 'ONGOING' : 'IN PROGRESS'}</span>
                  <span>• {task.priority} PRIORITY</span>
                  <span>• {task.severity} SEVERITY</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </>
  );
}
