# Arborescence — Zone Admin

Zone réservée aux **owner** et **manager** du workspace. Interface de gestion complète.

---

## Accès

| Rôle | Accès |
|---|---|
| `owner` | Accès complet à toutes les pages |
| `manager` | Accès complet sauf facturation workspace et transfert d'ownership |
| `member` | Redirigé vers Zone Collaborateurs |
| Non authentifié | Redirigé vers `/auth/login` |

---

## Arborescence détaillée

```
/admin/
│
├── (Dashboard workspace)
│   Route : /admin/
│   Auth : owner, manager
│   Description : Vue synthétique du workspace — projets actifs, alertes,
│                 statistiques rapides.
│
├── settings
│   Route : /admin/settings
│   Auth : owner, manager
│   Sections :
│     - Informations workspace (nom, adresse, logo)
│     - Intégration Stripe (clé API, webhooks)
│     - Informations de facturation (SIRET, TVA, adresse légale)
│     - Danger zone (supprimer workspace — owner only)
│
├── members
│   Route : /admin/members
│   Auth : owner, manager
│   Sections :
│     - Liste des membres du workspace
│     - Invitation par email
│     - Changement de rôle (owner only pour promouvoir manager)
│     - Suppression de membre
│
├── billing
│   Route : /admin/billing
│   Auth : owner only
│   Sections :
│     - Plan actuel (Free / Medium / Extra / Enterprise)
│     - Usage (clients, sièges, stockage)
│     - Historique paiements
│     - Upgrade / downgrade
│
└── projects/
    │
    ├── (Liste des projets)
    │   Route : /admin/projects/
    │   Auth : owner, manager
    │   Description : Tous les projets du workspace, filtres, recherche.
    │
    ├── new
    │   Route : /admin/projects/new
    │   Auth : owner, manager
    │   Description : Formulaire de création de projet.
    │
    └── :projectId/
        │
        ├── (Vue générale projet)
        │   Route : /admin/projects/:projectId/
        │   Auth : owner, manager
        │   Description : Résumé projet — zones, membres, dernière activité.
        │
        ├── zones
        │   Route : /admin/projects/:projectId/zones
        │   Auth : owner, manager
        │   Description : Gestion des zones (client / collaborateur).
        │     - Créer zone
        │     - Ajouter/retirer membres d'une zone
        │     - Configurer rôles par zone
        │
        ├── members
        │   Route : /admin/projects/:projectId/members
        │   Auth : owner, manager
        │   Description : Membres du projet et leurs rôles.
        │     - Affecter rôle à un user
        │     - Créer/éditer des rôles custom
        │     - Matrice des permissions
        │
        ├── documents
        │   Route : /admin/projects/:projectId/documents
        │   Auth : owner, manager
        │   Description : Centre de documents du projet.
        │     - Upload fichiers
        │     - Gérer la visibilité par zone
        │     - Voir versions
        │     - Télécharger / supprimer
        │
        ├── invoices/
        │   │
        │   ├── (Liste factures)
        │   │   Route : /admin/projects/:projectId/invoices/
        │   │   Auth : owner, manager
        │   │   Description : Toutes les factures du projet.
        │   │
        │   ├── new
        │   │   Route : /admin/projects/:projectId/invoices/new
        │   │   Auth : owner, manager
        │   │   Description : Créer une nouvelle facture.
        │   │
        │   └── :invoiceId
        │       Route : /admin/projects/:projectId/invoices/:invoiceId
        │       Auth : owner, manager
        │       Description : Détail facture — édition (si draft) ou lecture.
        │
        ├── messaging
        │   Route : /admin/projects/:projectId/messaging
        │   Auth : owner, manager, zone members
        │   Description : Threads de messagerie dans les zones du projet.
        │
        ├── log-global
        │   Route : /admin/projects/:projectId/log-global
        │   Auth : owner, manager uniquement
        │   Description : Vue consolidée de tous les messages toutes zones.
        │                 Outil d'audit et supervision.
        │
        └── settings
            Route : /admin/projects/:projectId/settings
            Auth : owner, manager
            Description : Paramètres du projet (nom, description, archivage).
```

---

## Paramètres d'URL

| Paramètre | Type | Description |
|---|---|---|
| `:projectId` | UUID | Identifiant unique du projet |
| `:invoiceId` | UUID | Identifiant unique de la facture |

## Query params notables

| Route | Param | Valeurs | Usage |
|---|---|---|---|
| `/admin/projects/` | `status` | `active`, `archived` | Filtrer projets |
| `/admin/projects/:id/documents` | `zone` | UUID zone | Filtrer par zone |
| `/admin/projects/:id/documents` | `type` | `invoice`, `contract`... | Filtrer par type |
| `/admin/projects/:id/invoices/` | `status` | `draft`, `issued`, `paid`... | Filtrer factures |
| `/admin/projects/:id/messaging` | `zone` | UUID zone | Sélectionner zone |

---

## Navigation sidebar Admin

```
Workspace "Mon Agence"
├── Dashboard
├── Projets          → /admin/projects/
├── Membres          → /admin/members/
├── Paramètres       → /admin/settings
└── Facturation      → /admin/billing (owner only)

[Projet sélectionné : "Projet Alpha"]
├── Vue générale     → /admin/projects/:id/
├── Zones            → /admin/projects/:id/zones
├── Membres          → /admin/projects/:id/members
├── Documents        → /admin/projects/:id/documents
├── Factures         → /admin/projects/:id/invoices/
├── Messagerie       → /admin/projects/:id/messaging
├── Journal global   → /admin/projects/:id/log-global (managers only)
└── Paramètres       → /admin/projects/:id/settings
```
