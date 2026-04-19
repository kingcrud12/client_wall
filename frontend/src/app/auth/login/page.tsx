import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Client Wall — Connexion",
};

export default function LoginPage() {
  return (
    <main className="layout-auth">
      <section className="auth-panel auth-panel--brand">
        <p className="pill" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
          Workspace sécurisé
        </p>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 600 }}>
          Créez un espace commun pour vos clients et collaborateurs.
        </h1>
        <p style={{ opacity: 0.9 }}>
          Zones dédiées, permissions granulaires et suivi des projets dans une
          seule plateforme.
        </p>
      </section>
      <section
        className="auth-panel auth-panel--form"
        aria-label="Formulaire de connexion"
      >
        <div>
          <p className="pill">Zone Auth</p>
          <h2 className="section-title">Connexion à votre espace</h2>
          <p style={{ color: "var(--color-text-secondary)" }}>
            Entrez vos identifiants pour accéder à votre tableau de bord.
          </p>
        </div>
        <LoginForm />
      </section>
    </main>
  );
}
