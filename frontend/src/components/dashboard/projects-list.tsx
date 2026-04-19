import Link from "next/link";
import type { ProjectSummary } from "@/data/mock-data";

type ProjectsListProps = {
  projects: ProjectSummary[];
};

export function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <div className="card surface-section">
      <div className="section-header">
        <div>
          <p className="section-title">Projets récents</p>
          <p style={{ color: "var(--color-text-secondary)" }}>
            Activité des 30 derniers jours
          </p>
        </div>
        <Link href="/admin/projects" className="shortcut-link">
          Voir tous les projets →
        </Link>
      </div>
      <div className="list">
        {projects.map((project) => (
          <article className="list-item" key={project.id}>
            <div className="list-item__meta">
              <p style={{ fontWeight: 600 }}>{project.name}</p>
              <p style={{ color: "var(--color-text-secondary)" }}>
                {project.zones} zones • {project.members} membres
              </p>
              <p style={{ color: "var(--color-text-muted)" }}>
                Dernière activité : {project.lastActivity}
              </p>
            </div>
            <div className="shortcut-group">
              {project.shortcuts.map((shortcut) => (
                <Link
                  key={shortcut.href}
                  href={shortcut.href}
                  className="shortcut-link"
                >
                  {shortcut.label}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
