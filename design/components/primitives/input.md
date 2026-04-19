# Composant — Input

**Catégorie** : Primitive  
**Fichier cible** : `src/components/primitives/Input.tsx`

---

## Description

Champ de saisie de texte. Toujours accompagné d'un `<label>` associé. Supporte les états de validation, les icônes et les textes d'aide.

---

## Props

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `id` | `string` | — | Requis — associe label et input |
| `label` | `string` | — | Texte du label (affiché au-dessus) |
| `placeholder` | `string` | — | Texte indicatif dans le champ |
| `value` | `string` | — | Valeur contrôlée |
| `onChange` | `(e) => void` | — | Handler changement |
| `type` | `string` | `'text'` | Type HTML (email, password, number, tel...) |
| `error` | `string` | — | Message d'erreur (affiche état erreur) |
| `hint` | `string` | — | Texte d'aide sous le champ (optionnel) |
| `required` | `boolean` | `false` | Champ obligatoire |
| `disabled` | `boolean` | `false` | Champ désactivé |
| `readOnly` | `boolean` | `false` | Champ lecture seule |
| `prefix` | `ReactNode` | — | Élément à gauche (icône, symbole) |
| `suffix` | `ReactNode` | — | Élément à droite (icône, unité) |
| `size` | `'sm' \| 'base'` | `'base'` | Taille du champ |
| `autoComplete` | `string` | — | Attribut HTML autocomplete |

---

## Structure

```
[Label] (*si required)
[Prefix Icon] [Input field] [Suffix Icon/Action]
[Hint text] ou [Error message]
```

---

## États visuels

| État | Border | Background | Texte |
|---|---|---|---|
| Default | `--input-border` | `--input-bg` | `--input-text` |
| Hover | `--input-border-hover` | `--input-bg` | `--input-text` |
| Focus | `--input-border-focus` + focus ring | `--input-bg` | `--input-text` |
| Error | `--input-border-error` + error ring | `--input-bg` | `--input-text` |
| Disabled | `--input-border` (50% opacité) | `--input-bg-disabled` | `--color-text-disabled` |
| Read-only | `--input-border` | `--color-bg-subtle` | `--color-text-secondary` |

---

## Tailles

| Taille | Font-size | Padding vertical | Padding horizontal | Height |
|---|---|---|---|---|
| `sm` | `--text-sm` | 6px | 10px | 32px |
| `base` | `--text-base` | 8px | 12px | 40px |

---

## Variante avec prefix/suffix

```html
<div class="input-wrapper">
  <label class="input__label" for="amount">Montant HT</label>
  <div class="input__field-wrapper">
    <span class="input__prefix">€</span>
    <input
      id="amount"
      class="input__field input__field--has-prefix"
      type="number"
      placeholder="0.00"
    />
  </div>
</div>
```

---

## Structure HTML complète

```html
<div class="input-wrapper">
  <label class="input__label" for="email">
    Adresse email
    <span class="input__required" aria-hidden="true">*</span>
  </label>

  <div class="input__field-wrapper">
    <!-- Prefix optionnel -->
    <span class="input__prefix" aria-hidden="true">
      <!-- icône envelope -->
    </span>

    <input
      id="email"
      class="input__field"
      type="email"
      placeholder="you@company.com"
      required
      aria-required="true"
      aria-describedby="email-error"
      autocomplete="email"
    />
  </div>

  <!-- Erreur (conditionnel) -->
  <p class="input__error" id="email-error" role="alert" aria-live="polite">
    Cette adresse email est invalide.
  </p>

  <!-- Ou hint (conditionnel) -->
  <p class="input__hint" id="email-hint">
    Utilisée pour les notifications et la connexion.
  </p>
</div>
```

---

## Responsive

- Toujours `width: 100%` dans un formulaire colonne.
- En grille 2 colonnes (desktop), les inputs s'adaptent à leur cellule.
- Sur mobile, labels et champs en colonne uniquement.

---

## Accessibilité

- `<label>` toujours associé via `for` / `htmlFor`.
- `aria-required="true"` si obligatoire.
- `aria-describedby` pointe vers le message d'erreur ou le hint.
- `role="alert"` + `aria-live="polite"` sur les messages d'erreur.
- Ne jamais utiliser `placeholder` comme seul label.

---

## Cas spéciaux

### Input montant financier

```html
<input type="number" min="0" step="0.01" inputmode="decimal" />
```

Ajouter `font-variant-numeric: tabular-nums` pour l'alignement des chiffres.

### Input mot de passe

Toujours inclure un bouton "Afficher/Masquer" avec aria-label approprié.

```html
<input type="password" autocomplete="current-password" />
<button type="button" aria-label="Afficher le mot de passe">
  <!-- icône eye / eye-off -->
</button>
```
