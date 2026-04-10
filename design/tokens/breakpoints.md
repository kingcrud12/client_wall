# Tokens — Breakpoints

Points de rupture responsive du design system Client Wall. Approche **mobile-first** : les styles de base ciblent le mobile, les media queries ajoutent les adaptations pour les écrans plus larges.

---

## Échelle des breakpoints

| Token | px | Tailwind | Appareils ciblés |
|---|---|---|---|
| `--screen-sm` | 640px | `sm:` | Grands téléphones, petites tablettes portrait |
| `--screen-md` | 768px | `md:` | Tablettes portrait, petits laptops |
| `--screen-lg` | 1024px | `lg:` | Laptops, tablettes paysage |
| `--screen-xl` | 1280px | `xl:` | Desktops standards |
| `--screen-2xl` | 1536px | `2xl:` | Grands écrans |

---

## Stratégie responsive par zone

### Zone Admin

L'interface admin est **desktop-first dans les usages**, mais doit rester utilisable sur tablette.

| Breakpoint | Comportement |
|---|---|
| Mobile (`< 768px`) | Sidebar masquée, accessible via bouton hamburger. Navigation compacte. |
| Tablet (`768px – 1023px`) | Sidebar collapsée en icônes uniquement. Contenu pleine largeur. |
| Desktop (`≥ 1024px`) | Sidebar déployée (256px). Layout 2 colonnes. |
| Large (`≥ 1280px`) | Layout optimal, grilles multi-colonnes. |

### Zone Collaborateurs

Même logique que la zone admin, usage principalement desktop/tablette.

### Zone Client

L'interface client est **optimisée mobile et tablette** — les clients peuvent accéder depuis leur téléphone.

| Breakpoint | Comportement |
|---|---|
| Mobile (`< 640px`) | Navigation en bas ou hamburger. Cards en colonne. |
| Tablet (`640px – 1023px`) | Navigation en haut. Layout 1-2 colonnes. |
| Desktop (`≥ 1024px`) | Layout 2-3 colonnes. Navigation fixe en haut. |

---

## Comportements spécifiques par composant

### Sidebar

```
Mobile  : hidden (drawer sur overlay)
Tablet  : icons only (64px)
Desktop : expanded (256px)
```

### Navigation topbar (zone client)

```
Mobile  : menu hamburger + drawer
Tablet  : tabs horizontaux
Desktop : tabs horizontaux avec labels complets
```

### Grilles de cards

```
Mobile  : 1 colonne
Tablet  : 2 colonnes
Desktop : 3 ou 4 colonnes
```

### Tableaux

```
Mobile  : scroll horizontal, colonnes prioritaires visibles
Tablet  : toutes colonnes non-critiques visibles
Desktop : toutes colonnes avec actions
```

### Formulaires

```
Mobile  : 1 colonne (champs full-width)
Tablet  : 2 colonnes (champs adjacents)
Desktop : layout flexible (2-3 colonnes pour formulaires complexes)
```

### Modales / Dialogs

```
Mobile  : bottom sheet (pleine largeur, slide du bas)
Tablet  : dialog centré (max 480px)
Desktop : dialog centré (max 560px)
```

---

## Conteneurs max-width

| Contexte | Max-width | Usage |
|---|---|---|
| Contenu page (défaut) | `1280px` | Pages standard |
| Formulaire étroit | `640px` | Formulaires simples |
| Formulaire moyen | `768px` | Formulaires complexes |
| Pleine largeur | `100%` | Tableaux, listes |
| Topbar / Header | `100%` | Navigation fixe |
