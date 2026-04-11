# Sitemap Global — Client Wall

Vue d'ensemble de toutes les routes du produit, toutes zones confondues.

---

## Arborescence complète

```
/
├── auth/
│   ├── login                         ← Connexion
│   ├── register                      ← Création de compte
│   ├── forgot-password               ← Demande reset mot de passe
│   └── reset-password?token=:token   ← Réinitialisation (lien email)
│
├── admin/                            ← Zone Admin (owner / manager)
│   ├── (index)                       ← Dashboard workspace
│   ├── settings                      ← Paramètres workspace
│   ├── members                       ← Gestion membres workspace
│   ├── billing                       ← Abonnement & plan
│   └── projects/
│       ├── (index)                   ← Liste des projets
│       ├── new                       ← Créer un projet
│       └── :projectId/
│           ├── (index)               ← Vue générale projet
│           ├── zones                 ← Gestion des zones du projet
│           ├── members               ← Membres & rôles du projet
│           ├── documents             ← Centre de documents
│           ├── invoices/
│           │   ├── (index)           ← Liste des factures
│           │   ├── new               ← Créer une facture
│           │   └── :invoiceId        ← Détail / édition facture
│           ├── messaging             ← Messagerie zone (threads)
│           ├── log-global            ← Journal global messages (managers)
│           └── settings             ← Paramètres du projet
│
├── collab/                           ← Zone Collaborateurs (membres internes)
│   ├── (index)                       ← Dashboard collaborateur
│   └── projects/
│       └── :projectId/
│           ├── (index)               ← Vue projet collaborateur
│           ├── timesheets/
│           │   ├── (index)           ← Mes feuilles de temps
│           │   ├── new               ← Nouvelle feuille de temps
│           │   └── :timesheetId      ← Détail / saisie
│           ├── reports/
│           │   ├── (index)           ← Rapports d'avancement
│           │   ├── new               ← Créer un rapport (managers)
│           │   └── :reportId         ← Détail rapport
│           ├── documents             ← Documents du projet
│           └── messaging             ← Messagerie zone
│
└── client/                           ← Zone Client (clients externes)
    └── :projectId/
        ├── (index)                   ← Dashboard client (vue projet)
        ├── contract                  ← Contrat à signer / signé
        ├── invoices/
        │   ├── (index)               ← Liste des factures
        │   └── :invoiceId            ← Détail facture + bouton paiement
        ├── progress                  ← Rapports d'avancement publiés
        ├── files                     ← Fichiers partagés / upload
        ├── messaging                 ← Messagerie (thread dédié)
        └── profile                   ← Profil et préférences du compte
```

---

## Règles de navigation inter-zones

| De | Vers | Possible ? |
|---|---|---|
| Zone Admin | Zone Collaborateurs | Oui (même URL, vue différente par rôle) |
| Zone Admin | Zone Client | Non (interfaces séparées) |
| Zone Collaborateurs | Zone Admin | Oui si rôle manager |
| Zone Collaborateurs | Zone Client | Non |
| Zone Client | Toute autre zone | Non |

---

## Pages spécifiées

Toutes les routes listées ci-dessous ont une spec de page dédiée :

| Route | Fichier spec |
|---|---|
| `/admin/billing` | `pages/admin/billing.md` |
| `/admin/projects/new` | `pages/admin/project-new.md` |
| `/admin/projects/:id/zones` | `pages/admin/project-zones.md` |
| `/admin/projects/:id/members` | `pages/admin/members.md` |
| `/admin/projects/:id/settings` | `pages/admin/project-settings.md` |
| `/admin/projects/:id/log-global` | `pages/admin/log-global.md` |
| `/collab/projects/:id/reports/new` | `pages/collaborateurs/progress-reports.md` |
| `/auth/forgot-password` | `pages/auth/forgot-password.md` |
| `/auth/reset-password` | `pages/auth/reset-password.md` |
| Onboarding workspace | `pages/admin/onboarding.md` |
| Page 404 | `pages/404.md` |
| Page erreur générique | `pages/error.md` |

---

## Pages communes (partagées)

| Composant | Usage |
|---|---|
| `/auth/*` | Toutes zones (non authentifié) |
| Profil utilisateur | Dans toutes les zones (menu) |
| Notifications | Dans toutes les zones |
| Page 404 | Toutes zones |
