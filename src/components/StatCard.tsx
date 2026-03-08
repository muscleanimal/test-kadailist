type StatCardProps = {
  label: string;
  value: number;
  testId: string;
};

export function StatCard({ label, value, testId }: StatCardProps) {
  return (
    <article className="stat-card" data-testid={testId}>
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
    </article>
  );
}
