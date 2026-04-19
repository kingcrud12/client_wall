# Composant — ProgressBar

**Catégorie** : Primitive  
**Fichier cible** : `src/components/primitives/ProgressBar.tsx`

---

## Description

Barre de progression linéaire. Utilisée principalement pour afficher l'avancement global d'un projet (0-100%) dans les rapports d'avancement et les dashboards.

---

## Props

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `number` | — | Valeur 0-100 |
| `max` | `number` | `100` | Valeur maximale |
| `label` | `string` | — | Label accessible (aria-label) |
| `showValue` | `boolean` | `false` | Affiche la valeur en % à côté |
| `size` | `'sm' \| 'base' \| 'lg'` | `'base'` | Épaisseur de la barre |
| `color` | `'primary' \| 'success' \| 'warning' \| 'error'` | `'primary'` | Couleur de remplissage |
| `animated` | `boolean` | `false` | Animation de remplissage au montage |

---

## Tailles

| Taille | Height | Border-radius |
|---|---|---|
| `sm` | 4px | `--radius-full` |
| `base` | 8px | `--radius-full` |
| `lg` | 12px | `--radius-full` |

---

## Couleurs de remplissage

| Color | Token | Usage |
|---|---|---|
| `primary` | `--color-primary-600` | Progression projet standard |
| `success` | `--color-success-500` | Projet terminé ou > 80% |
| `warning` | `--color-warning-500` | Projet en retard |
| `error` | `--color-error-500` | Projet critique |

**Logique de couleur automatique selon valeur** (optionnel) :
- 0-30% → `primary`
- 31-79% → `primary`
- 80-99% → `success`
- 100% → `success`

---

## Structure HTML

```html
<!-- Barre simple -->
<div class="progress-bar progress-bar--base" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" aria-label="Avancement du projet">
  <div class="progress-bar__fill progress-bar__fill--primary" style="width: 65%;"></div>
</div>

<!-- Avec label et valeur -->
<div class="progress-wrapper">
  <div class="progress-wrapper__header">
    <span class="progress-wrapper__label">Avancement global</span>
    <span class="progress-wrapper__value">65%</span>
  </div>
  <div class="progress-bar progress-bar--base" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" aria-label="Avancement global : 65%">
    <div class="progress-bar__fill progress-bar__fill--primary" style="width: 65%;"></div>
  </div>
</div>
```

---

## Animation

Si `animated=true`, la largeur passe de 0% à la valeur réelle au montage du composant :

```css
.progress-bar__fill {
  transition: width 600ms ease-in-out;
}
```

---

## Responsive

La barre prend toujours `width: 100%` de son conteneur.

---

## Accessibilité

- `role="progressbar"` sur le conteneur.
- `aria-valuenow`, `aria-valuemin`, `aria-valuemax` requis.
- `aria-label` ou `aria-labelledby` requis pour décrire ce que mesure la barre.
