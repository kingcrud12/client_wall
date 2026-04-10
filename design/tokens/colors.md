# Tokens — Couleurs

Palette complète du design system Client Wall. Toutes les couleurs sont définies en variables CSS dans `tokens/index.css`.

---

## Philosophie couleur

Client Wall est un outil professionnel B2B. La palette doit inspirer **confiance**, **clarté** et **efficacité**. Pas de couleurs vives ou ludiques — sobriété et lisibilité en priorité.

- **Primaire** : Indigo — autorité, fiabilité, technologie
- **Neutre** : Slate — propre, professionnel, sans distraction
- **Sémantiques** : vert (succès), rouge (erreur), orange (attention), bleu (info)

---

## Palette primaire — Indigo

| Token | Valeur HEX | Usage |
|---|---|---|
| `--color-primary-50` | `#EEF2FF` | Backgrounds légers, hover subtle |
| `--color-primary-100` | `#E0E7FF` | Backgrounds actifs, selected |
| `--color-primary-200` | `#C7D2FE` | Borders hover |
| `--color-primary-300` | `#A5B4FC` | Icônes secondaires |
| `--color-primary-400` | `#818CF8` | États disabled d'éléments actifs |
| `--color-primary-500` | `#6366F1` | Brand couleur principale |
| `--color-primary-600` | `#4F46E5` | Boutons primaires, liens actifs |
| `--color-primary-700` | `#4338CA` | Bouton hover |
| `--color-primary-800` | `#3730A3` | Bouton pressed |
| `--color-primary-900` | `#312E81` | Textes dark sur fond clair |
| `--color-primary-950` | `#1E1B4B` | Sidebar dark, titres foncés |

---

## Palette neutre — Slate

| Token | Valeur HEX | Usage |
|---|---|---|
| `--color-neutral-0` | `#FFFFFF` | Fond de page (light mode) |
| `--color-neutral-50` | `#F8FAFC` | Fond alternatif, cards |
| `--color-neutral-100` | `#F1F5F9` | Fond input, tags |
| `--color-neutral-200` | `#E2E8F0` | Borders par défaut |
| `--color-neutral-300` | `#CBD5E1` | Borders inputs, dividers |
| `--color-neutral-400` | `#94A3B8` | Placeholder, texte désactivé |
| `--color-neutral-500` | `#64748B` | Texte secondaire |
| `--color-neutral-600` | `#475569` | Texte labels |
| `--color-neutral-700` | `#334155` | Texte corps |
| `--color-neutral-800` | `#1E293B` | Titres |
| `--color-neutral-900` | `#0F172A` | Texte dark principal |
| `--color-neutral-950` | `#020617` | Texte ultra-dark, mode dark |

---

## Couleurs sémantiques

### Succès — Emerald

| Token | Valeur HEX | Usage |
|---|---|---|
| `--color-success-50` | `#ECFDF5` | Background success toast |
| `--color-success-100` | `#D1FAE5` | Background badge paid |
| `--color-success-500` | `#10B981` | Icône succès, check |
| `--color-success-600` | `#059669` | Badge text paid |
| `--color-success-700` | `#047857` | Texte sombre succès |

### Erreur — Rose

| Token | Valeur HEX | Usage |
|---|---|---|
| `--color-error-50` | `#FFF1F2` | Background error toast |
| `--color-error-100` | `#FFE4E6` | Background badge error |
| `--color-error-500` | `#F43F5E` | Icône erreur |
| `--color-error-600` | `#E11D48` | Badge text error, bouton danger |
| `--color-error-700` | `#BE123C` | Hover bouton danger |

### Attention — Amber

| Token | Valeur HEX | Usage |
|---|---|---|
| `--color-warning-50` | `#FFFBEB` | Background warning toast |
| `--color-warning-100` | `#FEF3C7` | Background badge overdue |
| `--color-warning-500` | `#F59E0B` | Icône warning |
| `--color-warning-600` | `#D97706` | Badge text overdue |
| `--color-warning-700` | `#B45309` | Texte sombre warning |

### Information — Sky

| Token | Valeur HEX | Usage |
|---|---|---|
| `--color-info-50` | `#F0F9FF` | Background info toast |
| `--color-info-100` | `#E0F2FE` | Background badge info |
| `--color-info-500` | `#0EA5E9` | Icône info |
| `--color-info-600` | `#0284C7` | Badge text issued |
| `--color-info-700` | `#0369A1` | Texte sombre info |

---

## Couleurs de statut métier

### Statuts factures

| Statut | Background token | Text token | Label |
|---|---|---|---|
| `draft` | `--color-neutral-100` | `--color-neutral-600` | Brouillon |
| `issued` | `--color-info-100` | `--color-info-600` | Émise |
| `paid` | `--color-success-100` | `--color-success-600` | Payée |
| `overdue` | `--color-warning-100` | `--color-warning-600` | En retard |
| `partially_paid` | `--color-warning-100` | `--color-warning-700` | Part. payée |
| `refund` | `--color-primary-100` | `--color-primary-700` | Remboursée |

### Statuts timesheets

| Statut | Background token | Text token | Label |
|---|---|---|---|
| `in_progress` | `--color-neutral-100` | `--color-neutral-600` | En cours |
| `submitted` | `--color-info-100` | `--color-info-600` | Soumise |
| `validated` | `--color-success-100` | `--color-success-600` | Validée |

### Statuts rapports d'avancement

| Statut | Background token | Text token | Label |
|---|---|---|---|
| `draft` | `--color-neutral-100` | `--color-neutral-600` | Brouillon |
| `published` | `--color-success-100` | `--color-success-600` | Publié |
| `archived` | `--color-neutral-200` | `--color-neutral-500` | Archivé |

### Statuts contrats

| Statut | Background token | Text token | Label |
|---|---|---|---|
| `pending` | `--color-warning-100` | `--color-warning-600` | En attente |
| `signed` | `--color-success-100` | `--color-success-600` | Signé |
| `rejected` | `--color-error-100` | `--color-error-600` | Refusé |

### Milestones (rapports)

| Statut | Couleur icône | Label |
|---|---|---|
| `todo` | `--color-neutral-400` | À faire |
| `in_progress` | `--color-info-500` | En cours |
| `done` | `--color-success-500` | Terminé |

---

## Couleurs par zone

Chaque zone a une teinte d'accentuation pour différencier visuellement l'espace.

| Zone | Token | Valeur HEX | Usage |
|---|---|---|---|
| Admin | `--color-zone-admin` | `#4F46E5` | Indigo — sidebar, topbar |
| Collaborateurs | `--color-zone-collab` | `#0EA5E9` | Sky — sidebar, topbar |
| Client | `--color-zone-client` | `#10B981` | Emerald — sidebar, topbar |
