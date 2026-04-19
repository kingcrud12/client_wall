export type DashboardStat = {
  label: string;
  value: string;
  helper: string;
  emphasis?: "warning" | "primary";
};

export type ProjectSummary = {
  id: string;
  name: string;
  zones: number;
  members: number;
  lastActivity: string;
  shortcuts: Array<{ label: string; href: string }>;
};

export type InvoiceStatus = "draft" | "issued" | "paid" | "overdue" | "refunded";

export type Invoice = {
  id: string;
  client: string;
  amount: number;
  dueDate: string;
  status: InvoiceStatus;
};

export type Alert = {
  id: string;
  type: "warning" | "info" | "error";
  title: string;
  description: string;
  actionLabel?: string;
};

export const dashboardStats: DashboardStat[] = [
  {
    label: "Projets actifs",
    value: "12",
    helper: "+2 ce mois",
  },
  {
    label: "Clients actifs",
    value: "27",
    helper: "zones client",
  },
  {
    label: "CA ce mois (TTC)",
    value: "42 300 €",
    helper: "factures payées",
  },
  {
    label: "En attente de paiement",
    value: "8 540 €",
    helper: "4 factures",
    emphasis: "warning",
  },
];

export const recentProjects: ProjectSummary[] = [
  {
    id: "pjt-01",
    name: "Refonte site MonCourtier",
    zones: 3,
    members: 12,
    lastActivity: "Il y a 2h",
    shortcuts: [
      { label: "Documents", href: "/admin/projects/moncourtier/documents" },
      { label: "Factures", href: "/admin/projects/moncourtier/invoices" },
      { label: "Messagerie", href: "/admin/projects/moncourtier/messages" },
    ],
  },
  {
    id: "pjt-02",
    name: "App mobile WeFund",
    zones: 2,
    members: 9,
    lastActivity: "Hier",
    shortcuts: [
      { label: "Documents", href: "/admin/projects/wefund/documents" },
      { label: "Messagerie", href: "/admin/projects/wefund/messages" },
    ],
  },
  {
    id: "pjt-03",
    name: "Lancement CRM Nova",
    zones: 4,
    members: 18,
    lastActivity: "Il y a 3j",
    shortcuts: [
      { label: "Factures", href: "/admin/projects/nova/invoices" },
      { label: "Messagerie", href: "/admin/projects/nova/messages" },
    ],
  },
  {
    id: "pjt-04",
    name: "Espace client Asteria",
    zones: 2,
    members: 8,
    lastActivity: "08/02/2025",
    shortcuts: [
      { label: "Documents", href: "/admin/projects/asteria/documents" },
      { label: "Factures", href: "/admin/projects/asteria/invoices" },
    ],
  },
  {
    id: "pjt-05",
    name: "Portail interne Crafty",
    zones: 3,
    members: 14,
    lastActivity: "07/02/2025",
    shortcuts: [
      { label: "Documents", href: "/admin/projects/crafty/documents" },
      { label: "Messagerie", href: "/admin/projects/crafty/messages" },
    ],
  },
];

export const invoices: Invoice[] = [
  {
    id: "FAC-2025-021",
    client: "MonCourtier",
    amount: 18000,
    dueDate: "2025-02-20",
    status: "issued",
  },
  {
    id: "FAC-2025-018",
    client: "WeFund",
    amount: 9200,
    dueDate: "2025-02-05",
    status: "overdue",
  },
  {
    id: "FAC-2025-017",
    client: "Nova CRM",
    amount: 14500,
    dueDate: "2025-01-31",
    status: "paid",
  },
  {
    id: "FAC-2025-016",
    client: "Asteria",
    amount: 2400,
    dueDate: "2025-02-18",
    status: "draft",
  },
  {
    id: "FAC-2025-014",
    client: "Crafty",
    amount: 3200,
    dueDate: "2025-01-20",
    status: "refunded",
  },
];

export const alerts: Alert[] = [
  {
    id: "alt-01",
    type: "warning",
    title: "2 factures dépassent l'échéance",
    description: "8 540 € à relancer avant suspension d'accès clients.",
    actionLabel: "Voir les factures",
  },
  {
    id: "alt-02",
    type: "info",
    title: "Stockage utilisé à 82 %",
    description: "Passez sur le plan Scale pour débloquer 2 To supplémentaires.",
    actionLabel: "Consulter les plans",
  },
];

/* ── Reports ─────────────────────────────────────────── */

export type MilestoneStatus = "todo" | "in_progress" | "done";
export type ReportStatus = "draft" | "published" | "archived";

export type Milestone = {
  id: string;
  label: string;
  status: MilestoneStatus;
};

export type ProgressReport = {
  id: string;
  project: string;
  period: string;
  progress: number;
  status: ReportStatus;
  publishedAt?: string;
  summary: string;
  milestones: Milestone[];
};

/* ── Documents ───────────────────────────────────────── */

export type DocType = "pdf" | "docx" | "xlsx" | "image" | "contract" | "other";

