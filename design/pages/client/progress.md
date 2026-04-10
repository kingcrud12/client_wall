# Page — Avancement (Client)

**Zone** : Client  
**Route** : `/client/:projectId/progress`  
**Auth** : membre zone client (permission `read:progress_report`)  
**Composants** : `ProgressBar`, `Badge`, `Navbar`

---

## Objectif

Permettre au client de suivre l'avancement du projet via les rapports d'avancement publiés par l'organisation. Vue chronologique, lecture seule.

---

## Sections

### 1. Header

```
Avancement du projet — Projet Alpha
```

### 2. Barre de progression globale (actuelle)

```
Avancement global
████████████████████░░░░  78%

D'après le rapport du 22 janv. 2025
```

`ProgressBar` size `lg`, couleur adaptée au pourcentage.

### 3. Timeline des rapports

Ordre chronologique inverse (le plus récent en premier).

Chaque rapport dans la timeline :

```
────── 22 janvier 2025 ──────────────────────────────────────

Rapport — Janvier 2025, Semaine 3              [78%] [PUBLIÉ]

Avancement global : ███████████████████░  78%

Milestones :
  ✓  Phase design                              [TERMINÉ]
  ✓  Développement backend                     [TERMINÉ]
  ●  Développement frontend                    [EN COURS]
  ○  Tests & recette                           [À FAIRE]
  ○  Mise en production                        [À FAIRE]

Ce qui a été accompli
La phase backend est désormais complète. Toutes les API sont
testées et documentées. Le développement frontend a démarré
avec l'intégration des maquettes validées.

Prochaines étapes
Finalisation des composants UI (semaine 4).
Revue de code prévue le 31 janvier.

Fichiers joints (2)
  📸 screenshot-dashboard-v2.png    [Télécharger]
  📄 planning-fevrier.pdf           [Télécharger]

──────────────────────────────────────────────────────────────

────── 15 janvier 2025 ──────────────────────────────────────

Rapport — Janvier 2025, Semaine 2              [65%] [PUBLIÉ]
...

```

### 4. Indicateur de milestone

Affichage inline des milestones dans chaque rapport :

| Statut | Icône | Couleur | Label |
|---|---|---|---|
| `done` | ✓ CheckCircle | `--color-success-500` | Terminé |
| `in_progress` | ● Circle | `--color-info-500` | En cours |
| `todo` | ○ Circle | `--color-neutral-400` | À faire |

---

## États

| État | Affichage |
|---|---|
| Loading | Skeleton timeline |
| Aucun rapport publié | "Aucun rapport d'avancement disponible pour l'instant. L'équipe publiera prochainement une mise à jour." |
| 1 rapport | Timeline avec 1 entrée |
| N rapports | Timeline scrollable avec séparateurs de dates |

---

## Données non affichées

- Rapports en statut `draft`
- Rapports en statut `archived`
- Coûts ou données financières internes

---

## Responsive

| Breakpoint | Comportement |
|---|---|
| Mobile | Timeline 1 colonne, milestones empilés, overflow horizontal des fichiers joints |
| Tablet | Timeline max 640px centrée |
| Desktop | Timeline max 768px centrée, fichiers en grille 2 colonnes |
