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
        └── messaging                 ← Messagerie (thread dédié)
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

## Pages manquantes / non implémentées

Ces routes sont nécessaires mais non encore spécifiées en détail :

| Route | Statut | Priorité |
|---|---|---|
| `/admin/billing` | Manquante | Haute |
| `/admin/projects/new` | Manquante | Haute |
| `/admin/projects/:id/zones` | Manquante | Haute |
| `/admin/projects/:id/members` | Manquante | Haute |
| `/admin/projects/:id/settings` | Manquante | Moyenne |
| `/admin/projects/:id/log-global` | Manquante | Moyenne |
| `/collab/projects/:id/reports/new` | Manquante | Haute |
| `/auth/forgot-password` | Manquante | Haute |
| `/auth/reset-password` | Manquante | Haute |
| Onboarding workspace | Manquante | Haute |
| Page 404 | Manquante | Haute |
| Page erreur générique | Manquante | Haute |

---

## Pages communes (partagées)

| Composant | Usage |
|---|---|
| `/auth/*` | Toutes zones (non authentifié) |
| Profil utilisateur | Dans toutes les zones (menu) |
| Notifications | Dans toutes les zones |
| Page 404 | Toutes zones |
