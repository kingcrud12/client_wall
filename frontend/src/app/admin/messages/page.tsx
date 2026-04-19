import { AdminShell } from "@/components/layout/admin-shell";

export default function MessagesPage() {
  return (
    <AdminShell
      title="Messagerie"
      subtitle="Cette vue illustre la navigation dédiée"
    >
      <div className="card surface-section">
        <p className="section-title">Placeholder</p>
        <p style={{ color: "var(--color-text-secondary)" }}>
          Ajoutez vos threads, notifications et filtres ici. L&apos;objectif est
          uniquement de montrer la hiérarchie layout → zone → contenu.
        </p>
      </div>
    </AdminShell>
  );
}
