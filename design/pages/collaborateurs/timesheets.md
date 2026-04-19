# Page — Timesheets (Collaborateurs)

**Zone** : Collaborateurs  
**Route liste** : `/collab/projects/:projectId/timesheets/`  
**Route nouvelle** : `/collab/projects/:projectId/timesheets/new`  
**Route détail** : `/collab/projects/:projectId/timesheets/:timesheetId`  
**Auth** : membre de la zone collaborateurs du projet  
**Composants** : `Badge`, `Button`, `Input`, `Select`, `Sidebar`, `Navbar`

---

## Objectif

Permettre aux collaborateurs de saisir et soumettre leurs feuilles de temps. Permettre aux managers de les valider.

---

## Page Liste (`/timesheets/`)

### Sections

#### Header

```
Mes feuilles de temps — Projet Alpha        [+ Nouvelle feuille]
```

#### Résumé mensuel

```
┌──────────────┬──────────────┬──────────────┐
│  Ce mois     │  Total heures│  Validées    │
│  Janvier 2025│  87h 30      │  64h 00      │
└──────────────┴──────────────┴──────────────┘
```

(Managers voient aussi le coût total calculé)

#### Filtres

```
[Période ▼]  [Statut ▼]  [Collaborateur ▼ (managers)]
```

#### Liste des feuilles de temps

Tableau ou liste cards :

| Période | Heures | Statut | Soumise le | Actions |
|---|---|---|---|---|
| Janv. 2025 S1 | 40h 00 | `Validée` | 08/01/2025 | Voir |
| Janv. 2025 S2 | 38h 30 | `Soumise` | 15/01/2025 | Voir |
| Févr. 2025 S1 | 9h 00 | `En cours` | — | Saisir |

---

## Page Création / Saisie (`/timesheets/new` ou `/:timesheetId`)

### En-tête du formulaire

```
Feuille de temps                     [Collaborateur: Marie Martin]
Projet Alpha                         Période : [Semaine du 13 janv. 2025 ▼]
```

| Champ | Type | Description |
|---|---|---|
| Période | Date range picker | Semaine ou mois (configurable) |

### Lignes de temps

```
Date          Tâche                          Durée (h)   Commentaire    [×]
──────────────────────────────────────────────────────────────────────────
13/01/2025    [Développement interface...]   [7.5     ]  [Optionnel...]  ✕
14/01/2025    [Réunion client         ...]   [1.0     ]  [              ]  ✕
[+ Ajouter une ligne]
──────────────────────────────────────────────────────────────────────────
Total : 8h 30
```

**Champs par ligne** :
- `Date` : input date (dans la période sélectionnée)
- `Tâche` : input text (description de la tâche)
- `Durée (h)` : input number (format X.XX, pas plus de 24h/jour)
- `Commentaire` : input text (optionnel)
- Bouton supprimer ligne

**Managers uniquement** :
- Taux horaire : `input[number]` (visible uniquement par managers)
- Coût calculé total : affiché en bas, hidden pour collaborateurs

### Actions

- **Statut in_progress** : [Enregistrer], [Soumettre pour validation]
- **Statut submitted** (collaborateur) : [Retirer la soumission] (si non encore validé)
- **Statut submitted** (manager) : [Valider], [Rejeter avec commentaire]
- **Statut validated** : Lecture seule, aucune modification

### Validation manager

Dialog de confirmation :
- "Confirmer la validation de cette feuille de 40h ?"
- [Valider] [Annuler]

---

## Visibilité des données confidentielles

| Donnée | Collaborateur | Manager |
|---|---|---|
| Heures | Visible | Visible |
| Taux horaire | **Masqué** | Visible |
| Coût total | **Masqué** | Visible |
| Validation par | Non visible | Visible |

---

## États

| État | Affichage |
|---|---|
| Loading | Skeleton lignes |
| Vide (0 timesheets) | "Commencez à saisir vos heures." + [Nouvelle feuille] |
| Validée | Lecture seule, badge Validée, bouton télécharger |
| Erreur saisie | Erreur inline sur la ligne problématique |

---

## Responsive

| Breakpoint | Comportement |
|---|---|
| Mobile | Liste cards, saisie en colonne, pas de tableau |
| Tablet | Tableau simplifié (date + tâche + durée) |
| Desktop | Tableau complet avec commentaires et taux (si manager) |
