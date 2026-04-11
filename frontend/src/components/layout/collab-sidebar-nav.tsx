"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Clock,
  FileBarChart,
  FileText,
  LayoutGrid,
  MessageSquare,
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { label: "Mon espace", href: "/collab", icon: LayoutGrid },
  { label: "Timesheets", href: "/collab/timesheets", icon: Clock },
  { label: "Rapports", href: "/collab/reports", icon: FileBarChart },
  { label: "Documents", href: "/collab/documents", icon: FileText },
  { label: "Messagerie", href: "/collab/messages", icon: MessageSquare },
];

export function CollabSidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="sidebar sidebar--collab">
      <div>
        <p className="sidebar__logo">Client Wall</p>
        <p className="text-sm" style={{ color: "var(--sidebar-text-muted)" }}>
          Zone Collaborateurs
        </p>
      </div>
      <nav className="sidebar__nav" aria-label="Navigation zone collaborateurs">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname?.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx("sidebar__link", isActive && "sidebar__link--active")}
            >
              <Icon size={16} aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="sidebar__footer">
        <p>Lucas Martin</p>
        <p>Développeur • lucas@agence.com</p>
      </div>
    </aside>
  );
}
