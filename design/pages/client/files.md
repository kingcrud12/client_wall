# Page — Fichiers (Client)

**Zone** : Client  
**Route** : `/client/:projectId/files`  
**Auth** : membre zone client (permission `read:document`)  
**Upload** : permission `add:document` requise  
**Suppression** : permission `delete:document` ou être l'auteur du fichier  
**Composants** : `FileUploader`, `Button`, `Badge`, `Input`, `Navbar`

---

## Objectif

Permettre au client de consulter et télécharger les documents partagés par l'organisation, de prévisualiser les images et PDF, et d'uploader ses propres fichiers (briefs, assets, retours).

---

## Layout

```
[Topbar]
┌────────────────────────────────────────────────────────────┐
│  Header : titre + bouton upload                            │
├────────────────────────────────────────────────────────────┤
│  Filtres + recherche                                       │
├────────────────────────────────────────────────────────────┤
│  Section : Documents partagés par l'organisation           │
├────────────────────────────────────────────────────────────┤
│  Section : Vos fichiers                                    │
└────────────────────────────────────────────────────────────┘
```

---

## Sections

### 1. Header

```
Fichiers — Projet Alpha                    [+ Ajouter un fichier]
```

Le bouton [+ Ajouter un fichier] est masqué si la permission `add:document` est absente.

### 2. Filtres et recherche

```
[Tous]  [Partagés avec moi]  [Mes fichiers]     [🔍 Rechercher un fichier...]
```

Filtre par type (optionnel, sur desktop) :

```
Type : [Tous ▼]   (PDF · Images · Documents · Archives · Autres)
```

### 3. Section — Documents partagés par l'organisation

Titre : "Partagés par [Nom du workspace]"

Affichage en liste (desktop) ou cards (mobile) :

```
┌───────────────────────────────────────────────────────────────────┐
│  📄 devis-2024-v2.pdf           PDF    2,3 MB   15 janv. 2025    │
│     Partagé par Mon Agence SAS                                    │
│                             [Prévisualiser]  [Télécharger]        │
├───────────────────────────────────────────────────────────────────┤
│  📊 planning-general.xlsx       XLSX   450 KB   10 janv. 2025    │
│     Partagé par Mon Agence SAS                                    │
│                                           [Télécharger]           │
├───────────────────────────────────────────────────────────────────┤
│  🖼 maquettes-v3.zip            ZIP    15,2 MB  08 janv. 2025    │
│     Partagé par Mon Agence SAS                                    │
│                                           [Télécharger]           │
└───────────────────────────────────────────────────────────────────┘
```

**Règle d'affichage** : uniquement les fichiers explicitement partagés avec la zone client. Les documents internes (timesheets, notes, etc.) ne sont jamais visibles.

### 4. Section — Vos fichiers

Titre : "Vos fichiers"  
Sous-titre : "Fichiers que vous avez partagés avec l'équipe."

```
┌───────────────────────────────────────────────────────────────────┐
│  📋 brief-initial.docx          DOCX   1,2 MB   05 janv. 2025   │
│                                     [Prévisualiser]  [Télécharger]  [Supprimer] │
├───────────────────────────────────────────────────────────────────┤
│  🖼 logo-hd.png                 PNG    3,4 MB   05 janv. 2025   │
│                                     [Prévisualiser]  [Télécharger]  [Supprimer] │
└───────────────────────────────────────────────────────────────────┘

[+ Ajouter un fichier]
```

---

## Prévisualisation

### Images (PNG, JPG, GIF, WEBP, SVG)

Clic sur [Prévisualiser] → lightbox plein écran :

```
┌──────────────────────────────────────────────────────────┐
│  ✕                         logo-hd.png              [⬇]  │
│                                                          │
│                    [Image centrée, zoomable]             │
│                                                          │
│                                           ← 1/2 →        │
└──────────────────────────────────────────────────────────┘
```

- Fermeture : clic extérieur, touche Echap, bouton ✕
- Navigation entre images du même dossier : flèches ←/→ ou touches clavier
- Bouton [⬇] pour télécharger depuis la lightbox
- Zoom : double-clic ou pinch (mobile)

### PDF

Clic sur [Prévisualiser] → modal avec iframe PDF :

