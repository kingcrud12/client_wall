"use client";

import { useState } from "react";
import { Input } from "@/components/primitives/input";
import { Button } from "@/components/primitives/button";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!email.includes("@")) {
      setError("Email invalide.");
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 900));

    setIsLoading(false);
    alert(
      `Connexion simulée pour ${email} (remember: ${remember ? "oui" : "non"})`,
    );
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} aria-live="polite">
      <div className="form-field">
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="vous@entreprise.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="password">
          Mot de passe
        </label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
        />
      </div>
      <div className="form-actions">
        <label
          style={{ display: "flex", gap: "var(--space-2)", alignItems: "center" }}
        >
          <input
            type="checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
          />
          Se souvenir de moi
        </label>
        <a href="/auth/reset" className="shortcut-link">
          Mot de passe oublié ?
        </a>
      </div>
      {error ? <p className="form-error">{error}</p> : null}
      <Button type="submit" fullWidth loading={isLoading}>
        Se connecter
      </Button>
      <p style={{ textAlign: "center", color: "var(--color-text-secondary)" }}>
        Pas encore de compte ?{" "}
        <a href="/auth/register" className="shortcut-link">
          Créer un compte
        </a>
      </p>
    </form>
  );
}
