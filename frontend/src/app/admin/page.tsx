import { AdminShell } from "@/components/layout/admin-shell";
import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { ProjectsList } from "@/components/dashboard/projects-list";
import { InvoicesPanel } from "@/components/dashboard/invoices-panel";
import { AlertsPanel } from "@/components/dashboard/alerts-panel";
import {
  alerts,
  dashboardStats,
  invoices,
  recentProjects,
} from "@/data/mock-data";

export default function AdminDashboardPage() {
  return (
    <AdminShell title="Bonjour, Marie 👋" subtitle="Vendredi 14 février 2025">
      <KpiGrid stats={dashboardStats} />
      <div className="split-grid">
        <ProjectsList projects={recentProjects} />
        <InvoicesPanel invoices={invoices} />
      </div>
      <AlertsPanel alerts={alerts} />
    </AdminShell>
  );
}