```
┌──────────────────────────────────────────────────────────┐
│  devis-2024-v2.pdf                              [⬇]  ✕  │
│  ────────────────────────────────────────────────────── │
│                                                          │
│  [Iframe PDF — scrollable]                               │
│                                                          │
│                                       ← Page 2/5 →       │
└──────────────────────────────────────────────────────────┘
```

Fallback si iframe non supportée : "Votre navigateur ne peut pas prévisualiser ce PDF." + [Télécharger]

### Autres types (DOCX, XLSX, ZIP...)

Pas de prévisualisation. Bouton [Télécharger] uniquement.

---

## Upload

Déclenché par [+ Ajouter un fichier] ou glisser-déposer dans la section "Vos fichiers" :

```
┌──────────────────────────────────────────────────────────┐
│              Ajout d'un fichier                          │
│                                                          │
│  Glissez vos fichiers ici, ou                            │
│  [Parcourir les fichiers]                                │
│                                                          │
│  Formats acceptés : tous                                 │
│  Taille maximale : 50 Mo par fichier                     │
│                                                          │
│  logo-hd.png             3,4 MB   ██████████  ✓ Envoyé  │
│  brief-v2.docx           1,2 MB   ████░░░░░░   42%…     │
└──────────────────────────────────────────────────────────┘
```

- Upload multiple simultané
- Barre de progression individuelle par fichier
- Statut par fichier : En cours / Envoyé ✓ / Erreur ✗
- Annulation possible pendant l'upload (bouton ✕ par fichier)
- Après envoi : fichier visible immédiatement dans la section "Vos fichiers"
- L'organisation voit immédiatement les fichiers uploadés par le client

### Erreurs d'upload

| Erreur | Message |
|---|---|
| Fichier trop lourd | "Ce fichier dépasse la limite de 50 Mo." |
| Quota atteint | "Votre espace est plein. Contactez Mon Agence SAS." |
| Type refusé | "Ce type de fichier n'est pas autorisé." |
| Erreur réseau | "Échec de l'envoi. Réessayez." |

---

## Suppression

Clic sur [Supprimer] → dialog de confirmation :

```
Supprimer "brief-initial.docx" ?
Ce fichier sera définitivement supprimé et inaccessible à l'équipe.

[Supprimer]  (Button danger)   [Annuler]
```

Seul l'auteur du fichier peut le supprimer. Le bouton [Supprimer] n'apparaît pas sur les fichiers partagés par l'organisation.

---

## Indicateur de quota (conditionnel)

Affiché uniquement si le quota de stockage est proche de la limite (> 80%) :

```
Stockage : 4,2 Go / 5 Go utilisés   ████████████████░░  84%
```

Si quota atteint (100%) : Alert `error` + bouton upload désactivé.

---

## Informations affichées par fichier

| Métadonnée | Affichée |
|---|---|
| Icône type | Oui (déduite de l'extension) |
| Nom du fichier | Oui (tronqué si > 40 chars) |
| Extension | Oui |
| Taille | Oui |
| Date d'upload | Oui |
| Partagé par | Oui si uploadé par l'organisation |
| Actions | Selon permissions |

---

## États

| État | Affichage |
|---|---|
| Loading | Skeleton liste |
| Aucun fichier partagé | "L'équipe n'a pas encore partagé de fichiers." |
| Aucun fichier client | "Partagez vos fichiers avec l'équipe." + [+ Ajouter un fichier] |
| Résultat de recherche vide | "Aucun fichier ne correspond à votre recherche." + [Réinitialiser] |
| Upload en cours | Barre de progression inline + bouton annuler |
| Erreur téléchargement | Toast error "Téléchargement impossible. Réessayez." |

---

## Données non affichées

- Fichiers des zones Collaborateurs ou Admin non explicitement partagés avec la zone client
- Métadonnées internes (chemin S3, ID techniques)

---

## Responsive

| Breakpoint | Comportement |
|---|---|
| Mobile | Liste verticale ; lightbox plein écran ; upload en modal fullscreen |
| Tablet | Liste avec colonnes nom + taille + date + actions ; lightbox modal |
| Desktop | Liste complète + filtres type inline ; lightbox ; prévisualisation PDF modal large |
