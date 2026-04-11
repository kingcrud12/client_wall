import type { ComponentProps } from "react";
import Link from "next/link";
import { Badge } from "@/components/primitives/badge";
import type { Timesheet } from "@/data/mock-data";
import { formatDate } from "@/lib/format";

const statusCopy: Record<
  Timesheet["status"],
  { label: string; variant: ComponentProps<typeof Badge>["variant"] }
> = {
  in_progress: { label: "En cours", variant: "neutral" },
  submitted: { label: "Soumise", variant: "info" },
  validated: { label: "Validée", variant: "success" },
};

export function TimesheetsPanel({ timesheets }: { timesheets: Timesheet[] }) {
  return (
    <div className="card surface-section">
      <div className="section-header">
        <div>
          <p className="section-title">Mes feuilles de temps</p>
          <p style={{ color: "var(--color-text-secondary)" }}>
            30 derniers jours
          </p>
        </div>
        <Link href="/collab/timesheets" className="shortcut-link">
          Toutes les timesheets →
        </Link>
      </div>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Période</th>
              <th>Projet</th>
              <th>Heures</th>
              <th>Soumise</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {timesheets.map((ts) => {
              const status = statusCopy[ts.status];
              return (
                <tr key={ts.id}>
                  <td>{ts.period}</td>
                  <td>{ts.project}</td>
                  <td className="number">{ts.hours}h</td>
                  <td>
                    {ts.submittedAt ? formatDate(ts.submittedAt) : "—"}
                  </td>
                  <td>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
