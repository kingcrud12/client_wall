# Page — Liste des Projets

**Zone** : Admin  
**Route** : `/admin/projects/`  
**Auth** : owner, manager  
**Composants** : `CardProject`, `Sidebar`, `Navbar`, `Button`, `Select`

---

## Objectif

Lister tous les projets du workspace. Permettre la recherche, le filtrage et l'accès rapide à chaque projet. Point d'entrée principal de l'interface admin.

---

## Sections

### 1. Header de page

```
Projets                              [+ Nouveau projet]
12 projets actifs — 3 archivés
```

- Titre "Projets"
- Compteur de projets (actifs / archivés)
- Bouton "Nouveau projet" → `/admin/projects/new`

### 2. Barre de filtres

```
[🔍 Rechercher un projet...]    [Statut : Actifs ▼]    [Trier par : Date ▼]
```

| Filtre | Options |
|---|---|
| Recherche | Texte libre — filtre sur nom + description |
| Statut | Tous, Actifs, Archivés |
| Trier par | Date de création, Dernière activité, Nom A→Z |

### 3. Grille de projets

`CardProject` en grille responsive. Chaque card :
- Nom du projet
- Description (tronquée à 2 lignes)
- Barre de progression (si rapport publié)
- Badges : nb zones, nb membres
- Dernière activité (date relative)

### 4. Pagination ou infinite scroll

- Pagination recommandée (plus accessible)
- 12 projets par page par défaut

---

## États

| État | Affichage |
|---|---|
| Loading | Skeleton de 6 cards |
| Vide (0 projets) | Illustration + "Créez votre premier projet pour commencer." + [Créer un projet] |
| Vide (filtre actif) | "Aucun projet correspond à votre recherche." + [Effacer la recherche] |
| Erreur | "Impossible de charger les projets." + [Réessayer] |

---

## Responsive

| Breakpoint | Grille |
|---|---|
| Mobile | 1 colonne |
| Tablet | 2 colonnes |
| Desktop | 3 colonnes |
