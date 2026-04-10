# Tokens — Espacement

Système d'espacement basé sur une unité de base de **8px**. Toutes les valeurs sont des multiples ou sous-multiples de cette unité.

---

## Échelle d'espacement

| Token | px | rem | Tailwind équivalent | Usage typique |
|---|---|---|---|---|
| `--space-0` | 0px | 0rem | `p-0` | Reset |
| `--space-px` | 1px | 0.0625rem | `p-px` | Borders, séparateurs fins |
| `--space-0.5` | 2px | 0.125rem | `p-0.5` | Gap très petit |
| `--space-1` | 4px | 0.25rem | `p-1` | Gap icon + texte |
| `--space-1.5` | 6px | 0.375rem | `p-1.5` | Padding badge |
| `--space-2` | 8px | 0.5rem | `p-2` | Padding compact, gap list items |
| `--space-3` | 12px | 0.75rem | `p-3` | Padding bouton sm, gap nav |
| `--space-4` | 16px | 1rem | `p-4` | Padding bouton base, gap cards |
| `--space-5` | 20px | 1.25rem | `p-5` | Padding form fields |
| `--space-6` | 24px | 1.5rem | `p-6` | Padding card, section gap |
| `--space-8` | 32px | 2rem | `p-8` | Padding sections page |
| `--space-10` | 40px | 2.5rem | `p-10` | Gap entre sections |
| `--space-12` | 48px | 3rem | `p-12` | Padding page large |
| `--space-16` | 64px | 4rem | `p-16` | Gap hero sections |
| `--space-20` | 80px | 5rem | `p-20` | Sections espacées |
| `--space-24` | 96px | 6rem | `p-24` | Grandes sections marketing |

---

## Utilisation par composant

### Boutons

| Taille | Padding vertical | Padding horizontal | Gap icon |
|---|---|---|---|
| `sm` | `--space-1.5` (6px) | `--space-3` (12px) | `--space-1.5` |
| `base` | `--space-2` (8px) | `--space-4` (16px) | `--space-2` |
| `lg` | `--space-3` (12px) | `--space-6` (24px) | `--space-2` |

### Inputs / Formulaires

| Élément | Padding vertical | Padding horizontal |
|---|---|---|
| Input | `--space-2` (8px) | `--space-3` (12px) |
| Textarea | `--space-3` (12px) | `--space-3` (12px) |
| Select | `--space-2` (8px) | `--space-3` (12px) |
| Label → Input gap | `--space-1.5` (6px) | — |
| Field → Field gap | `--space-5` (20px) | — |
| Section → Section gap (formulaire) | `--space-8` (32px) | — |

### Cards

| Propriété | Valeur |
|---|---|
| Padding | `--space-6` (24px) |
| Gap entre cards | `--space-4` (16px) |
| Gap éléments internes | `--space-3` (12px) |

### Navigation sidebar

| Propriété | Valeur |
|---|---|
| Padding item nav | `--space-2` (8px) `--space-3` (12px) |
| Gap items nav | `--space-1` (4px) |
| Padding section sidebar | `--space-4` (16px) |
| Gap sections sidebar | `--space-6` (24px) |

### Layout page

| Propriété | Valeur |
|---|---|
| Padding contenu page | `--space-8` (32px) desktop, `--space-4` (16px) mobile |
| Gap sections | `--space-8` (32px) |
| Max-width contenu | 1280px |
| Largeur sidebar | 256px (fixe) |

### Tableaux

| Propriété | Valeur |
|---|---|
| Padding cellule header | `--space-3` (12px) `--space-4` (16px) |
| Padding cellule data | `--space-4` (16px) |
| Gap entre colonnes | `--space-4` (16px) |

---

## Systèmes de layout

### Grille principale (dashboard)

```
Grid 12 colonnes
Gap : --space-4 (16px) desktop, --space-3 (12px) tablet, --space-2 (8px) mobile
```

### Grille cartes (listes)

```
Grid auto-fill
Min item : 280px
Gap : --space-4 (16px)
```
