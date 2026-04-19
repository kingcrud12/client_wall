# Composant — Navbar / Topbar

**Catégorie** : Composite  
**Fichier cible** : `src/components/composite/Navbar.tsx`

---

## Description

Barre de navigation principale horizontale, fixée en haut de l'interface. Commune aux zones Admin et Collaborateurs. La Zone Client a une topbar simplifiée dédiée.

---

## Variantes

| Variante | Zone | Couleur de fond |
|---|---|---|
| `admin` | Zone Admin | `--topbar-bg` (#FFFFFF) avec bordure indigo en base |
| `collab` | Zone Collaborateurs | `--topbar-bg` (#FFFFFF) avec accentuation sky |
| `client` | Zone Client | `--topbar-bg` avec accentuation emerald |

---

## Structure (Zone Admin / Collaborateurs)

```
[Hamburger?] [Logo + Workspace name]    [Search]   [Notifs] [User menu]
```

### Éléments de gauche

1. **Bouton hamburger** (mobile uniquement) — ouvre/ferme la sidebar
2. **Logo Client Wall** — 28x28px, SVG
3. **Nom du workspace** — `--text-sm`, `--font-semibold`, truncate si trop long

### Éléments centraux (desktop)

4. **Barre de recherche globale** — recherche projets, documents, membres (optionnel V2)

### Éléments de droite

5. **Bouton notifications** — cloche + badge compteur non lu
6. **Menu utilisateur** — Avatar + nom + dropdown

---

## Menu utilisateur (dropdown)

Déclenché au clic sur l'avatar dans la topbar.

```
[Avatar] Nom de l'utilisateur
         email@company.com
─────────────────────────────
Profil
Préférences
Changer de thème
─────────────────────────────
Se déconnecter
```

---

## Structure (Zone Client — Topbar)

```
[Logo] Nom du projet    [Contrat] [Factures] [Avancement] [Fichiers] [Messages]    [User menu]
```

Navigation intégrée directement dans la topbar pour la zone client (pas de sidebar).

---

## Props

| Prop | Type | Description |
|---|---|---|
| `variant` | `'admin' \| 'collab' \| 'client'` | Zone de l'interface |
| `workspaceName` | `string` | Nom du workspace |
| `projectName` | `string` | Nom du projet (zone client uniquement) |
| `user` | `User` | Données de l'utilisateur connecté |
| `notificationCount` | `number` | Nombre de notifications non lues |
| `onMenuToggle` | `() => void` | Ouvre/ferme la sidebar (mobile) |

---

## États

| État | Comportement |
|---|---|
| Desktop | Sidebar visible, topbar sans hamburger |
| Mobile | Hamburger visible, sidebar cachée par défaut |
| Navigation active | L'onglet/lien actif est mis en évidence |
| Notification 0 | Badge non affiché |
| Notification > 9 | Badge affiche "9+" |

---

## Responsive

| Breakpoint | Comportement |
|---|---|
| Mobile (`< 768px`) | Hamburger visible, barre de recherche masquée, workspace name raccourci |
| Tablet (`768px+`) | Hamburger visible (sidebar icons-only), recherche visible |
| Desktop (`1024px+`) | Pas d'hamburger, sidebar toujours visible |

---

## Accessibilité

- `role="banner"` sur `<header>`
- `aria-label="Navigation principale"` sur la `<nav>`
- Bouton hamburger : `aria-expanded` + `aria-controls="sidebar"`
- Le nombre de notifications : `aria-label="3 notifications non lues"`
- Dropdown menu : implémentation `Menu` Headless UI avec gestion focus/escape
