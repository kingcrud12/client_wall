# Index — Composants Primitives

Les primitives sont les blocs atomiques du design system. Autonomes, sans opinion métier, réutilisables dans n'importe quel contexte.

---

## Liste des primitives

| Composant | Fichier | Description |
|---|---|---|
| Button | `button.md` | Bouton d'action (primary, secondary, ghost, danger) |
| Input | `input.md` | Champ de saisie texte avec label, hints, erreurs |
| Select | `select.md` | Sélecteur d'option (native ou custom) |
| Badge | `badge.md` | Étiquette de statut non interactive |
| Avatar | `avatar.md` | Représentation utilisateur (photo ou initiales) |
| ProgressBar | `progress-bar.md` | Barre de progression linéaire |

---

## Primitives à documenter (backlog)

| Composant | Description | Priorité |
|---|---|---|
| Checkbox | Case à cocher avec label | Haute |
| RadioGroup | Groupe de boutons radio | Haute |
| Toggle / Switch | Interrupteur on/off | Haute |
| Textarea | Zone de texte multi-lignes | Haute |
| Tooltip | Info-bulle au survol | Moyenne |
| Spinner | Indicateur de chargement circulaire | Moyenne |
| Skeleton | Placeholder de chargement | Moyenne |
| Divider | Séparateur horizontal ou vertical | Basse |
| Tag | Étiquette supprimable (filtres) | Basse |
| Kbd | Raccourci clavier stylisé | Basse |

---

## Règles pour les primitives

1. **Aucune logique métier** — une primitive ne sait pas qu'elle est sur une page "factures".
2. **Props explicites** — toutes les variantes passent par des props, pas des classes CSS.
3. **Accessible par défaut** — ARIA inclus dans la spécification.
4. **Themeable** — utilise uniquement des tokens CSS, jamais de valeurs brutes.
5. **Testable** — chaque état (default, hover, focus, error, disabled, loading) est représentable via des props seules.
