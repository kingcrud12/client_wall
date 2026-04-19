import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

type TopbarProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
};

export function Topbar({ title, subtitle, actions }: TopbarProps) {
  return (
    <header className="topbar">
      <div>
        <p className="topbar__title">{title}</p>
        {subtitle ? (
          <p style={{ color: "var(--color-text-secondary)" }}>{subtitle}</p>
        ) : null}
      </div>
      <div className="topbar__actions">
        {actions}
        <ThemeToggle />
      </div>
    </header>
  );
}
