import { Download } from "lucide-react";
import { AdminShell } from "@/components/layout/admin-shell";
import { InvoicesPanel } from "@/components/dashboard/invoices-panel";
import { Button } from "@/components/primitives/button";
import { invoices } from "@/data/mock-data";

export default function InvoicesPage() {
  return (
    <AdminShell
      title="Factures"
      subtitle="Synchronisées avec Stripe"
      actions={
        <Button variant="secondary" size="sm" icon={<Download size={14} />}>
          Export CSV
        </Button>
      }
    >
      <InvoicesPanel invoices={invoices} />
    </AdminShell>
  );
}
