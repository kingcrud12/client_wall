import type { ReactNode } from "react";
import { CollabSidebarNav } from "./collab-sidebar-nav";
import { Topbar } from "./topbar";

type CollabShellProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function CollabShell({
  title,
  subtitle,
  actions,
  children,
}: CollabShellProps) {
  return (
    <div className="shell">
      <CollabSidebarNav />
      <div className="main-panel">
        <Topbar title={title} subtitle={subtitle} actions={actions} />
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}
