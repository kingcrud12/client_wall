# Arborescence — Zone Client

Zone réservée aux **clients externes**. Interface épurée, centrée sur la consultation et les actions de collaboration autorisées. Accès lecture prédominant, actions d'écriture limitées (upload, paiement, messagerie).

---

## Accès

| Rôle | Accès |
|---|---|
| Membre d'une zone client | Accès aux ressources de son projet uniquement |
| Non authentifié | Redirigé vers `/auth/login` |
| Owner / manager / collaborateur | Interdit — voir leurs zones dédiées |

---

## Principe de la zone client

- Un client ne voit **jamais** les données internes (coûts, marges, taux horaires)
- Un client voit uniquement les documents **explicitement exposés** à sa zone
- Un client peut **payer une facture** si son rôle le permet
- La messagerie client ↔ collaborateur est **interdite par défaut**
- Plusieurs représentants d'un même client peuvent coexister dans une zone avec des rôles différents

---

## Arborescence détaillée

```
/client/
└── :projectId/
    │
    ├── (Dashboard client)
    │   Route : /client/:projectId/
    │   Auth : membre d'une zone client du projet
    │   Description : Vue synthétique du projet côté client.
    │     - Nom du projet
    │     - Progression globale (% si rapport publié)
    │     - Dernier rapport d'avancement
    │     - Factures récentes
    │     - Messages non lus
    │     - Raccourcis vers toutes les sections
    │
    ├── contract
    │   Route : /client/:projectId/contract
    │   Auth : membre zone client (permission read:contract)
    │   Description : Visualisation et signature du contrat du projet.
    │     - Visualisation PDF embarqué
    │     - Statut : pending / signed / rejected
    │     - Bouton de signature (redirection vers outil externe)
    │     - Téléchargement du document signé
    │
    ├── invoices/
    │   │
    │   ├── (Liste des factures)
    │   │   Route : /client/:projectId/invoices/
    │   │   Auth : membre zone client (permission read:invoice)
    │   │   Description : Toutes les factures du projet accessibles au client.
    │   │     - Filtres : statut (issued, paid, overdue...)
    │   │     - Indicateur visuel du statut
    │   │     - Montants HT et TTC
    │   │
    │   └── :invoiceId
    │       Route : /client/:projectId/invoices/:invoiceId
    │       Auth : membre zone client (permission read:invoice)
    │       Description : Détail d'une facture.
    │         - Tous les champs de la facture (émetteur, destinataire, lignes)
    │         - Total HT, TVA, TTC
    │         - Bouton paiement Stripe (si statut issued/overdue ET permission pay:invoice)
    │         - Téléchargement PDF
    │
    ├── progress
    │   Route : /client/:projectId/progress
    │   Auth : membre zone client (permission read:progress_report)
    │   Description : Historique des rapports d'avancement publiés.
    │     - Timeline chronologique
    │     - Milestones avec statut (todo, in_progress, done)
    │     - Barre de progression globale
    │     - Narration et prochaines étapes
    │     - Fichiers/captures attachés
    │
    ├── files
    │   Route : /client/:projectId/files
    │   Auth : membre zone client (permission read:document)
    │   Description : Centre de fichiers partagés avec le client.
    │     - Documents exposés par l'organisation à la zone client
    │     - Upload client (si permission add:document)
    │     - Téléchargement
    │     - Organisation par type / date
    │
    └── messaging
        Route : /client/:projectId/messaging
        Auth : membre zone client (permission message_read:message)
        Description : Messagerie avec l'organisation.
          - Threads de la zone client
          - Créer un message (si permission message_write:message)
          - Messagerie directe avec collaborateur (si cross_zone_authorization)
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
| `/client/:projectId/invoices/` | `status` | `issued`, `paid`, `overdue` | Filtrer factures |
| `/client/:projectId/files` | `type` | `contract`, `file`, `invoice`... | Filtrer type |

---

## Navigation Zone Client

Navigation simplifiée — pas de sidebar complexe. Navigation horizontale fixe en haut.

```
[Topbar]
Logo Client Wall | Nom du projet | [Profil] [Déconnexion]

[Navigation principale]
Aperçu | Contrat | Factures | Avancement | Fichiers | Messages
```

---

## Pages manquantes zone client

| Page | Statut | Raison |
|---|---|---|
| Onboarding client (premier accès) | Manquante | Expérience première connexion non définie |
| Accès révoqué / zone fermée | Manquante | État d'erreur métier non spécifié |
| Multi-projets (client sur plusieurs projets) | Manquante | Cas d'usage possible mais non couvert |
