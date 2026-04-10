# Composant — CardProject

**Catégorie** : Composite  
**Fichier cible** : `src/components/composite/CardProject.tsx`

---

## Description

Card de résumé d'un projet. Utilisée dans la liste des projets (Zone Admin dashboard et page /projects). Cliquable pour accéder au projet.

---

## Props

| Prop | Type | Description |
|---|---|---|
| `project` | `Project` | Données du projet |
| `onClick` | `() => void` | Navigation vers le projet |

```typescript
type Project = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  zonesCount: number;
  membersCount: number;
  lastActivityAt?: string;
  progress?: number;   // 0-100, si rapport publié disponible
}
```

---

## Structure visuelle

```
┌─────────────────────────────────────────┐
│  Projet Alpha                            │
│  Refonte site e-commerce                 │
│                                          │
│  ████████░░░░░░░░░░  65%                │
│                                          │
│  [Zones: 2]  [Membres: 5]               │
│                                          │
│  Dernière activité : il y a 2 jours     │
└─────────────────────────────────────────┘
```

---

## Éléments

1. **Titre** — `heading-4`, truncate sur 2 lignes max
2. **Description** — `body-sm`, `--color-text-secondary`, truncate sur 2 lignes
3. **Barre de progression** — visible uniquement si `progress` défini ; `ProgressBar` size `sm`
4. **Méta-données** — badges/icônes pour zones et membres
5. **Dernière activité** — date relative (ex: "il y a 2 jours")

---

## États

| État | Comportement |
|---|---|
| Default | Ombre `--shadow-sm`, border `--card-border` |
| Hover | Ombre `--shadow-md`, légère translation Y -2px |
| Focus | Focus ring |
| Sans rapport | Barre de progression non affichée |

---

## Responsive

| Breakpoint | Layout |
|---|---|
| Mobile | Full-width |
| Tablet | 2 colonnes |
| Desktop | 3 colonnes |

---

## Accessibilité

- `<article>` avec `aria-label="Projet Alpha"`
- Lien ou `tabindex="0"` sur la card complète
