# Tokens — Typographie

Système typographique complet du design system Client Wall.

---

## Police principale

**Inter** — Google Fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

**Choix justifié** : Inter est optimisée pour les interfaces digitales, excellente lisibilité aux petites tailles, excellente lisibilité des chiffres (alignés, monospatiaux optionnellement via font-variant-numeric).

**Fallback** : `ui-sans-serif, system-ui, -apple-system, sans-serif`

---

## Échelle typographique

### Tailles (font-size)

| Token | px | rem | Usage |
|---|---|---|---|
| `--text-xs` | 12px | 0.75rem | Labels, metadata, captions |
| `--text-sm` | 14px | 0.875rem | Corps secondaire, labels formulaire |
| `--text-base` | 16px | 1rem | Corps principal, paragraphes |
| `--text-lg` | 18px | 1.125rem | Sous-titres, leads |
| `--text-xl` | 20px | 1.25rem | Titres de section (h4) |
| `--text-2xl` | 24px | 1.5rem | Titres de page (h3) |
| `--text-3xl` | 30px | 1.875rem | Titres principaux (h2) |
| `--text-4xl` | 36px | 2.25rem | Hero titre (h1) |
| `--text-5xl` | 48px | 3rem | Grandes métriques (dashboard KPI) |

### Graisse (font-weight)

| Token | Valeur | Usage |
|---|---|---|
| `--font-normal` | 400 | Corps de texte |
| `--font-medium` | 500 | Labels, navigation |
| `--font-semibold` | 600 | Boutons, sous-titres, états actifs |
| `--font-bold` | 700 | Titres, valeurs importantes |

### Hauteur de ligne (line-height)

| Token | Valeur | Usage |
|---|---|---|
| `--leading-none` | 1 | Titres courts, une ligne |
| `--leading-tight` | 1.25 | Titres multi-lignes |
| `--leading-snug` | 1.375 | Sous-titres |
| `--leading-normal` | 1.5 | Corps de texte standard |
| `--leading-relaxed` | 1.625 | Textes longs, descriptions |

### Espacement lettres (letter-spacing)

| Token | Valeur | Usage |
|---|---|---|
| `--tracking-tight` | -0.025em | Grands titres |
| `--tracking-normal` | 0em | Corps de texte |
| `--tracking-wide` | 0.025em | Labels uppercase, badges |
| `--tracking-widest` | 0.1em | Étiquettes métadonnées |

---

## Styles typographiques prédéfinis

### Headings

| Style | font-size | font-weight | line-height | Usage |
|---|---|---|---|---|
| `heading-1` | `--text-4xl` | bold | tight | Titre principal de page |
| `heading-2` | `--text-3xl` | bold | tight | Titre de section majeure |
| `heading-3` | `--text-2xl` | semibold | snug | Titre de card / modal |
| `heading-4` | `--text-xl` | semibold | snug | Titre de sous-section |
| `heading-5` | `--text-lg` | medium | normal | Titre de groupe |
| `heading-6` | `--text-base` | semibold | normal | Titre label groupe |

### Corps de texte

| Style | font-size | font-weight | line-height | Usage |
|---|---|---|---|---|
| `body-lg` | `--text-lg` | normal | relaxed | Textes introductifs |
| `body-base` | `--text-base` | normal | normal | Corps standard |
| `body-sm` | `--text-sm` | normal | normal | Texte secondaire |
| `body-xs` | `--text-xs` | normal | normal | Metadata, captions |

### Éléments UI

| Style | font-size | font-weight | Cas d'usage |
|---|---|---|---|
| `label` | `--text-sm` | medium | Labels formulaire |
| `button-sm` | `--text-sm` | semibold | Petit bouton |
| `button-base` | `--text-base` | semibold | Bouton standard |
| `nav-item` | `--text-sm` | medium | Items navigation |
| `badge` | `--text-xs` | medium | Badges statut |
| `table-header` | `--text-xs` | semibold + uppercase | En-têtes tableau |
| `kpi-value` | `--text-5xl` | bold | Grandes métriques dashboard |
| `kpi-label` | `--text-sm` | medium | Label sous métrique |

---

## Monospace (optionnel)

Pour les montants financiers et les identifiants, utiliser `font-variant-numeric: tabular-nums` sur Inter pour aligner les chiffres :

```css
.amount {
  font-variant-numeric: tabular-nums;
  font-weight: var(--font-semibold);
}
```

---

## Responsive typographique

Sur mobile, réduire les tailles des headings :

| Style | Desktop | Mobile |
|---|---|---|
| `heading-1` | `--text-4xl` | `--text-3xl` |
| `heading-2` | `--text-3xl` | `--text-2xl` |
| `heading-3` | `--text-2xl` | `--text-xl` |
| `body-lg` | `--text-lg` | `--text-base` |
