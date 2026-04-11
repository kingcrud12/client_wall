# Page — Rapports d'avancement (Collaborateurs)

**Zone** : Collaborateurs  
**Route liste** : `/collab/projects/:projectId/reports/`  
**Route création** : `/collab/projects/:projectId/reports/new` (managers)  
**Route détail** : `/collab/projects/:projectId/reports/:reportId`  
**Auth** : membres zone collaborateurs (lecture) ; managers (création/publication)  
**Composants** : `Badge`, `Button`, `ProgressBar`, `Input`, `Textarea`, `FileUploader`, `Sidebar`, `Navbar`

---

## Objectif

Créer et publier des rapports d'avancement du projet. Les managers rédigent les rapports, les collaborateurs les consultent, et ils sont publiés vers la zone client.

---

## Page Liste (`/reports/`)

### Sections

#### Header

```
Rapports d'avancement — Projet Alpha     [+ Nouveau rapport (manager)]
```

#### Métriques

```
Avancement global : ████████████████░░░░  78%  (dernier rapport publié)
```

#### Liste des rapports

```
┌────────────────────────────────────────────────────────────────────┐
│ Rapport Janvier 2025 — Semaine 2       [PUBLIÉ]   15 janv. 2025   │
│ Avancement global : 65%                                             │
│ "Migration base de données terminée. Démarrage frontend prévu..."   │
│                                          [Voir] [Archiver (mgr)]   │
├────────────────────────────────────────────────────────────────────┤
│ Rapport Janvier 2025 — Semaine 1       [PUBLIÉ]   08 janv. 2025   │
│ Avancement global : 45%                                             │
│ "Phase design validée avec le client..."                            │
│                                          [Voir]                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## Page Détail (`/reports/:reportId`)

### Vue collaborateur / lecture

```
Rapport d'avancement — Projet Alpha
Janvier 2025 — Semaine 2
Publié le 15 janv. 2025 par Marie Martin

════════════════════════════════════════════════════

Avancement global
████████████████░░░░  65%

Milestones :
  ✓  Phase design              [TERMINÉ]
  ●  Développement backend     [EN COURS]
  ○  Développement frontend    [À FAIRE]
  ○  Tests & recette           [À FAIRE]
  ○  Mise en production        [À FAIRE]

Description
Migration de la base de données terminée avec succès.
Le module d'authentification est en cours de développement.

Prochaines étapes
Démarrage du développement frontend prévu pour la semaine 3.
Réunion de suivi client le 22 janvier.

Fichiers joints
  📸 screenshot-dashboard.png
  📄 planning-fevrier.pdf
```

---

## Page Création (`/reports/new`)

Accès : managers uniquement.

### Formulaire

| Champ | Type | Description |
|---|---|---|
| Période / Label | `input[text]` | Ex: "Janvier 2025 — Semaine 2" |
| Avancement global (%) | `input[number]` + slider | 0-100 |

**Milestones** (répétables) :

```
[Statut ▼]  [Label du milestone...]               [×]
[✓ Terminé] Phase design                           ✕
[● En cours] Développement backend                 ✕
[○ À faire]  Développement frontend                ✕
[+ Ajouter un milestone]
```

| Champ | Type |
|---|---|
| Label | `input[text]` |
| Statut | `select` : todo, in_progress, done |

**Description** :
- Textarea "Ce qui a été accompli"

**Prochaines étapes** :
- Textarea "Ce qui est prévu"

**Fichiers joints** :
- `FileUploader` multiple (screenshots, docs)

### Actions

- [Enregistrer en brouillon] — état `draft`
- [Publier] — état `published`, visible dans zone client + confirmation dialog

**Confirmation avant publication** :
> "Ce rapport sera visible par tous les membres de la zone client. Cette action est irréversible (lecture seule après publication)."
> [Publier] [Annuler]

---

## Règles métier

- Un rapport **publié** ne peut plus être modifié.
- Pour modifier : créer un nouveau rapport (historique conservé).
- Les rapports archivés sont conservés mais masqués par défaut.
- La zone client voit uniquement les rapports à l'état `published`.

---

## Responsive

| Breakpoint | Comportement |
|---|---|
| Mobile | Détail en scroll vertical, milestones empilés |
| Tablet | Détail 1 colonne max-width 640px |
| Desktop | Détail max-width 768px, sidebar visible |
