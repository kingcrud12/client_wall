# Index — Composants Page Sections

Les page sections sont des organismes assemblant plusieurs composites pour composer des zones de pages complètes.

---

## Liste des page sections documentées

| Composant | Fichier | Description |
|---|---|---|
| DashboardGrid | `dashboard-grid.md` | Grille KPIs + widgets dashboard |
| InvoiceTable | `invoice-table.md` | Tableau liste de factures avec filtres |

---

## Page sections à documenter (backlog)

| Composant | Description | Priorité |
|---|---|---|
| DocumentList | Liste de documents avec filtres et upload | Haute |
| TimesheetForm | Formulaire de saisie timesheet (lignes) | Haute |
| ProgressTimeline | Timeline chronologique des rapports | Haute |
| MilestonesBoard | Board milestones d'un rapport | Haute |
| InvoiceForm | Formulaire création/édition facture | Haute |
| MembersTable | Tableau membres avec rôles et actions | Haute |
| ZoneBuilder | Interface création/config zone | Haute |
| ProjectHeader | En-tête de page projet avec méta-données | Moyenne |
| ActivityFeed | Journal d'activité récente | Moyenne |
| GlobalLog | Vue consolidée messages toutes zones | Moyenne |
| PricingTable | Tableau des plans tarifaires | Basse |
| OnboardingSteps | Étapes d'onboarding workspace | Basse |

---

## Règles pour les page sections

1. **Spécifiques à une page ou un type de page** — pas de section générique réutilisée partout
2. **Acceptent les états de chargement et d'erreur** — chaque section gère son propre skeleton/erreur
3. **Ne font pas d'appels API** — les données arrivent via les props depuis la page parent
4. **Responsive par défaut** — s'adaptent aux breakpoints définis dans `tokens/breakpoints.md`
