# Composant — Sidebar

**Catégorie** : Composite  
**Fichier cible** : `src/components/composite/Sidebar.tsx`

---

## Description

Navigation latérale principale des zones Admin et Collaborateurs. Organisée en sections hiérarchiques. Collabasable en mode icônes. Sur mobile : drawer avec overlay.

---

## Structure

### Zone Admin

```
┌────────────────────────────────┐
│ [Logo] Client Wall             │
│ ───────────────────────────── │
│ WORKSPACE                      │
│  Dashboard                     │
│  Projets                       │
│  Membres                       │
│  Paramètres                    │
│  Facturation*                  │
│ ───────────────────────────── │
│ [Projet sélectionné : Alpha]   │
│ PROJET                         │
│  Vue générale                  │
│  Zones                         │
│  Membres                       │
│  Documents                     │
│  Factures                      │
│  Messagerie                    │
│  Journal global*               │
│  Paramètres                    │
│ ───────────────────────────── │
│ [Espace libre]                 │
│ ───────────────────────────── │
│ [Avatar] Jean Dupont           │
│ jean@agency.com                │
└────────────────────────────────┘
```
(*) = visible uniquement owner/manager

### Zone Collaborateurs

```
┌────────────────────────────────┐
│ [Logo] Client Wall             │
│ ───────────────────────────── │
│ MON ESPACE                     │
│  Mon tableau de bord           │
│ ───────────────────────────── │
│ [Projet sélectionné : Alpha]   │
│ PROJET                         │
│  Vue projet                    │
│  Mes timesheets                │
│  Rapports d'avancement         │
│  Documents                     │
│  Messagerie                    │
│ ───────────────────────────── │
│ [Avatar] Marie Martin          │
│ marie@agency.com               │
└────────────────────────────────┘
```

---

## Props

| Prop | Type | Description |
|---|---|---|
| `zone` | `'admin' \| 'collab'` | Zone de l'interface |
| `collapsed` | `boolean` | Mode icônes uniquement |
| `currentPath` | `string` | Path actuel (pour état actif) |
| `workspace` | `Workspace` | Données du workspace |
| `selectedProject` | `Project \| null` | Projet actuellement sélectionné |
| `user` | `User` | Utilisateur connecté |
| `onCollapse` | `() => void` | Toggle collapse |

---

## Modes d'affichage

### Expanded (256px)
Mode par défaut desktop. Affiche icône + label pour chaque item.

### Collapsed / Icons-only (64px)
Items réduits à leur icône. Tooltip au survol avec le label complet.

### Drawer (mobile)
Position `fixed`, fond overlay semi-transparent. Animation slide-in depuis la gauche. Largeur 256px.

---

## Item de navigation

### États d'un NavItem

| État | Background | Text | Indicator |
|---|---|---|---|
| Default | Transparent | `--sidebar-text` | Aucun |
| Hover | `--sidebar-item-hover` | `--sidebar-text` | Aucun |
| Active | `--sidebar-item-active` | `--sidebar-item-active-text` | Barre gauche 4px primary |
| Focus | Focus ring `--focus-ring` | — | — |

### Structure HTML d'un item

```html
<a
  href="/admin/projects"
  class="nav-item nav-item--active"
  aria-current="page"
>
  <svg class="nav-item__icon" aria-hidden="true"><!-- icône --></svg>
  <span class="nav-item__label">Projets</span>
</a>
```

---

## Icônes par section (Lucide React)

| Section | Icône |
|---|---|
| Dashboard | `LayoutDashboard` |
| Projets | `FolderKanban` |
| Membres workspace | `Users` |
| Paramètres workspace | `Settings` |
| Facturation | `CreditCard` |
| Vue projet | `FileText` |
| Zones | `Layers` |
| Membres projet | `UserCheck` |
| Documents | `Files` |
| Factures | `Receipt` |
| Messagerie | `MessageSquare` |
| Journal global | `ScrollText` |
| Timesheets | `Clock` |
| Rapports | `BarChart3` |

---

## Bouton collapse

Positionné en bas de la sidebar, avant le profil utilisateur.

```html
<button
  class="sidebar__collapse-btn"
  type="button"
  aria-expanded="true"
  aria-label="Réduire la navigation"
>
  <!-- icône PanelLeftClose ou PanelLeftOpen selon état -->
</button>
```

---

## Responsive

| Breakpoint | Mode |
|---|---|
| Mobile (`< 768px`) | Drawer (hidden par défaut, ouvert via hamburger) |
| Tablet (`768px – 1023px`) | Icons-only (64px, toujours visible) |
| Desktop (`≥ 1024px`) | Expanded (256px) |

---

## Accessibilité

- `role="navigation"` + `aria-label="Navigation admin"` sur le `<nav>`
- Items actifs : `aria-current="page"`
- Mode collapsed : `aria-expanded="false"` sur le bouton collapse
- En mode drawer mobile : `aria-modal="true"` + gestion du focus trap
- Sections de groupe : `<li role="none">` avec titres `aria-hidden`
