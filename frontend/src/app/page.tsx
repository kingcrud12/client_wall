import Link from "next/link";
import { LayoutGrid, Users, Eye, ArrowRight } from "lucide-react";

const zones = [
  {
    label: "Zone Admin",
    description:
      "Pilotez vos projets, gérez vos factures et contrôlez les accès depuis un espace centralisé.",
    href: "/admin",
    accent: "#1E293B",
    icon: LayoutGrid,
    tag: "Gestion",
  },
  {
    label: "Zone Collaborateurs",
    description:
      "Saisissez vos heures, partagez vos livrables et suivez l'avancement des projets en équipe.",
    href: "/collab",
    accent: "#0EA5E9",
    icon: Users,
    tag: "Équipe",
  },
  {
    label: "Zone Client",
    description:
      "Donnez à vos clients la visibilité qu'ils méritent : contrats, factures et messagerie.",
    href: "/client",
    accent: "#10B981",
    icon: Eye,
    tag: "Portail",
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section
        className="cw-container"
        style={{ paddingTop: "var(--space-20)", paddingBottom: "var(--space-12)" }}
      >
        <div style={{ maxWidth: "600px" }}>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              fontWeight: "var(--font-bold)",
              lineHeight: 1.1,
              letterSpacing: "var(--tracking-tight)",
              marginBottom: "var(--space-6)",
            }}
          >
            Un espace de travail commun,{" "}
            <span style={{ color: "var(--color-primary-500)" }}>
              pour vous et vos clients.
            </span>
          </h1>
          <p
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--color-text-secondary)",
              lineHeight: "var(--leading-relaxed)",
              marginBottom: "var(--space-8)",
            }}
          >
            Centralisez la relation client dans une plateforme structurée : projets, factures, messagerie
            et documents — avec des accès distincts pour votre équipe et vos clients.
          </p>
          <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
            <Link className="btn btn--primary btn--lg" href="/auth/login">
              Accéder à l&apos;app
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link className="btn btn--secondary btn--lg" href="/admin">
              Voir la démo
            </Link>
          </div>
        </div>
      </section>

      {/* Zones */}
      <section
        className="cw-container"
        style={{ paddingTop: 0, paddingBottom: "var(--space-16)" }}
      >
        <div className="kpi-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {zones.map((zone) => {
            const Icon = zone.icon;
            return (
              <Link
                key={zone.href}
                href={zone.href}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <article
                  className="card card--hoverable"
                  style={{
                    borderTop: `3px solid ${zone.accent}`,
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-3)",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      padding: "var(--space-2)",
                      borderRadius: "var(--radius-lg)",
                      backgroundColor: `${zone.accent}18`,
                      width: "fit-content",
                    }}
                  >
                    <Icon size={20} aria-hidden="true" style={{ color: zone.accent }} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: "var(--font-semibold)",
                        fontSize: "var(--text-base)",
                        marginBottom: "var(--space-1)",
                      }}
                    >
                      {zone.label}
                    </p>
                    <p
                      style={{
                        color: "var(--color-text-secondary)",
                        fontSize: "var(--text-sm)",
                        lineHeight: "var(--leading-relaxed)",
                      }}
                    >
                      {zone.description}
                    </p>
                  </div>
                  <span
                    style={{
                      marginTop: "auto",
                      fontSize: "var(--text-sm)",
                      color: zone.accent,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "var(--space-1)",
                    }}
                  >
                    Ouvrir <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </article>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
