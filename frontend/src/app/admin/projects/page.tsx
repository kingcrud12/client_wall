import { Plus } from "lucide-react";
import { AdminShell } from "@/components/layout/admin-shell";
import { ProjectsList } from "@/components/dashboard/projects-list";
import { Button } from "@/components/primitives/button";
import { recentProjects } from "@/data/mock-data";

export default function ProjectsPage() {
  return (
    <AdminShell
      title="Projets"
      subtitle="12 projets actifs • 3 en préparation"
      actions={
        <Button variant="primary" size="sm" icon={<Plus size={14} />}>
          Nouveau projet
        </Button>
      }
    >
      <ProjectsList projects={recentProjects} />
    </AdminShell>
  );
}
