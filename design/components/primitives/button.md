# Composant — Button

**Catégorie** : Primitive  
**Fichier cible** : `src/components/primitives/Button.tsx`

---

## Description

Élément d'action principal de l'interface. Supporte plusieurs variantes visuelles, tailles et états. Toujours utiliser `<button>` pour les actions dans la page et `<a>` (ou `Link`) pour la navigation.

---

## Props

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Style visuel du bouton |
| `size` | `'sm' \| 'base' \| 'lg'` | `'base'` | Taille du bouton |
| `loading` | `boolean` | `false` | État chargement (spinner + désactivé) |
| `disabled` | `boolean` | `false` | État désactivé |
| `icon` | `ReactNode` | `undefined` | Icône à gauche du label |
| `iconRight` | `ReactNode` | `undefined` | Icône à droite du label |
| `fullWidth` | `boolean` | `false` | Prend toute la largeur disponible |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Attribut HTML type |
| `onClick` | `() => void` | — | Handler clic |
| `children` | `ReactNode` | — | Contenu du bouton |
| `aria-label` | `string` | — | Requis si bouton icône seul |

---

## Variantes

### `primary`
Fond plein indigo. Actions principales (submit, CTA, action majeure).

```
Background : --btn-primary-bg (#4F46E5)
Hover      : --btn-primary-bg-hover (#4338CA)
Text       : --btn-primary-text (#FFFFFF)
```

### `secondary`
Fond blanc avec bordure. Actions secondaires, alternatives à l'action principale.

```
Background : --btn-secondary-bg (#FFFFFF)
Border     : 1px solid --btn-secondary-border (#E2E8F0)
Text       : --btn-secondary-text (#334155)
```

### `ghost`
Transparent, sans bordure. Actions tertiaires, annulation, navigation subtile.

```
Background : --btn-ghost-bg (transparent)
Hover      : --btn-ghost-bg-hover (#F1F5F9)
Text       : --btn-ghost-text (#475569)
```

### `danger`
Fond rouge. Actions destructives (supprimer, révoquer, annuler une transaction).

```
Background : --btn-danger-bg (#E11D48)
Hover      : --btn-danger-bg-hover (#BE123C)
Text       : --btn-danger-text (#FFFFFF)
```

---

## Tailles

| Taille | Font-size | Padding vertical | Padding horizontal | Height |
|---|---|---|---|---|
| `sm` | `--text-sm` (14px) | 6px | 12px | 32px |
| `base` | `--text-base` (16px) | 8px | 16px | 40px |
| `lg` | `--text-lg` (18px) | 12px | 24px | 48px |

---

## États

| État | Comportement visuel |
|---|---|
| Default | Selon variante |
| Hover | Fond légèrement assombri (voir tokens) |
| Focus | Focus ring : `--focus-ring` autour du bouton |
| Active (pressed) | Fond encore plus foncé |
| Loading | Spinner à la place de l'icône gauche, `disabled` appliqué, opacité 75% |
| Disabled | Opacité 50%, curseur `not-allowed`, aucune interaction |

---

## Structure HTML

```html
<!-- Bouton standard -->
<button class="btn btn--primary btn--base" type="button">
  Label
</button>

<!-- Avec icône gauche -->
<button class="btn btn--primary btn--base" type="button">
  <svg class="btn__icon" aria-hidden="true"><!-- icône --></svg>
  Label
</button>

<!-- Bouton icône seul (aria-label obligatoire) -->
<button class="btn btn--ghost btn--base btn--icon-only" type="button" aria-label="Supprimer le document">
  <svg aria-hidden="true"><!-- icône poubelle --></svg>
</button>

<!-- État loading -->
<button class="btn btn--primary btn--base" type="button" disabled aria-busy="true">
  <svg class="btn__spinner" aria-hidden="true"><!-- spinner --></svg>
  Enregistrement...
</button>
```

---

## Comportement responsive

- Sur mobile, les boutons `fullWidth` s'étendent sur toute la largeur.
- Dans un groupe de boutons, passer à `column` sous 480px si labels longs.
- La taille `sm` est privilégiée dans les cellules de tableau sur mobile.

---

## Accessibilité

- `type="button"` par défaut pour éviter la soumission involontaire de formulaires.
- Ne jamais supprimer le focus ring.
- Boutons icône seul : `aria-label` obligatoire.
- État loading : `aria-busy="true"` + `disabled`.
- Bouton de destruction : considérer un dialog de confirmation.

---

## Règles d'usage

- Une seule action `primary` visible à la fois dans une section.
- Préférer `secondary` pour les actions de retour ou alternative.
- `danger` uniquement pour les actions irréversibles ou critiques.
- Ne pas mélanger les tailles dans un même groupe de boutons.
- Label : verbe à l'infinitif ou impératif, concis, sans ambiguïté.
