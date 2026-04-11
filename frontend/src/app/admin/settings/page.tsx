import { AdminShell } from "@/components/layout/admin-shell";

export default function SettingsPage() {
  return (
    <AdminShell title="Paramètres" subtitle="Workspace Mon Agence">
      <div className="card surface-section">
        <p className="section-title">Informations générales</p>
        <dl
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "var(--space-4)",
          }}
        >
          <div>
            <dt style={{ color: "var(--color-text-secondary)" }}>Workspace</dt>
            <dd style={{ fontWeight: 600 }}>Mon Agence</dd>
          </div>
          <div>
            <dt style={{ color: "var(--color-text-secondary)" }}>Plan</dt>
            <dd style={{ fontWeight: 600 }}>Scale</dd>
          </div>
          <div>
            <dt style={{ color: "var(--color-text-secondary)" }}>Membres</dt>
            <dd style={{ fontWeight: 600 }}>42 sièges</dd>
          </div>
        </dl>
      </div>
    </AdminShell>
  );
}
