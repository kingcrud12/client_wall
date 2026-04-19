import type { DashboardStat } from "@/data/mock-data";

type KpiGridProps = {
  stats: DashboardStat[];
};

export function KpiGrid({ stats }: KpiGridProps) {
  return (
    <section>
      <div className="kpi-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="card kpi-card">
            <span className="kpi-card__label">{stat.label}</span>
            <span
              className="kpi-card__value"
              style={
                stat.emphasis === "warning"
                  ? { color: "var(--color-warning-600)" }
                  : stat.emphasis === "primary"
                    ? { color: "var(--color-primary-600)" }
                    : undefined
              }
            >
              {stat.value}
            </span>
            <span className="pill">{stat.helper}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
