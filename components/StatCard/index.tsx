import { Card } from '../Card';

export function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Card>
      <span className="text-slate-500">{label}</span>
      <strong className="block text-3xl font-extrabold">{value}</strong>
    </Card>
  );
}
