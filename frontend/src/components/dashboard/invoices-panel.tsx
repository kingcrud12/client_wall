import type { ComponentProps } from "react";
import Link from "next/link";
import { Badge } from "@/components/primitives/badge";
import type { Invoice } from "@/data/mock-data";
import { formatCurrency, formatDate } from "@/lib/format";

const statusCopy: Record<
  Invoice["status"],
  { label: string; variant: ComponentProps<typeof Badge>["variant"] }
> = {
  draft: { label: "Brouillon", variant: "neutral" },
  issued: { label: "Emise", variant: "info" },
  paid: { label: "Payée", variant: "success" },
  overdue: { label: "Retard", variant: "warning" },
  refunded: { label: "Remboursée", variant: "primary" },
};

type InvoicesPanelProps = {
  invoices: Invoice[];
};

export function InvoicesPanel({ invoices }: InvoicesPanelProps) {
  return (
    <div className="card surface-section">
      <div className="section-header">
        <div>
          <p className="section-title">Factures récentes</p>
          <p style={{ color: "var(--color-text-secondary)" }}>
            Suivi multi-projets
          </p>
        </div>
        <Link href="/admin/invoices" className="shortcut-link">
          Voir toutes les factures →
        </Link>
      </div>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Facture</th>
              <th>Client</th>
              <th>Montant</th>
              <th>Échéance</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => {
              const status = statusCopy[invoice.status];
              return (
                <tr key={invoice.id}>
                  <td>{invoice.id}</td>
                  <td>{invoice.client}</td>
                  <td className="number">{formatCurrency(invoice.amount)}</td>
                  <td>{formatDate(invoice.dueDate)}</td>
                  <td>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
