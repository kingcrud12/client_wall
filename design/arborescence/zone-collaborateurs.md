# Arborescence — Zone Collaborateurs

Zone réservée aux **membres internes** du workspace (collaborateurs assignés à des projets). Interface centrée sur l'exécution : saisie de temps, rapports, documents, communication.

---

## Accès

| Rôle | Accès |
|---|---|
| `owner` / `manager` | Accès complet + actions manager (validation timesheets, création rapports) |
| `member` (collaborateur) | Accès à ses projets uniquement, sans données confidentielles |
| Non authentifié | Redirigé vers `/auth/login` |
| Client externe | Interdit — redirigé vers zone client |

---

## Différence Admin vs Collaborateurs

Les managers peuvent accéder aux deux zones. Les collaborateurs n'ont accès qu'à la zone collaborateurs. Les données confidentielles (taux horaire, coûts, marges) sont masquées pour les `member`.

---

## Arborescence détaillée

```
/collab/
│
├── (Dashboard collaborateur)
│   Route : /collab/
│   Auth : workspace member
│   Description : Vue personnelle — projets assignés, timesheets en cours,
│                 messages non lus, alertes.
│
└── projects/
    └── :projectId/
        │
        ├── (Vue projet)
        │   Route : /collab/projects/:projectId/
        │   Auth : membre du projet (zone collaborateur)
        │   Description : Résumé du projet — dernière activité, progression,
        │                 rapports publiés, messages récents.
        │
        ├── timesheets/
        │   │
        │   ├── (Mes timesheets)
        │   │   Route : /collab/projects/:projectId/timesheets/
        │   │   Auth : membre du projet
        │   │   Description : Liste de toutes ses feuilles de temps.
        │   │     - Filtres : période, statut (in_progress, submitted, validated)
        │   │     - Résumé heures par mois
        │   │
        │   ├── new
        │   │   Route : /collab/projects/:projectId/timesheets/new
        │   │   Auth : membre du projet
        │   │   Description : Créer une nouvelle feuille de temps.
        │   │     - Sélection période
        │   │     - Saisie lignes (date, tâche, durée, commentaire)
        │   │
        │   └── :timesheetId
        │       Route : /collab/projects/:projectId/timesheets/:timesheetId
        │       Auth : propriétaire timesheet + managers
        │       Description : Détail / édition timesheet.
        │         Collaborateur : édite si in_progress, lecture seule si validé
        │         Manager : voit les coûts (taux horaire), peut valider
        │
        ├── reports/
        │   │
        │   ├── (Rapports d'avancement)
        │   │   Route : /collab/projects/:projectId/reports/
        │   │   Auth : membres du projet
        │   │   Description : Historique des rapports publiés.
        │   │
        │   ├── new
        │   │   Route : /collab/projects/:projectId/reports/new
        │   │   Auth : manager uniquement
        │   │   Description : Créer un rapport (milestones, %, narration).
        │   │
        │   └── :reportId
        │       Route : /collab/projects/:projectId/reports/:reportId
        │       Auth : membres du projet
        │       Description : Détail rapport.
        │         Manager : peut publier / archiver
        │         Collaborateur : lecture seule
        │
        ├── documents
        │   Route : /collab/projects/:projectId/documents
        │   Auth : membres du projet
        │   Description : Documents du projet accessibles à la zone collaborateurs.
        │     - Upload de fichiers (livrables, assets)
        │     - Téléchargement
        │     - Visibilité configurable par le manager
        │
        └── messaging
            Route : /collab/projects/:projectId/messaging
            Auth : membres de la zone collaborateurs
            Description : Messagerie interne de la zone.
              - Liste des threads
              - Créer un thread
              - Messagerie directe avec autres collaborateurs
```

---

## Paramètres d'URL

| Paramètre | Type | Description |
|---|---|---|
| `:projectId` | UUID | Identifiant unique du projet |
| `:timesheetId` | UUID | Identifiant unique de la feuille de temps |
| `:reportId` | UUID | Identifiant unique du rapport d'avancement |

## Query params notables

| Route | Param | Valeurs | Usage |
|---|---|---|---|
| `/collab/projects/:id/timesheets/` | `status` | `in_progress`, `submitted`, `validated` | Filtrer timesheets |
| `/collab/projects/:id/timesheets/` | `period` | `YYYY-MM` | Filtrer par mois |
| `/collab/projects/:id/documents` | `type` | `file`, `contract`... | Filtrer type |

---

## Navigation Zone Collaborateurs

```
[Barre de navigation]
Mon espace → /collab/
Projets (liste assignés)

[Projet sélectionné]
├── Vue projet       → /collab/projects/:id/
├── Mes timesheets   → /collab/projects/:id/timesheets/
├── Rapports         → /collab/projects/:id/reports/
├── Documents        → /collab/projects/:id/documents
└── Messagerie       → /collab/projects/:id/messaging
```

---

## Données confidentielles (jamais affichées aux `member`)

- Taux horaire (`hourly_rate`) sur les timesheets
- Coût total calculé
- Marges et bénéfices
- Détails de facturation client
- Stripe configs
