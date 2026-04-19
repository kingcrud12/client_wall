import Link from "next/link";
import type { AssignedProject } from "@/data/mock-data";

export function AssignedProjects({ projects }: { projects: AssignedProject[] }) {
  return (
    <div className="card surface-section">
      <div className="section-header">
        <div>
          <p className="section-title">Mes projets</p>
          <p style={{ color: "var(--color-text-secondary)" }}>
            Projets auxquels vous êtes assigné
          </p>
        </div>
        <Link href="/collab/projects" className="shortcut-link">
          Voir tous →
        </Link>
      </div>
      <div className="list">
        {projects.map((project) => (
          <article className="list-item" key={project.id}>
            <div className="list-item__meta">
              <p style={{ fontWeight: 600 }}>{project.name}</p>
              <p style={{ color: "var(--color-text-secondary)" }}>
                {project.role}
              </p>
              <p style={{ color: "var(--color-text-muted)" }}>
                Dernière activité : {project.lastActivity}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "var(--space-2)",
                minWidth: "80px",
              }}
            >
              <span
                style={{
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-semibold)",
                  color: "var(--color-text-primary)",
                }}
              >
                {project.progress}%
              </span>
              <div
                className="progress"
                style={{ width: "80px", height: "6px" }}
                role="img"
                aria-label={`Progression ${project.progress}%`}
              >
                <div
                  className="progress__bar"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
