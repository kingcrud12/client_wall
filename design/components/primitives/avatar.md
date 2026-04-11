# Composant — Avatar

**Catégorie** : Primitive  
**Fichier cible** : `src/components/primitives/Avatar.tsx`

---

## Description

Représentation visuelle d'un utilisateur. Affiche une photo de profil ou, à défaut, les initiales de l'utilisateur sur un fond coloré.

---

## Props

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `name` | `string` | — | Nom complet (pour initiales + aria-label) |
| `src` | `string` | — | URL de la photo de profil |
| `size` | `'xs' \| 'sm' \| 'base' \| 'lg' \| 'xl'` | `'base'` | Taille |
| `color` | `string` | auto | Couleur de fond (calculée depuis le nom) |
| `status` | `'online' \| 'offline' \| undefined` | — | Indicateur de statut (point coloré) |

---

## Tailles

| Taille | Diamètre | Font-size initiales | Usage |
|---|---|---|---|
| `xs` | 24px | 10px | Listes compactes, tableaux |
| `sm` | 32px | 12px | Navigation, tags |
| `base` | 40px | 14px | Cards, profils inline |
| `lg` | 48px | 16px | Headers de section |
| `xl` | 64px | 20px | Page profil |

---

## Génération de couleur

La couleur de fond est calculée de façon déterministe depuis le nom de l'utilisateur, garantissant qu'un même utilisateur a toujours la même couleur :

```javascript
const COLORS = [
  '#1E293B', // slate
  '#0EA5E9', // sky
  '#10B981', // emerald
  '#F59E0B', // amber
  '#EF4444', // red
  '#8B5CF6', // violet
  '#EC4899', // pink
  '#14B8A6', // teal
];

function getAvatarColor(name: string): string {
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return COLORS[index % COLORS.length];
}
```

---

## Structure HTML

```html
<!-- Avec photo -->
<span class="avatar avatar--base" aria-label="Marie Dupont">
  <img src="/avatars/marie.jpg" alt="" aria-hidden="true" />
</span>

<!-- Avec initiales -->
<span
  class="avatar avatar--base"
  aria-label="Marie Dupont"
  style="background-color: #1E293B;"
>
  <span class="avatar__initials" aria-hidden="true">MD</span>
</span>

<!-- Avec statut online -->
<span class="avatar avatar--base" aria-label="Marie Dupont (en ligne)">
  <img src="/avatars/marie.jpg" alt="" aria-hidden="true" />
  <span class="avatar__status avatar__status--online" aria-hidden="true"></span>
</span>
```

---

## Groupe d'avatars (AvatarGroup)

Pour les listes de membres sur une card ou dans la navigation. Superposition avec overlap.

```html
<!-- 3 membres affichés, +2 cachés -->
<div class="avatar-group">
  <span class="avatar avatar--sm" aria-label="Marie Dupont">...</span>
  <span class="avatar avatar--sm" aria-label="Jean Martin">...</span>
  <span class="avatar avatar--sm" aria-label="Sophie Lee">...</span>
  <span class="avatar avatar--sm avatar--overflow" aria-label="2 membres supplémentaires">
    <span class="avatar__initials">+2</span>
  </span>
</div>
```

Overlap : `-8px` entre chaque avatar. Max affiché : 3-4 selon le contexte.

---

## Responsive

Les avatars ne changent pas de taille par breakpoint (sauf si le composant parent change de layout).

---

## Accessibilité

- `aria-label` avec le nom complet de l'utilisateur sur le wrapper.
- L'image a `alt=""` et `aria-hidden="true"` (le wrapper porte l'information).
- Les initiales ont `aria-hidden="true"`.
