import type { ComponentProps } from "react";
import { Plus } from "lucide-react";
import { CollabShell } from "@/components/layout/collab-shell";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { progressReports, type ProgressReport, type MilestoneStatus } from "@/data/mock-data";
import { formatDate } from "@/lib/format";

const reportStatusCopy: Record<
  ProgressReport["status"],
  { label: string; variant: ComponentProps<typeof Badge>["variant"] }
> = {
  draft: { label: "Brouillon", variant: "neutral" },
  published: { label: "Publié", variant: "success" },
  archived: { label: "Archivé", variant: "neutral" },
};

const milestoneIcon: Record<MilestoneStatus, string> = {
  done: "✓",
  in_progress: "●",
  todo: "○",
};

const milestoneColor: Record<MilestoneStatus, string> = {
  done: "var(--color-success-600)",
  in_progress: "var(--color-info-600)",
  todo: "var(--color-text-muted)",
};

const latestProgress = progressReports.find((r) => r.status === "published")?.progress ?? 0;
const publishedCount = progressReports.filter((r) => r.status === "published").length;

export default function ReportsPage() {
  return (
    <CollabShell
      title="Rapports d'avancement"
      subtitle={`${publishedCount} publiés · ${progressReports.length} au total`}
      actions={
        <Button variant="primary" size="sm" icon={<Plus size={14} />}>
          Nouveau rapport
        </Button>
      }
    >
      {/* Global progress summary */}
      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <p style={{ fontWeight: "var(--font-medium)", color: "var(--color-text-secondary)" }}>
            Avancement global (dernier rapport)
          </p>
          <span style={{ fontWeight: "var(--font-bold)", fontSize: "var(--text-xl)" }}>
            {latestProgress}%
          </span>
        </div>
        <div
          className="progress"
          role="img"
          aria-label={`Avancement global ${latestProgress}%`}
        >
          <div className="progress__bar" style={{ width: `${latestProgress}%` }} />
        </div>
      </div>

      {/* Reports list */}
      <div className="surface-section">
        {progressReports.map((report) => {
          const status = reportStatusCopy[report.status];
          return (
            <article key={report.id} className="card surface-section">
              {/* Card header */}
              <div className="section-header">
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                    <p style={{ fontWeight: "var(--font-semibold)" }}>{report.period}</p>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                  <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-sm)" }}>
                    {report.project}
                    {report.publishedAt
                      ? ` · Publié le ${formatDate(report.publishedAt)}`
                      : ""}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "var(--space-2)", flexShrink: 0 }}>
                  <Button variant="secondary" size="sm">Voir</Button>
                </div>
              </div>

              {/* Progress */}
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
                <div className="progress" style={{ flex: 1, height: "6px" }}>
                  <div className="progress__bar" style={{ width: `${report.progress}%` }} />
                </div>
                <span
                  style={{
                    fontSize: "var(--text-sm)",
                    fontWeight: "var(--font-semibold)",
                    color: "var(--color-text-primary)",
                    minWidth: "36px",
                    textAlign: "right",
                  }}
                >
                  {report.progress}%
                </span>
              </div>

              {/* Summary excerpt */}
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text-secondary)",
                  lineHeight: "var(--leading-relaxed)",
                }}
              >
                {report.summary}
              </p>

              {/* Milestones */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "var(--space-3)",
                  paddingTop: "var(--space-2)",
                  borderTop: "1px solid var(--color-border-default)",
                }}
              >
                {report.milestones.map((ms) => (
                  <span
                    key={ms.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-1-5)",
                      fontSize: "var(--text-xs)",
                      color: milestoneColor[ms.status],
                    }}
                  >
                    <span aria-hidden="true">{milestoneIcon[ms.status]}</span>
                    {ms.label}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </CollabShell>
  );
}
