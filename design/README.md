# Design System — Client Wall

Source de vérité UI/UX du produit. Ce dossier documente exhaustivement l'interface sans avoir besoin de lire le code.

---

## Qu'est-ce que Client Wall ?

Client Wall est une plateforme SaaS B2B qui permet aux freelances, agences et associations de créer des espaces de travail collaboratifs pour gérer leurs clients et collaborateurs. Chaque "workspace" regroupe des projets, eux-mêmes divisés en **zones** à accès contrôlé.

---

## Stack cible

| Couche | Technologie |
|---|---|
| Framework frontend | React 18+ |
| Build tool | Vite |
| Routing | React Router v6 |
| Style | Tailwind CSS v4 + CSS custom properties |
| Composants | Headless UI / Radix UI |
| Icônes | Lucide React |
| Typo | Inter (Google Fonts) |
| Paiement | Stripe (webhooks + payment links) |
| Backend | Spring Boot (Java) |
| Base de données | PostgreSQL |
| Auth | JWT (Bearer tokens) |
| Stockage | S3-compatible |

---

## Architecture des zones

Le produit comporte **3 zones distinctes** avec des interfaces séparées :

```
Client Wall
├── Zone Auth          → /auth/*           (login, register, reset)
├── Zone Admin         → /admin/*          (owner, manager)
├── Zone Collaborateurs → /collab/*        (membres internes)
└── Zone Client        → /client/*         (clients externes)
```

Chaque zone a sa propre palette de navigation, ses propres règles d'accès et son propre périmètre fonctionnel.

---

## Structure du dossier design/

```
design/
├── README.md                    ← Ce fichier
├── arborescence/
│   ├── sitemap.md               ← Vue globale de toutes les routes
│   ├── zone-admin.md            ← Sitemap zone admin
│   ├── zone-collaborateurs.md   ← Sitemap zone collaborateurs
│   └── zone-client.md           ← Sitemap zone client
├── components/
│   ├── primitives/              ← Atoms : button, input, badge...
│   ├── composite/               ← Molecules : card, navbar, thread...
│   └── page-sections/           ← Organisms : hero, grids, tables...
├── pages/
│   ├── auth/                    ← Login, register, reset
│   ├── admin/                   ← Dashboard admin, projets, factures...
│   ├── collaborateurs/          ← Timesheets, rapports, documents...
│   └── client/                  ← Contrats, factures, progression...
├── tokens/
│   ├── colors.md                ← Palette complète
│   ├── typography.md            ← Échelle typographique
│   ├── spacing.md               ← Système d'espacement
│   ├── shadows.md               ← Ombres et élévations
│   ├── borders.md               ← Radius et bordures
│   ├── breakpoints.md           ← Points de rupture responsive
│   └── index.css                ← Variables CSS globales
├── themes/
│   ├── theme-spec.md            ← Spécification light/dark
│   ├── light.css                ← Thème clair
│   └── dark.css                 ← Thème sombre
└── personality/
    ├── brand.md                 ← Identité produit
    ├── tone.md                  ← Ton et voix
    └── ux-writing.md            ← Règles de rédaction UI
```

---

## Règles d'utilisation pour les développeurs

### 1. Tokens avant tout

Ne jamais écrire de valeurs brutes dans les composants. Toujours utiliser les tokens :

```css
/* ❌ Mauvais */
color: #4f46e5;
padding: 16px;

/* ✓ Bon */
color: var(--color-primary-600);
padding: var(--space-4);
```

### 2. Composants en couches

Respecter la hiérarchie atomique :
- **Primitives** → autonomes, jamais d'opinion métier
- **Composite** → assemblage de primitives avec logique spécifique
- **Page sections** → assemblage de composites, spécifiques à une zone

### 3. Responsive mobile-first

Concevoir d'abord pour mobile, ajouter des breakpoints pour les écrans plus larges.

### 4. Accessibilité

- Tous les boutons/liens ont un `aria-label` lisible
- Contraste minimum WCAG AA (4.5:1 pour texte normal)
- Focus visible sur tous les éléments interactifs
- Formulaires avec `<label>` associé

### 5. États à toujours couvrir

Pour chaque composant/page :
- **Default** — état normal
- **Hover / Focus** — interaction
- **Loading** — requête en cours (skeleton ou spinner)
- **Empty** — aucune donnée
- **Error** — erreur ou validation échouée
- **Disabled** — action non disponible

### 6. Permissions

Le frontend doit toujours refléter les permissions backend. Ne jamais afficher une action si l'utilisateur n'y a pas accès. Les permissions sont calculées côté serveur (block > allow > deny) et exposées via l'API.

---

## Glossaire produit

| Terme | Définition |
|---|---|
| Workspace | Organisation (freelance, agence...) — niveau racine |
| Project | Mission ou activité — contenu dans un workspace |
| Zone | Espace d'accès contrôlé dans un projet (client ou collaborateur) |
| Zone Admin | Vue des owner/managers du workspace |
| Zone Collaborateurs | Vue des membres internes (équipe) |
| Zone Client | Vue des clients externes (lecture + actions limitées) |
| Zone Member | Utilisateur appartenant à une zone |
| Role | Ensemble de permissions assigné à un user dans un projet |
| Permission | Règle action + ressource + valeur (allow/deny/block) |
| Document | Tout fichier ou document géré dans un projet |
| Timesheet | Feuille de temps d'un collaborateur |
| Progress Report | Rapport d'avancement publié par les managers |
| Thread | Fil de messages dans une zone |
