import type { ComponentProps } from "react";
import { Plus } from "lucide-react";
import { CollabShell } from "@/components/layout/collab-shell";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { timesheets, type Timesheet } from "@/data/mock-data";
import { formatDate } from "@/lib/format";

const statusCopy: Record<
  Timesheet["status"],
  { label: string; variant: ComponentProps<typeof Badge>["variant"] }
> = {
  in_progress: { label: "En cours", variant: "neutral" },
  submitted: { label: "Soumise", variant: "info" },
  validated: { label: "Validée", variant: "success" },
};

const totalHours = timesheets.reduce((acc, ts) => acc + ts.hours, 0);
const validatedHours = timesheets
  .filter((ts) => ts.status === "validated")
  .reduce((acc, ts) => acc + ts.hours, 0);
const inProgressHours = timesheets
  .filter((ts) => ts.status === "in_progress")
  .reduce((acc, ts) => acc + ts.hours, 0);

const summary = [
  { label: "Total heures saisies", value: `${totalHours}h` },
  { label: "Heures validées", value: `${validatedHours}h` },
  { label: "En cours de saisie", value: `${inProgressHours}h` },
];

export default function TimesheetsPage() {
  return (
    <CollabShell
      title="Mes feuilles de temps"
      subtitle={`${timesheets.length} feuilles • Avril 2025`}
      actions={
        <Button variant="primary" size="sm" icon={<Plus size={14} />}>
          Nouvelle feuille
        </Button>
      }
    >
      {/* Monthly summary */}
      <div className="kpi-grid">
        {summary.map((s) => (
          <div key={s.label} className="card kpi-card">
            <span className="kpi-card__label">{s.label}</span>
            <span className="kpi-card__value">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Filters + table */}
      <div className="card surface-section">
        {/* Filter row */}
        <div
          style={{
            display: "flex",
            gap: "var(--space-3)",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <select
            className="input"
            defaultValue=""
            style={{ width: "auto", minWidth: "160px" }}
            aria-label="Filtrer par période"
          >
            <option value="">Toutes les périodes</option>
            <option value="2025-04">Avril 2025</option>
            <option value="2025-03">Mars 2025</option>
            <option value="2025-02">Février 2025</option>
            <option value="2025-01">Janvier 2025</option>
          </select>
          <select
            className="input"
            defaultValue=""
            style={{ width: "auto", minWidth: "160px" }}
            aria-label="Filtrer par statut"
          >
            <option value="">Tous les statuts</option>
            <option value="in_progress">En cours</option>
            <option value="submitted">Soumise</option>
            <option value="validated">Validée</option>
          </select>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Référence</th>
                <th>Projet</th>
                <th>Période</th>
                <th>Heures</th>
                <th>Soumise le</th>
                <th>Statut</th>
                <th style={{ textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {timesheets.map((ts) => {
                const status = statusCopy[ts.status];
                return (
                  <tr key={ts.id}>
                    <td
                      style={{
                        fontFamily: "var(--font-family-mono)",
                        fontSize: "var(--text-xs)",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {ts.id}
                    </td>
                    <td style={{ fontWeight: "var(--font-medium)" }}>
                      {ts.project}
                    </td>
                    <td>{ts.period}</td>
                    <td className="number">{ts.hours}h</td>
                    <td>{ts.submittedAt ? formatDate(ts.submittedAt) : "—"}</td>
                    <td>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {ts.status === "in_progress" ? (
                        <Button variant="primary" size="sm">
                          Saisir
                        </Button>
                      ) : (
                        <Button variant="secondary" size="sm">
                          Voir
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </CollabShell>
  );
}