export type ProjectDocument = {
  id: string;
  name: string;
  type: DocType;
  size: string;
  uploadedAt: string;
  project: string;
  zones: string[];
};

/* ── Message threads ─────────────────────────────────── */

export type ThreadZone = "client" | "collab";

export type MessageThread = {
  id: string;
  title: string;
  project: string;
  zone: ThreadZone;
  lastMessage: string;
  lastMessageAt: string;
  unread: number;
  participants: number;
};

/* ── Timesheets ──────────────────────────────────────── */

export type TimesheetStatus = "in_progress" | "submitted" | "validated";

export type Timesheet = {
  id: string;
  project: string;
  period: string;
  hours: number;
  status: TimesheetStatus;
  submittedAt?: string;
};

export type AssignedProject = {
  id: string;
  name: string;
  role: string;
  progress: number;
  lastActivity: string;
};

export const collabStats: DashboardStat[] = [
  {
    label: "Heures ce mois",
    value: "87h 30",
    helper: "↑ 12h vs mois dernier",
  },
  {
    label: "Projets assignés",
    value: "4",
    helper: "2 actifs cette semaine",
  },
  {
    label: "Timesheets soumises",
    value: "3",
    helper: "en attente de validation",
    emphasis: "primary",
  },
  {
    label: "Messages non lus",
    value: "5",
    helper: "2 fils actifs",
    emphasis: "warning",
  },
];

export const timesheets: Timesheet[] = [
  {
    id: "TS-2025-011",
    project: "Refonte MonCourtier",
    period: "Fév. 2025 S2",
    hours: 38.5,
    status: "submitted",
    submittedAt: "2025-02-17",
  },
  {
    id: "TS-2025-010",
    project: "App mobile WeFund",
    period: "Fév. 2025 S1",
    hours: 40,
    status: "validated",
    submittedAt: "2025-02-10",
  },
  {
    id: "TS-2025-009",
    project: "Refonte MonCourtier",
    period: "Janv. 2025 S4",
    hours: 35,
    status: "validated",
    submittedAt: "2025-01-31",
  },
  {
    id: "TS-2025-012",
    project: "Lancement CRM Nova",
    period: "Mars 2025 S1",
    hours: 9,
    status: "in_progress",
  },
];

export const assignedProjects: AssignedProject[] = [
  {
    id: "pjt-01",
    name: "Refonte site MonCourtier",
    role: "Développeur front",
    progress: 72,
    lastActivity: "Il y a 2h",
  },
  {
    id: "pjt-02",
    name: "App mobile WeFund",
    role: "Développeur mobile",
    progress: 55,
    lastActivity: "Hier",
  },
  {
    id: "pjt-03",
    name: "Lancement CRM Nova",
    role: "Intégrateur",
    progress: 30,
    lastActivity: "Il y a 3j",
  },
  {
    id: "pjt-05",
    name: "Portail interne Crafty",
    role: "Développeur back",
    progress: 90,
    lastActivity: "07/02/2025",
  },
];

export const collabAlerts: Alert[] = [
  {
    id: "calt-01",
    type: "info",
    title: "Timesheet Fév. S2 en attente de validation",
    description: "Soumise le 17/02 — en attente de validation par votre manager.",
  },
  {
    id: "calt-02",
    type: "warning",
    title: "Rapport d'avancement à produire",
    description: "Le jalon #3 du projet MonCourtier est terminé. Rédigez le rapport.",
    actionLabel: "Créer le rapport",
  },
];

export const progressReports: ProgressReport[] = [
  {
    id: "RPT-2025-008",
    project: "Refonte MonCourtier",
    period: "Fév. 2025 — Semaine 2",
    progress: 72,
    status: "published",
    publishedAt: "2025-02-14",
    summary:
      "Intégration du module de paiement terminée. Tests de régression en cours sur les parcours critique.",
    milestones: [
      { id: "m1", label: "Phase design", status: "done" },
      { id: "m2", label: "Développement backend", status: "done" },
      { id: "m3", label: "Intégration paiement", status: "done" },
      { id: "m4", label: "Développement frontend", status: "in_progress" },
      { id: "m5", label: "Tests & recette", status: "todo" },
      { id: "m6", label: "Mise en production", status: "todo" },
    ],
  },
  {
    id: "RPT-2025-007",
    project: "Refonte MonCourtier",
    period: "Fév. 2025 — Semaine 1",
    progress: 58,
    status: "published",
    publishedAt: "2025-02-07",
    summary:
      "Migration de la base de données terminée avec succès. Démarrage du module de paiement.",
    milestones: [
      { id: "m1", label: "Phase design", status: "done" },
      { id: "m2", label: "Développement backend", status: "done" },
      { id: "m3", label: "Intégration paiement", status: "in_progress" },
      { id: "m4", label: "Développement frontend", status: "todo" },
      { id: "m5", label: "Tests & recette", status: "todo" },
      { id: "m6", label: "Mise en production", status: "todo" },
    ],
  },
  {
    id: "RPT-2025-004",
    project: "App mobile WeFund",
    period: "Janv. 2025 — Semaine 4",
    progress: 45,
    status: "published",
    publishedAt: "2025-01-31",
    summary:
      "Maquettes validées par le client. Démarrage du développement des écrans d'authentification.",
    milestones: [
      { id: "m1", label: "Maquettes UX", status: "done" },
      { id: "m2", label: "Architecture technique", status: "done" },
      { id: "m3", label: "Écrans authentification", status: "in_progress" },
      { id: "m4", label: "Écrans tableau de bord", status: "todo" },
      { id: "m5", label: "Publication stores", status: "todo" },
    ],
  },
  {
    id: "RPT-2025-001",
    project: "Lancement CRM Nova",
    period: "Janv. 2025 — Semaine 1",
    progress: 15,
    status: "archived",
    publishedAt: "2025-01-08",
    summary: "Cadrage initial terminé. Rédaction du cahier des charges fonctionnel.",
    milestones: [
      { id: "m1", label: "Cadrage projet", status: "done" },
      { id: "m2", label: "Cahier des charges", status: "in_progress" },
      { id: "m3", label: "Développement", status: "todo" },
    ],
  },
];

