import { CollabShell } from "@/components/layout/collab-shell";
import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { TimesheetsPanel } from "@/components/collab/timesheets-panel";
import { AssignedProjects } from "@/components/collab/assigned-projects";
import { AlertsPanel } from "@/components/dashboard/alerts-panel";
import {
  assignedProjects,
  collabAlerts,
  collabStats,
  timesheets,
} from "@/data/mock-data";

export default function CollabDashboardPage() {
  return (
    <CollabShell title="Bonjour, Lucas 👋" subtitle="Jeudi 10 avril 2025">
      <KpiGrid stats={collabStats} />
      <div className="split-grid">
        <TimesheetsPanel timesheets={timesheets} />
        <AssignedProjects projects={assignedProjects} />
      </div>
      <AlertsPanel alerts={collabAlerts} />
    </CollabShell>
  );
}
