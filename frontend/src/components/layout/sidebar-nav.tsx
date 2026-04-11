"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  FileText,
  LayoutGrid,
  MessageSquare,
  Settings,
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { label: "Vue d'ensemble", href: "/admin", icon: LayoutGrid },
  { label: "Projets", href: "/admin/projects", icon: Briefcase },
  { label: "Factures", href: "/admin/invoices", icon: FileText },
  { label: "Messagerie", href: "/admin/messages", icon: MessageSquare },
  { label: "Paramètres", href: "/admin/settings", icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div>
        <p className="sidebar__logo">Client Wall</p>
        <p className="text-sm" style={{ color: "var(--sidebar-text-muted)" }}>
          Workspace &mdash; Mon Agence
        </p>
      </div>
      <nav className="sidebar__nav" aria-label="Navigation zone admin">
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
        <p>Marie Dupont</p>
        <p>Owner • marie@agence.com</p>
      </div>
    </aside>
  );
}