export const projectDocuments: ProjectDocument[] = [
  {
    id: "doc-001",
    name: "Contrat-cadre-MonCourtier-2025.pdf",
    type: "contract",
    size: "1.2 MB",
    uploadedAt: "2025-01-15",
    project: "Refonte MonCourtier",
    zones: ["Collab", "Client"],
  },
  {
    id: "doc-002",
    name: "Maquettes-v3-MonCourtier.fig",
    type: "other",
    size: "18.4 MB",
    uploadedAt: "2025-01-22",
    project: "Refonte MonCourtier",
    zones: ["Collab"],
  },
  {
    id: "doc-003",
    name: "Planning-fevrier-2025.xlsx",
    type: "xlsx",
    size: "84 KB",
    uploadedAt: "2025-02-01",
    project: "Refonte MonCourtier",
    zones: ["Collab"],
  },
  {
    id: "doc-004",
    name: "Specs-techniques-WeFund.docx",
    type: "docx",
    size: "340 KB",
    uploadedAt: "2025-01-18",
    project: "App mobile WeFund",
    zones: ["Collab"],
  },
  {
    id: "doc-005",
    name: "Rapport-avancement-janv-S4.pdf",
    type: "pdf",
    size: "512 KB",
    uploadedAt: "2025-01-31",
    project: "App mobile WeFund",
    zones: ["Collab", "Client"],
  },
  {
    id: "doc-006",
    name: "Capture-dashboard-v2.png",
    type: "image",
    size: "2.1 MB",
    uploadedAt: "2025-02-10",
    project: "Refonte MonCourtier",
    zones: ["Collab"],
  },
];

export const messageThreads: MessageThread[] = [
  {
    id: "thr-c01",
    title: "Validation maquettes — lot 2",
    project: "Refonte MonCourtier",
    zone: "client",
    lastMessage: "On attend votre retour sur les derniers écrans partagés.",
    lastMessageAt: "Il y a 1h",
    unread: 2,
    participants: 4,
  },
  {
    id: "thr-c02",
    title: "Point budget maintenance",
    project: "Refonte MonCourtier",
    zone: "client",
    lastMessage: "Le forfait maintenance inclut-il les mises à jour de sécurité ?",
    lastMessageAt: "Hier",
    unread: 0,
    participants: 3,
  },
  {
    id: "thr-i01",
    title: "Découpage sprint 3",
    project: "App mobile WeFund",
    zone: "collab",
    lastMessage: "J'ai mis à jour le board Jira avec les nouvelles user stories.",
    lastMessageAt: "Hier",
    unread: 1,
    participants: 5,
  },
  {
    id: "thr-i02",
    title: "Environnement de staging KO",
    project: "App mobile WeFund",
    zone: "collab",
    lastMessage: "Le cert SSL a expiré, je relance le renouvellement auto.",
    lastMessageAt: "Il y a 3j",
    unread: 0,
    participants: 3,
  },
  {
    id: "thr-i03",
    title: "Revue de code — module auth",
    project: "Lancement CRM Nova",
    zone: "collab",
    lastMessage: "PR #42 prête pour review, j'ai ajouté les tests unitaires.",
    lastMessageAt: "Il y a 3j",
    unread: 0,
    participants: 2,
  },
];

export const clientHighlights = {
  project: "Portail client Asteria",
  nextDeliverable: "Lot 2 — Livrables UX",
  nextDeliverableDate: "25 février 2025",
  progress: 68,
  openThreads: [
    { id: "thr-01", title: "Validation jalon #3", updatedAt: "Il y a 1h" },
    { id: "thr-02", title: "Question budget maintenance", updatedAt: "Hier" },
  ],
  documents: [
    { id: "doc-01", title: "Contrat cadre signé.pdf", updatedAt: "02/02/2025" },
    { id: "doc-02", title: "Facture 2025-017.pdf", updatedAt: "30/01/2025" },
  ],
};
