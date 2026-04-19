# Tokens — Bordures & Rayons

Système de bordures et de coins arrondis du design system.

---

## Border radius

| Token | Valeur | Usage |
|---|---|---|
| `--radius-none` | `0px` | Tableaux, éléments full-width |
| `--radius-xs` | `2px` | Badges compacts, tags |
| `--radius-sm` | `4px` | Inputs, boutons compact |
| `--radius-md` | `6px` | Boutons standard, cards compactes |
| `--radius-lg` | `8px` | Cards, modales, dropdowns |
| `--radius-xl` | `12px` | Cards feature, panels larges |
| `--radius-2xl` | `16px` | Bottom sheets, sheets mobiles |
| `--radius-full` | `9999px` | Badges pill, avatars, toggles |

### Usage par composant

| Composant | Radius |
|---|---|
| Button sm | `--radius-sm` |
| Button base / lg | `--radius-md` |
| Button pill | `--radius-full` |
| Input / Select | `--radius-md` |
| Textarea | `--radius-md` |
| Badge | `--radius-full` |
| Badge compact | `--radius-xs` |
| Avatar | `--radius-full` |
| Card | `--radius-lg` |
| Modal | `--radius-xl` |
| Toast | `--radius-lg` |
| Tooltip | `--radius-sm` |
| Dropdown | `--radius-lg` |
| Progress bar | `--radius-full` |
| Sidebar | `--radius-none` (fixe) |

---

## Border width

| Token | Valeur | Usage |
|---|---|---|
| `--border-0` | `0px` | Pas de bordure |
| `--border-1` | `1px` | Bordure standard |
| `--border-2` | `2px` | Focus ring, selected state |
| `--border-4` | `4px` | Accent bar, left-border highlight |

### Usage par composant

| Composant | Border width | Border color |
|---|---|---|
| Input normal | `--border-1` | `--color-neutral-300` |
| Input hover | `--border-1` | `--color-neutral-400` |
| Input focus | `--border-2` | `--color-primary-500` |
| Input error | `--border-1` | `--color-error-500` |
| Card | `--border-1` | `--color-neutral-200` |
| Card selected | `--border-2` | `--color-primary-500` |
| Divider | `--border-1` | `--color-neutral-200` |
| Sidebar nav active | `--border-4` left | `--color-primary-600` |

---

## Focus ring

Le focus ring est utilisé sur tous les éléments interactifs pour l'accessibilité clavier.

```css
/* Focus ring standard */
outline: 2px solid var(--color-primary-500);
outline-offset: 2px;
```

Jamais supprimer le focus visible (`outline: none`) sans alternative.
