import { Card } from '../Card';

export type AnalyticsDistribution = {
  low: number;
  medium: number;
  high: number;
};

export type SeverityDistribution = {
  minor: number;
  major: number;
  critical: number;
};

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-2 last:border-0">
      <span className="text-slate-600">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function AnalyticsBreakdown({
  priority,
  severity,
  needsAttention,
}: {
  priority: AnalyticsDistribution;
  severity: SeverityDistribution;
  needsAttention: number;
}) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
      <Card>
        <h2 className="mt-0">Priority distribution</h2>
        <Metric label="High" value={priority.high} />
        <Metric label="Medium" value={priority.medium} />
        <Metric label="Low" value={priority.low} />
      </Card>
      <Card>
        <h2 className="mt-0">Severity distribution</h2>
        <Metric label="Critical" value={severity.critical} />
        <Metric label="Major" value={severity.major} />
        <Metric label="Minor" value={severity.minor} />
      </Card>
      <Card className="flex flex-col justify-between bg-amber-50">
        <div>
          <h2 className="mt-0 text-amber-950">Needs attention</h2>
          <p className="text-sm text-amber-800">
            Unfinished tasks with high priority or critical severity.
          </p>
        </div>
        <strong className="text-5xl text-amber-700">{needsAttention}</strong>
      </Card>
    </div>
  );
}
