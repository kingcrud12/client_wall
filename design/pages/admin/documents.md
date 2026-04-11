# Page — Documents (Admin)

**Zone** : Admin  
**Route** : `/admin/projects/:projectId/documents`  
**Auth** : owner, manager  
**Composants** : `FileUploader`, `Badge`, `Button`, `Select`, `Sidebar`, `Navbar`

---

## Objectif

Centre de gestion documentaire d'un projet. Upload, organisation, contrôle de visibilité par zone, versioning, téléchargement.

---

## Sections

### 1. Header

```
Documents — Projet Alpha               [+ Ajouter un document]
```

### 2. Filtres

```
[🔍 Rechercher...]  [Type ▼]  [Zone ▼]  [Catégorie ▼]
```

| Filtre | Options |
|---|---|
| Type | Tous, Contrat, Facture, Rapport, Feuille de temps, Fichier, Autre |
| Zone | Toutes, Zone Client Alpha, Zone Collabs |
| Catégorie | Tous, Uploadé par org, Généré par système, Géré par outil, Uploadé par client |

### 3. Grille / Liste des documents

**Vue grille** (par défaut) :

Chaque document :
```
┌─────────────────────────────┐
│  [Icône type]               │
│  devis-2024-v2.pdf          │
│  PDF — 2.3 MB               │
│  Uploadé le 15 janv. 2025   │
│  [Zones : Client, Collab]   │
│  [Voir] [Gérer visibilité]  │
└─────────────────────────────┘
```

**Vue liste** (toggle) :

Tableau avec colonnes : Nom, Type, Taille, Date, Zones, Catégorie, Actions

### 4. Panneau de détail (drawer ou page dédiée)

Affiché au clic sur un document :

```
Nom : devis-2024-v2.pdf
Type : Contrat
Taille : 2.3 MB
Uploadé par : Marie Martin
Date : 15 janv. 2025
Catégorie : uploaded_by_org

Visibilité par zone :
  ✓ Zone Client Alpha      [Retirer]
  ✓ Zone Collaborateurs    [Retirer]
  ○ Zone Client Beta       [Exposer]

Versions :
  v2 (actuelle) — 15 janv. 2025 — Marie Martin
  v1 — 10 janv. 2025 — Marie Martin

[Télécharger] [Nouvelle version] [Supprimer]
```

---

## Upload de document

Déclenché par [+ Ajouter un document] :

Dialog/modal avec :
1. `FileUploader` (drag & drop)
2. Sélection du type de document
3. Titre du document
4. Choix de la/les zone(s) d'exposition

---

## Icônes par type de document

| Type | Icône Lucide |
|---|---|
| PDF | `FileText` (rouge) |
| DOCX/DOC | `FileText` (bleu) |
| XLSX/XLS | `BarChart2` (vert) |
| Image | `Image` |
| Contrat | `FileCheck` |
| Facture | `Receipt` |
| Autre | `File` |

---

## États

| État | Affichage |
|---|---|
| Loading | Skeleton 6 cards |
| Vide | "Aucun document pour ce projet." + [Ajouter un document] |
| Vide (filtre) | "Aucun document correspond à ces filtres." |

---

## Règles métier

- Un document peut être exposé à **0 ou plusieurs zones** sans duplication.
- Seuls les managers voient et gèrent la visibilité.
- Les collaborateurs voient uniquement les docs exposés à leur zone.
- Les clients voient uniquement les docs exposés à leur zone client.
- Les versions antérieures sont conservées (snapshots JSON + storage_key).

---

## Responsive

| Breakpoint | Layout |
|---|---|
| Mobile | Vue liste uniquement, upload en page dédiée |
| Tablet | Vue liste ou grille 2 colonnes |
| Desktop | Vue grille 3-4 colonnes avec panneau détail slide-in |
