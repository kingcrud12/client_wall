# Arborescence — Zone Client

Zone réservée aux **clients externes**. Interface épurée, centrée sur la consultation et les actions de collaboration autorisées. Accès lecture prédominant, actions d'écriture limitées (upload, paiement, messagerie, signature).

---

## Accès

| Rôle | Accès |
|---|---|
| Membre d'une zone client | Accès aux ressources de son projet uniquement |
| Non authentifié | Redirigé vers `/auth/login` |
| Owner / manager / collaborateur | Interdit — voir leurs zones dédiées |

---

## Principe de la zone client

- Un client ne voit **jamais** les données internes (coûts, marges, taux horaires, montants HT)
- Un client voit uniquement les documents **explicitement exposés** à sa zone
- Un client peut **payer une facture** si son rôle inclut `pay:invoice`
- Un client peut **signer ou rejeter un contrat** si son rôle inclut `sign:contract`
- La messagerie client ↔ collaborateur est **interdite par défaut** (nécessite `cross_zone_authorization`)
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
    │   Spec : pages/client/dashboard.md
    │   Description : Vue synthétique du projet côté client.
    │     - Topbar avec navigation + notifications + profil
    │     - Alerte prioritaire (contrat à signer, facture en retard)
    │     - Progression globale basée sur le dernier rapport
    │     - Cards résumé : Contrat / Factures / Fichiers / Messages
    │     - Aperçu du dernier rapport d'avancement
    │     - Banner onboarding premier accès
    │
    ├── contract
    │   Route : /client/:projectId/contract
    │   Auth : membre zone client (permission read:contract)
    │   Spec : pages/client/contract.md
    │   Description : Consultation, signature et rejet du contrat.
    │     - Visualisation PDF embarqué
    │     - Statut : pending / signed / rejected
    │     - Signature (redirection outil externe) si sign:contract
    │     - Rejet avec motif (dialog) si sign:contract
    │     - Historique des versions contractuelles
    │     - Téléchargement du document (signé ou non)
    │
    ├── invoices/
    │   │
    │   ├── (Liste des factures)
    │   │   Route : /client/:projectId/invoices/
    │   │   Auth : membre zone client (permission read:invoice)
    │   │   Spec : pages/client/invoices.md
    │   │   Description : Toutes les factures du projet accessibles au client.
    │   │     - Bannière alerte si facture overdue
    │   │     - Métriques synthèse (payé, à régler, en retard) en TTC
    │   │     - Filtres : Toutes / À payer / En retard / Payées
    │   │     - Actions selon statut et permissions
    │   │
    │   └── :invoiceId
    │       Route : /client/:projectId/invoices/:invoiceId
    │       Auth : membre zone client (permission read:invoice)
    │       Spec : pages/client/invoices.md
    │       Description : Détail d'une facture.
    │         - Document facture formaté (montants TTC uniquement)
    │         - Paiement Stripe si statut issued/overdue ET permission pay:invoice
    │         - Gestion du solde restant si partially_paid
    │         - Téléchargement PDF + reçu de paiement si paid
    │
    ├── progress
    │   Route : /client/:projectId/progress
    │   Auth : membre zone client (permission read:progress_report)
    │   Spec : pages/client/progress.md
    │   Description : Historique des rapports d'avancement publiés.
    │     - Progression globale sticky (couleur selon %)
    │     - Fil chronologique avec milestones illustrés
    │     - Couleur de la ProgressBar adaptative (rouge → orange → bleu → vert)
    │     - Prévisualisation des fichiers joints (lightbox image, iframe PDF)
    │     - Navigation d'ancrage entre rapports (desktop ≥ 3 rapports)
    │
    ├── files
    │   Route : /client/:projectId/files
    │   Auth : membre zone client (permission read:document)
    │   Spec : pages/client/files.md
    │   Description : Centre de fichiers partagés avec le client.
    │     - Documents partagés par l'organisation (section dédiée)
    │     - Fichiers uploadés par le client (section dédiée)
    │     - Prévisualisation images (lightbox) et PDF (iframe modal)
    │     - Upload multiple avec progression par fichier (si add:document)
    │     - Suppression fichiers propres (si delete:document ou auteur)
    │     - Indicateur quota stockage si > 80%
    │
    ├── messaging
    │   Route : /client/:projectId/messaging
    │   Auth : membre zone client (permission message_read:message)
    │   Spec : pages/client/messaging.md
    │   Description : Messagerie avec l'organisation.
    │     - Threads zone client avec indicateurs non lus
    │     - Création de sujet (si message_write:message)
    │     - Messages directs avec collaborateur (si cross_zone_authorization)
    │     - Pièces jointes dans les messages (images + fichiers)
    │     - Indicateurs de lecture (envoyé / délivré / lu)
    │     - Indicateur de frappe en temps réel
    │
    └── profile
        Route : /client/:projectId/profile
        Auth : utilisateur connecté
        Spec : pages/client/profile.md
        Description : Profil et préférences du compte client.
          - Informations personnelles (prénom, nom, email, poste)
          - Avatar avec crop
          - Changement de mot de passe
          - Préférences de notification par email
          - Déconnexion (appareil courant ou tous appareils)
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
| `/client/:projectId/invoices/` | `status` | `issued`, `paid`, `overdue` | Pré-filtrer les factures |
| `/client/:projectId/files` | `type` | `pdf`, `image`, `doc`, `archive` | Filtrer par type de fichier |
| `/auth/login` | `session_expired` | `1` | Message "session expirée" sur la page de login |

---

## Navigation Zone Client

Navigation horizontale en topbar — pas de sidebar.

```
[Logo workspace]  [Nom du projet]

[Aperçu]  [Contrat •]  [Factures 2]  [Avancement •]  [Fichiers]  [Messages 3]

                                                    [🔔]  [Jean D. ▾]
```

- Badges numériques sur les onglets avec données non lues
- Point `•` si événement non consulté (nouveau rapport, contrat en attente...)
- Hamburger sur mobile → drawer pleine hauteur

---

## Permissions clés

| Permission | Effet sur l'interface |
|---|---|
| `read:contract` | Onglet Contrat visible |
| `sign:contract` | Boutons Signer / Refuser visibles |
| `read:invoice` | Onglet Factures visible |
| `pay:invoice` | Bouton Payer visible |
| `read:progress_report` | Onglet Avancement visible |
| `read:document` | Onglet Fichiers visible |
| `add:document` | Bouton upload visible |
| `delete:document` | Bouton supprimer ses fichiers visible |
| `message_read:message` | Onglet Messages visible |
| `message_write:message` | Zone de saisie + bouton nouveau sujet visibles |

Si aucune permission n'est accordée pour un module, l'onglet correspondant est masqué de la topbar.

---

## Cas non couverts (à spécifier si besoin)

| Cas | Notes |
|---|---|
| Client sur plusieurs projets | Pas de dashboard multi-projets côté client — chaque projet est une URL distincte |
| Accès révoqué / zone fermée | Afficher la page d'erreur générique avec message "Vous n'avez plus accès à cet espace." |
| Onboarding guidé pas à pas | Couvert par le banner first_login dans le dashboard |
