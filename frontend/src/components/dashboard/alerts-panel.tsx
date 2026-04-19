import { AlertCircle, AlertTriangle, ShieldAlert } from "lucide-react";
import { Button } from "@/components/primitives/button";
import type { Alert } from "@/data/mock-data";

const iconByType: Record<Alert["type"], React.ComponentType<{ size?: number }>> =
  {
    warning: AlertTriangle,
    info: AlertCircle,
    error: ShieldAlert,
  };

export function AlertsPanel({ alerts }: { alerts: Alert[] }) {
  if (!alerts.length) {
    return null;
  }

  return (
    <div className="card surface-section">
      <p className="section-title">Alertes</p>
      <div className="list">
        {alerts.map((alert) => {
          const Icon = iconByType[alert.type];
          return (
            <div key={alert.id} className={`alert alert--${alert.type}`}>
              <Icon size={20} aria-hidden="true" />
              <div>
                <p style={{ fontWeight: 600 }}>{alert.title}</p>
                <p>{alert.description}</p>
                {alert.actionLabel ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    style={{ color: "inherit" }}
                  >
                    {alert.actionLabel}
                  </Button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
