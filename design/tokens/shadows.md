# Tokens — Ombres & Élévations

Système d'élévation visuelle pour créer la hiérarchie entre les éléments.

---

## Échelle d'ombres

| Token | Valeur CSS | Usage |
|---|---|---|
| `--shadow-none` | `none` | Éléments plats, tables |
| `--shadow-xs` | `0 1px 2px rgba(0,0,0,0.05)` | Borders alternatives, inputs focus subtil |
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)` | Cards, boutons |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)` | Dropdowns, menus |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)` | Modales, popovers |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)` | Drawers, sidebars flottantes |
| `--shadow-2xl` | `0 25px 50px rgba(0,0,0,0.25)` | Dialogs plein écran |
| `--shadow-inner` | `inset 0 2px 4px rgba(0,0,0,0.06)` | Inputs actifs, zones de dépôt |

---

## Usage par composant

| Composant | Ombre |
|---|---|
| Card de base | `--shadow-sm` |
| Card hover | `--shadow-md` |
| Input focus | `--shadow-xs` + ring primary |
| Dropdown / Select | `--shadow-md` |
| Tooltip | `--shadow-md` |
| Modal / Dialog | `--shadow-xl` |
| Bottom sheet mobile | `--shadow-2xl` |
| Sidebar (drawer mode) | `--shadow-xl` |
| Topbar fixe | `--shadow-sm` |
| Toast notification | `--shadow-lg` |
| Bouton (normal) | `--shadow-sm` |
| Bouton (hover) | `--shadow-md` |
| File upload zone (dragover) | `--shadow-inner` |

---

## Règles d'élévation

**Principe** : Plus un élément est au-dessus des autres dans l'interface, plus son ombre est prononcée.

```
Niveau 0 : fond de page (--shadow-none)
Niveau 1 : cards, tableaux (--shadow-sm)
Niveau 2 : dropdowns, tooltips (--shadow-md)
Niveau 3 : modales, drawers (--shadow-lg à --shadow-xl)
Niveau 4 : dialogs critiques (--shadow-2xl)
```

**Mode sombre** : Réduire l'opacité des ombres à 60% ou utiliser des shadows plus intenses avec une teinte de couleur.
