# Page — Fichiers (Client)

**Zone** : Client  
**Route** : `/client/:projectId/files`  
**Auth** : membre zone client (permission `read:document`)  
**Upload** : permission `add:document` requise  
**Composants** : `FileUploader`, `Button`, `Badge`, `Navbar`

---

## Objectif

Permettre au client de consulter et télécharger les documents partagés par l'organisation, et d'uploader des fichiers depuis son côté (livrables, briefs, assets).

---

## Sections

### 1. Header

```
Fichiers — Projet Alpha         [+ Ajouter un fichier (si permission)]
```

### 2. Filtres

```
[Tous] [Partagés avec moi] [Mes fichiers]    [🔍 Rechercher...]
```

### 3. Liste des fichiers

**Partagés par l'organisation** (section "Documents") :

```
Partagés par Mon Agence SAS

📄 devis-2024-v2.pdf           PDF   2.3 MB   15 janv. 2025   [Télécharger]
📊 planning-general.xlsx       XLSX  450 KB   10 janv. 2025   [Télécharger]
📸 maquettes-validees.zip      ZIP   15.2 MB  08 janv. 2025   [Télécharger]
```

**Uploadés par le client** (section "Mes fichiers") :

```
Vos fichiers

📋 brief-initial.docx          DOCX  1.2 MB   05 janv. 2025   [Télécharger] [Supprimer]
🖼 logo-hd.png                 PNG   3.4 MB   05 janv. 2025   [Télécharger] [Supprimer]
[+ Ajouter un fichier]
```

---

## Upload client

Déclenché par [+ Ajouter un fichier] :

`FileUploader` en modal ou zone inline :
- Formats : tous (selon plan)
- Taille max : selon plan du workspace
- Multiple : oui

Les fichiers uploadés par le client (`uploaded_by_client`) sont :
- Visibles par le client qui les a uploadés
- Automatiquement visibles par l'organisation (managers + collaborateurs autorisés)
- Non visibles par d'autres clients de la même zone (sauf config explicite)

---

## Informations par fichier

| Métadonnée | Description |
|---|---|
| Icône type | Déduite de l'extension |
| Nom du fichier | Tronqué si trop long |
| Type | Extension (PDF, DOCX, PNG...) |
| Taille | Format humain (KB, MB) |
| Date | Date d'upload |
| Partagé par | Nom si uploadé par org |
| Actions | Télécharger + Supprimer (si auteur) |

---

## États

| État | Affichage |
|---|---|
| Loading | Skeleton liste |
| Aucun fichier partagé | "Aucun document partagé pour l'instant." |
| Aucun fichier client | "Uploadez vos fichiers pour les partager avec l'équipe." |
| Erreur téléchargement | Toast error "Téléchargement impossible. Réessayez." |
| Upload en cours | Barre de progression inline |

---

## Données non affichées

- Documents non exposés à la zone client (même s'ils existent dans le projet)
- Documents confidentiels (notes internes, timesheets)

---

## Responsive

| Breakpoint | Comportement |
|---|---|
| Mobile | Liste verticale, boutons d'action inline |
| Tablet | Liste 2 colonnes |
| Desktop | Liste 3 colonnes ou tableau |
