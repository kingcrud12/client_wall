# Composant — DashboardGrid

**Catégorie** : Page Section  
**Fichier cible** : `src/components/page-sections/DashboardGrid.tsx`

---

## Description

Grille de métriques et widgets affichée sur les pages de tableau de bord (Zone Admin et Zone Client). Organisée en rangées de KPI cards puis de listes/widgets.

---

## Structure Zone Admin (Dashboard Workspace)

```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│  Projets    │  Clients    │  Factures   │  En attente │
│  actifs     │  actifs     │  ce mois    │  de paiement│
│    12       │    28       │  4 200 €    │  1 200 €    │
│  +2 ce mois │  +3 ce mois │  TTC        │  2 factures │
└─────────────┴─────────────┴─────────────┴─────────────┘

┌────────────────────────────┬───────────────────────────┐
│  Projets récents           │  Factures récentes        │
│  ─────────────────────     │  ────────────────────     │
│  > Projet Alpha            │  #2024-042 Dupont — 1800€ │
│  > Projet Beta             │  #2024-041 Martin — 900€  │
│  > Projet Gamma            │  [Voir toutes]            │
│  [Voir tous les projets]   │                           │
└────────────────────────────┴───────────────────────────┘
```

---

## Structure Zone Client (Dashboard Projet)

```
┌────────────────────────────────────────────────────────┐
│  Projet : Alpha — Refonte site e-commerce              │
│  ████████████████░░░░  65% complété                   │
└────────────────────────────────────────────────────────┘

┌─────────────┬─────────────┬─────────────┬─────────────┐
│  Contrat    │  Factures   │  Factures   │  Messages   │
│  Signé ✓   │  en cours   │  en attente │  non lus    │
│             │    2        │   900 € TTC │    3        │
└─────────────┴─────────────┴─────────────┴─────────────┘

┌────────────────────────────┬───────────────────────────┐
│  Dernier rapport           │  Actions rapides          │
│  ─────────────────────     │  ────────────────────     │
│  15 janv. 2025             │  [Voir le contrat]        │
│  "Milestone 2 terminé"     │  [Payer la facture]       │
│  [Voir l'avancement]       │  [Envoyer un message]     │
└────────────────────────────┴───────────────────────────┘
```

---

## KPI Card (sous-composant)

```typescript
type KpiCard = {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: { direction: 'up' | 'down' | 'neutral'; value: string };
  icon?: ReactNode;
  linkTo?: string;
}
```

### Structure visuelle KPI Card

```
┌───────────────────────────┐
│ [Icône]                   │
│                           │
│ 4 200 €                   │ ← valeur, --text-4xl, --font-bold
│ Factures ce mois (TTC)    │ ← label, --text-sm, --color-text-secondary
│ ↑ +15% vs mois dernier    │ ← trend (vert si up, rouge si down)
└───────────────────────────┘
```

---

## Props

| Prop | Type | Description |
|---|---|---|
| `zone` | `'admin' \| 'client' \| 'collab'` | Zone de l'interface |
| `kpis` | `KpiCard[]` | Données des KPI |
| `loading` | `boolean` | État chargement (skeletons) |

---

## États

| État | Comportement |
|---|---|
| Loading | Chaque KPI card remplacée par un Skeleton |
| Empty | KPIs affichés avec valeur 0 ou "—" |
| Error | Card d'erreur avec bouton retry |

---

## Responsive

| Breakpoint | KPIs par ligne |
|---|---|
| Mobile | 2 |
| Tablet | 2-3 |
| Desktop | 4 |

Les widgets (listes, dernière activité) passent de 2 colonnes à 1 colonne sur mobile.
