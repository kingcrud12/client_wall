import { Plus } from "lucide-react";
import { CollabShell } from "@/components/layout/collab-shell";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { messageThreads } from "@/data/mock-data";

const zoneLabel: Record<"client" | "collab", string> = {
  client: "Zone Client",
  collab: "Zone Collab",
};

const projects = [...new Set(messageThreads.map((t) => t.project))];
const totalUnread = messageThreads.reduce((acc, t) => acc + t.unread, 0);

export default function MessagesPage() {
  return (
    <CollabShell
      title="Messagerie"
      subtitle={
        totalUnread > 0
          ? `${totalUnread} message${totalUnread > 1 ? "s" : ""} non lu${totalUnread > 1 ? "s" : ""}`
          : "Tous les fils lus"
      }
      actions={
        <Button variant="primary" size="sm" icon={<Plus size={14} />}>
          Nouveau fil
        </Button>
      }
    >
      {/* Threads grouped by project */}
      {projects.map((project) => {
        const threads = messageThreads.filter((t) => t.project === project);
        return (
          <section key={project} className="surface-section">
            <div className="section-header">
              <p className="section-title">{project}</p>
              <span style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>
                {threads.length} fil{threads.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="card">
              <div className="list">
                {threads.map((thread) => (
                  <article key={thread.id} className="list-item" style={{ cursor: "pointer" }}>
                    <div className="list-item__meta" style={{ flex: 1, minWidth: 0 }}>
                      {/* Title row */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "var(--space-3)",
                          flexWrap: "wrap",
                        }}
                      >
                        <p
                          style={{
                            fontWeight: thread.unread > 0
                              ? "var(--font-semibold)"
                              : "var(--font-medium)",
                          }}
                        >
                          {thread.title}
                        </p>
                        <Badge
                          variant={thread.zone === "client" ? "success" : "info"}
                        >
                          {zoneLabel[thread.zone]}
                        </Badge>
                        {thread.unread > 0 && (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              minWidth: "20px",
                              height: "20px",
                              padding: "0 var(--space-1-5)",
                              borderRadius: "var(--radius-full)",
                              backgroundColor: "var(--color-primary-500)",
                              color: "#fff",
                              fontSize: "var(--text-xs)",
                              fontWeight: "var(--font-semibold)",
                            }}
                          >
                            {thread.unread}
                          </span>
                        )}
                      </div>

                      {/* Last message preview */}
                      <p
                        style={{
                          fontSize: "var(--text-sm)",
                          color: "var(--color-text-secondary)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxWidth: "480px",
                        }}
                      >
                        {thread.lastMessage}
                      </p>

                      {/* Meta */}
                      <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                        {thread.participants} participant{thread.participants > 1 ? "s" : ""} · {thread.lastMessageAt}
                      </p>
                    </div>

                    <Button variant="secondary" size="sm" style={{ flexShrink: 0 }}>
                      Ouvrir
                    </Button>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </CollabShell>
  );
}
