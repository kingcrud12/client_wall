# Composant — Badge

**Catégorie** : Primitive  
**Fichier cible** : `src/components/primitives/Badge.tsx`

---

## Description

Étiquette visuelle compacte indiquant un statut, une catégorie ou un compteur. Non interactif (pas de hover, pas de focus). Utilisé extensivement pour les statuts métier (factures, timesheets, rapports, contrats).

---

## Props

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `variant` | `'neutral' \| 'info' \| 'success' \| 'warning' \| 'error' \| 'primary'` | `'neutral'` | Couleur du badge |
| `size` | `'sm' \| 'base'` | `'base'` | Taille |
| `dot` | `boolean` | `false` | Affiche un point de couleur avant le texte |
| `children` | `ReactNode` | — | Texte ou contenu du badge |

---

## Variantes visuelles

| Variant | Background | Text | Contexte |
|---|---|---|---|
| `neutral` | `--badge-neutral-bg` | `--badge-neutral-text` | Draft, brouillon, in_progress |
| `info` | `--badge-info-bg` | `--badge-info-text` | Issued, submitted, pending |
| `success` | `--badge-success-bg` | `--badge-success-text` | Paid, validated, signed, published |
| `warning` | `--badge-warning-bg` | `--badge-warning-text` | Overdue, partially_paid |
| `error` | `--badge-error-bg` | `--badge-error-text` | Rejected, blocked |
| `primary` | `--badge-primary-bg` | `--badge-primary-text` | Refund, highlighted |

---

## Mapping statuts métier → variante

| Statut | Variante | Label FR |
|---|---|---|
| `draft` | `neutral` | Brouillon |
| `issued` | `info` | Émise |
| `paid` | `success` | Payée |
| `overdue` | `warning` | En retard |
| `partially_paid` | `warning` | Part. payée |
| `refund` | `primary` | Remboursée |
| `in_progress` | `neutral` | En cours |
| `submitted` | `info` | Soumise |
| `validated` | `success` | Validée |
| `pending` | `warning` | En attente |
| `signed` | `success` | Signé |
| `rejected` | `error` | Refusé |
| `published` | `success` | Publié |
| `archived` | `neutral` | Archivé |
| `todo` | `neutral` | À faire |
| `done` | `success` | Terminé |

---

## Tailles

| Taille | Font-size | Padding | Border-radius |
|---|---|---|---|
| `sm` | `--text-xs` (12px) | 2px 6px | `--radius-full` |
| `base` | `--text-xs` (12px) | 3px 8px | `--radius-full` |

---

## Structure HTML

```html
<!-- Badge simple -->
<span class="badge badge--success">
  Payée
</span>

<!-- Badge avec dot -->
<span class="badge badge--info badge--dot">
  <span class="badge__dot" aria-hidden="true"></span>
  Émise
</span>
```

---

## Responsive

Le badge ne change pas de taille sur mobile. S'il est dans un tableau, la colonne s'adapte au contenu minimum du badge.

---

## Accessibilité

- Inclure le texte lisible (pas uniquement la couleur pour indiquer le statut).
- Si la couleur porte une signification : `<span class="sr-only">Statut :</span>` avant le texte du badge dans les contextes tabulaires.
- Les badges ne sont pas des boutons — ne pas ajouter `role="button"`.
