import type { ReactNode } from "react";
import { SidebarNav } from "./sidebar-nav";
import { Topbar } from "./topbar";

type AdminShellProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function AdminShell({
  title,
  subtitle,
  actions,
  children,
}: AdminShellProps) {
  return (
    <div className="shell">
      <SidebarNav />
      <div className="main-panel">
        <Topbar title={title} subtitle={subtitle} actions={actions} />
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}
