# Composant — Select

**Catégorie** : Primitive  
**Fichier cible** : `src/components/primitives/Select.tsx`

---

## Description

Composant de sélection dans une liste d'options. Deux implémentations selon le cas :
- **Native select** : pour les formulaires simples (mobile-friendly, accessible par défaut)
- **Custom select** : pour les cas nécessitant des options enrichies (icônes, groupes, recherche)

---

## Props

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `id` | `string` | — | Requis — associe label |
| `label` | `string` | — | Texte du label |
| `options` | `Option[]` | — | Liste des options |
| `value` | `string` | — | Valeur sélectionnée |
| `onChange` | `(value: string) => void` | — | Handler changement |
| `placeholder` | `string` | — | Option vide par défaut |
| `error` | `string` | — | Message d'erreur |
| `hint` | `string` | — | Texte d'aide |
| `disabled` | `boolean` | `false` | Désactivé |
| `required` | `boolean` | `false` | Obligatoire |
| `size` | `'sm' \| 'base'` | `'base'` | Taille |

```typescript
type Option = {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}
```

---

## États visuels

Identiques à l'Input : default, hover, focus, error, disabled.

---

## Structure HTML (native)

```html
<div class="select-wrapper">
  <label class="select__label" for="status">
    Statut de la facture
  </label>
  <div class="select__field-wrapper">
    <select
      id="status"
      class="select__field"
      aria-describedby="status-error"
    >
      <option value="">Tous les statuts</option>
      <option value="draft">Brouillon</option>
      <option value="issued">Émise</option>
      <option value="paid">Payée</option>
      <option value="overdue">En retard</option>
    </select>
    <span class="select__chevron" aria-hidden="true">
      <!-- icône chevron-down -->
    </span>
  </div>
</div>
```

---

## Cas d'usage par page

| Contexte | Options | Type |
|---|---|---|
| Filtre statut factures | draft, issued, paid, overdue... | Native |
| Sélection rôle membre | Liste des rôles du projet | Native |
| Sélection zone membre | Liste des zones | Native |
| Sélection type document | Types disponibles | Native |
| Filtre période timesheet | Mois/années | Native |
| Sélection pays (facture) | Liste pays | Custom + recherche |
| Sélection collaborateur | Membres du workspace | Custom + avatar |
