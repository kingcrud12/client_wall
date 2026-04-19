# Index — Composants Composites

Les composites assemblent des primitives pour répondre à des besoins UI spécifiques. Ils peuvent avoir une légère opinion sur le domaine métier.

---

## Liste des composites documentés

| Composant | Fichier | Description |
|---|---|---|
| Navbar / Topbar | `navbar.md` | Navigation horizontale fixe |
| Sidebar | `sidebar.md` | Navigation latérale Admin / Collab |
| CardProject | `card-project.md` | Card résumé d'un projet |
| CardInvoice | `card-invoice.md` | Card résumé d'une facture |
| MessageThread | `message-thread.md` | Interface messagerie zones |
| PermissionMatrix | `permission-matrix.md` | Grille de configuration des permissions |
| FileUploader | `file-uploader.md` | Zone upload avec statuts |

---

## Composites à documenter (backlog)

| Composant | Description | Priorité |
|---|---|---|
| CardDocument | Card résumé d'un document | Haute |
| TimesheetRow | Ligne de saisie timesheet | Haute |
| MilestoneItem | Item de milestone (rapport avancement) | Haute |
| InvoiceEditor | Formulaire création/édition facture | Haute |
| RoleSelector | Sélecteur de rôle avec description | Haute |
| ZoneMemberList | Liste membres d'une zone avec rôles | Haute |
| DirectMessage | Interface messagerie directe 1-to-1 | Moyenne |
| NotificationPanel | Panneau notifications latéral | Moyenne |
| ConfirmDialog | Dialog de confirmation action destructive | Haute |
| EmptyState | État vide illustré (aucun projet, etc.) | Haute |
| ErrorState | État d'erreur avec retry | Haute |
| LoadingState | Skeleton de chargement par page | Haute |
| PlanUpgradeBanner | Bannière d'invitation à upgrader | Basse |
| ContractViewer | Visualiseur PDF contrat | Haute |
| ProgressReportCard | Card rapport d'avancement publié | Haute |

---

## Règles pour les composites

1. **Assemblent des primitives** — les composites utilisent Button, Input, Badge, Avatar...
2. **Logique UI possible** — gestion d'états locaux, interactions internes
3. **Pas de logique métier de persistance** — les appels API sont dans les pages/hooks
4. **Props clairement typées** — les types de données doivent correspondre au modèle de données réel
5. **Tous les états couverts** — default, loading, empty, error pour chaque composite
