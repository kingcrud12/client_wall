# Page — Avancement (Client)

**Zone** : Client  
**Route** : `/client/:projectId/progress`  
**Auth** : membre zone client (permission `read:progress_report`)  
**Composants** : `ProgressBar`, `Badge`, `Button`, `Navbar`

---

## Objectif

Permettre au client de suivre l'avancement du projet via les rapports publiés par l'organisation. Vue chronologique, lecture seule, claire et rassurante. Le client doit pouvoir comprendre l'état du projet en moins de 30 secondes.

---

## Layout

```
[Topbar]
┌─────────────────────────────────────────────────────┐
│  En-tête + progression globale                      │
├─────────────────────────────────────────────────────┤
│  Fil de rapports (scroll vertical)                  │
│  Chaque rapport :                                   │
│    - Date + label                                   │
│    - Barre de progression                           │
│    - Milestones                                     │
│    - Description + prochaines étapes                │
│    - Fichiers joints                                │
└─────────────────────────────────────────────────────┘
```

Contenu centré, max-width 768px.

---

## Sections

### 1. Header de page

```
Avancement du projet — Projet Alpha
```

### 2. Progression globale (sticky sous le header)

Toujours visible en haut de la page pendant le scroll, basée sur le dernier rapport publié :

```
Avancement global
████████████████████░░░░  78%
D'après le rapport du 22 janv. 2025
```

Couleur de la barre progressive selon le pourcentage :
- 0–33% : `--color-error-500`
- 34–66% : `--color-warning-500`
- 67–99% : `--color-info-500`
- 100% : `--color-success-500`

### 3. Fil chronologique des rapports

Ordre : du plus récent au plus ancien. Chaque rapport est une carte :

```
────── 22 janvier 2025 ───────────────────────────────────────

┌──────────────────────────────────────────────────────────┐
│  Janvier 2025 — Semaine 3                      [PUBLIÉ]  │
│                                                          │
│  Avancement global : ██████████████████░░░░  78%         │
│                                                          │
│  Milestones                                              │
│  ✓  Phase design                          Terminé        │
│  ✓  Développement backend                 Terminé        │
│  ●  Développement frontend                En cours       │
│  ○  Tests & recette                       À faire        │
│  ○  Mise en production                    À faire        │
│                                                          │
│  Ce qui a été accompli                                   │
│  La phase backend est désormais complète. Toutes les     │
│  API sont testées et documentées. Le développement       │
│  frontend a démarré avec les maquettes validées.         │
│                                                          │
│  Prochaines étapes                                       │
│  Finalisation des composants UI (semaine 4).             │
│  Revue de code prévue le 31 janvier.                     │
│                                                          │
│  Fichiers joints (2)                                     │
│  📸 screenshot-dashboard-v2.png    [Prévisualiser]       │
│  📄 planning-fevrier.pdf           [Télécharger]         │
└──────────────────────────────────────────────────────────┘
```

### 4. Milestones — détail visuel

| Statut | Icône | Couleur token | Label |
|---|---|---|---|
| `done` | CheckCircle | `--color-success-500` | Terminé |
| `in_progress` | CircleDashed | `--color-info-500` | En cours |
| `todo` | Circle | `--color-neutral-300` | À faire |

Au survol d'un milestone : tooltip avec la date de mise à jour (si disponible).

### 5. Fichiers joints aux rapports

Chaque fichier joint dans un rapport est affichable selon son type :

| Type | Action |
|---|---|
| Image (PNG, JPG, GIF, WEBP) | [Prévisualiser] — ouvre une lightbox |
| PDF | [Prévisualiser] — ouvre une modal avec iframe |
| Autre (DOCX, XLSX, ZIP...) | [Télécharger] uniquement |

**Lightbox image** :
- Overlay foncé plein écran
- Image centrée, zoomable
- Flèches si plusieurs images dans le même rapport
- Fermeture par clic extérieur ou touche Echap

### 6. Navigation rapide entre rapports (desktop)

Si 3 rapports ou plus, afficher une mini-navigation d'ancrage à droite de la page (position sticky) :

```
Sur cette page
● Semaine 3 (janv.)
○ Semaine 2 (janv.)
○ Semaine 1 (janv.)
○ Décembre 2024 — Bilan
```

Clic → scroll smooth vers le rapport correspondant.

---

## États

| État | Affichage |
|---|---|
| Loading | Skeleton progression + skeleton 2 rapports |
| Aucun rapport publié | Illustration + "Aucun rapport disponible pour l'instant. L'équipe publiera prochainement une mise à jour de l'avancement." |
| 1 seul rapport | Card unique, sans navigation d'ancrage |
| N rapports | Fil complet + navigation d'ancrage (desktop ≥ 3) |
| Rapport avec fichiers | Section fichiers joints visible |
| Rapport sans fichiers | Section fichiers absente (pas de ligne vide) |

---

## Données non affichées

- Rapports en statut `draft` (brouillons)
- Rapports en statut `archived`
- Données financières ou de coût
- Identité des collaborateurs ayant rédigé le rapport (seulement le nom de l'organisation est visible)

---

## Responsive

| Breakpoint | Comportement |
|---|---|
| Mobile | Fil pleine largeur, lightbox fullscreen, milestones empilés, fichiers en liste verticale |
| Tablet | Fil max-width 640px centré, sans navigation d'ancrage |
| Desktop | Fil max-width 768px centré + navigation d'ancrage en sticky (200px à droite) |
