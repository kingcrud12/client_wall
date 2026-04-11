import { FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/primitives/button";
import { clientHighlights } from "@/data/mock-data";

export function ClientSummary() {
  const data = clientHighlights;

  return (
    <div className="cw-container surface-section">
      <section className="card surface-section">
        <div className="section-header">
          <div>
            <p className="section-title">{data.project}</p>
            <p style={{ color: "var(--color-text-secondary)" }}>
              Espace client — accès limité
            </p>
          </div>
          <Button variant="primary" icon={<MessageSquare size={16} />}>
            Ouvrir un fil
          </Button>
        </div>
        <div>
          <p style={{ fontWeight: 500, marginBottom: "var(--space-2)" }}>
            Prochain livrable
          </p>
          <p>{data.nextDeliverable}</p>
          <p style={{ color: "var(--color-text-muted)" }}>
            Livraison prévue le {data.nextDeliverableDate}
          </p>
        </div>
        <div>
          <p style={{ fontWeight: 500, marginBottom: "var(--space-2)" }}>
            Progression globale
          </p>
          <div className="progress" role="img" aria-label="Progression du projet">
            <div
              className="progress__bar"
              style={{ width: `${data.progress}%` }}
            />
          </div>
          <p style={{ color: "var(--color-text-secondary)" }}>
            {data.progress}% complété
          </p>
        </div>
      </section>

      <section className="surface-section card">
        <div className="section-header">
          <p className="section-title">Discussions ouvertes</p>
          <Button variant="ghost" size="sm" icon={<MessageSquare size={14} />}>
            Voir tout
          </Button>
        </div>
        <div className="list">
          {data.openThreads.map((thread) => (
            <article className="list-item" key={thread.id}>
              <div className="list-item__meta">
                <p style={{ fontWeight: 600 }}>{thread.title}</p>
                <p style={{ color: "var(--color-text-muted)" }}>
                  Dernière mise à jour : {thread.updatedAt}
                </p>
              </div>
              <Button variant="secondary" size="sm">
                Ouvrir
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section className="surface-section card">
        <div className="section-header">
          <p className="section-title">Documents récents</p>
          <Button variant="ghost" size="sm" icon={<FileText size={14} />}>
            Bibliothèque
          </Button>
        </div>
        <div className="list">
          {data.documents.map((doc) => (
            <article className="list-item" key={doc.id}>
              <div className="list-item__meta">
                <p style={{ fontWeight: 500 }}>{doc.title}</p>
                <p style={{ color: "var(--color-text-muted)" }}>
                  Mis à jour le {doc.updatedAt}
                </p>
              </div>
              <Button variant="secondary" size="sm">
                Télécharger
              </Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
