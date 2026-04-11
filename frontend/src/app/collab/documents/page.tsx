import {
  BarChart2,
  File,
  FileCheck,
  FileText,
  Image,
  Plus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CollabShell } from "@/components/layout/collab-shell";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { projectDocuments, type DocType } from "@/data/mock-data";
import { formatDate } from "@/lib/format";

type DocIconDef = {
  icon: LucideIcon;
  color: string;
};

const docIconMap: Record<DocType, DocIconDef> = {
  pdf: { icon: FileText, color: "#E11D48" },
  docx: { icon: FileText, color: "#2563EB" },
  xlsx: { icon: BarChart2, color: "#059669" },
  image: { icon: Image, color: "#D97706" },
  contract: { icon: FileCheck, color: "var(--color-primary-600)" },
  other: { icon: File, color: "var(--color-text-muted)" },
};

const extLabel: Record<DocType, string> = {
  pdf: "PDF",
  docx: "DOCX",
  xlsx: "XLSX",
  image: "Image",
  contract: "Contrat",
  other: "Fichier",
};

export default function DocumentsPage() {
  return (
    <CollabShell
      title="Documents"
      subtitle={`${projectDocuments.length} fichiers partagés`}
      actions={
        <Button variant="primary" size="sm" icon={<Plus size={14} />}>
          Ajouter un document
        </Button>
      }
    >
      {/* Filters */}
      <div
        className="card"
        style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap", alignItems: "center" }}
      >
        <input
          className="input"
          type="search"
          placeholder="Rechercher un document..."
          style={{ flex: "1", minWidth: "200px", maxWidth: "360px" }}
          aria-label="Rechercher un document"
        />
        <select
          className="input"
          defaultValue=""
          style={{ width: "auto", minWidth: "140px" }}
          aria-label="Filtrer par type"
        >
          <option value="">Tous les types</option>
          <option value="pdf">PDF</option>
          <option value="docx">DOCX</option>
          <option value="xlsx">XLSX</option>
          <option value="image">Image</option>
          <option value="contract">Contrat</option>
        </select>
        <select
          className="input"
          defaultValue=""
          style={{ width: "auto", minWidth: "160px" }}
          aria-label="Filtrer par projet"
        >
          <option value="">Tous les projets</option>
          <option value="moncourtier">Refonte MonCourtier</option>
          <option value="wefund">App mobile WeFund</option>
          <option value="nova">Lancement CRM Nova</option>
        </select>
      </div>

      {/* Document grid */}
      <div
        style={{
          display: "grid",
          gap: "var(--space-4)",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        }}
      >
        {projectDocuments.map((doc) => {
          const { icon: Icon, color } = docIconMap[doc.type];
          return (
            <article
              key={doc.id}
              className="card card--hoverable"
              style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}
            >
              {/* Icon + name */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-3)" }}>
                <div
                  style={{
                    flexShrink: 0,
                    padding: "var(--space-2)",
                    borderRadius: "var(--radius-lg)",
                    backgroundColor: `${color}18`,
                  }}
                >
                  <Icon size={20} aria-hidden="true" style={{ color }} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <p
                    style={{
                      fontWeight: "var(--font-medium)",
                      fontSize: "var(--text-sm)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={doc.name}
                  >
                    {doc.name}
                  </p>
                  <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                    {extLabel[doc.type]} · {doc.size}
                  </p>
                </div>
              </div>

              {/* Meta */}
              <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                {doc.project} · Ajouté le {formatDate(doc.uploadedAt)}
              </p>

              {/* Zone badges */}
              <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
                {doc.zones.map((zone) => (
                  <Badge key={zone} variant={zone === "Client" ? "success" : "info"}>
                    {zone}
                  </Badge>
                ))}
              </div>

              {/* Actions */}
              <div
                style={{
                  display: "flex",
                  gap: "var(--space-2)",
                  marginTop: "auto",
                  paddingTop: "var(--space-2)",
                  borderTop: "1px solid var(--color-border-default)",
                }}
              >
                <Button variant="secondary" size="sm">
                  Voir
                </Button>
                <Button variant="ghost" size="sm">
                  Télécharger
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </CollabShell>
  );
}
