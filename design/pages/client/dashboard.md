# Page — Dashboard Client

**Zone** : Client  
**Route** : `/client/:projectId/`  
**Auth** : membre d'une zone client du projet  
**Composants** : `ProgressBar`, `Badge`, `Button`, `Avatar`, `Navbar`

---

## Objectif

Vue d'accueil du client. Donne une vision claire et rassurante de l'état du projet : avancement, actions en attente (signature, paiement), dernières communications. L'interface s'efface derrière l'information — pas de complexité inutile.

---

## Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ [Logo workspace]  Projet Alpha  [Aperçu Contrat Factures         │
│                                  Avancement Fichiers Messages]   │
│                                                 [🔔] [Profil ▾]  │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│   [Contenu — max 1024px centré, padding 24px]                   │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

Pas de sidebar. Navigation horizontale dans la topbar uniquement.

---

## Topbar — Spécification détaillée

### Éléments de gauche

- **Logo** du workspace (défini dans `/admin/projects/:id/zones`) — fallback sur initiales si absent
- **Nom du projet** — lien vers `/client/:projectId/`

### Navigation centrale (liens)

| Label | Route | Badge |
|---|---|---|
| Aperçu | `/client/:projectId/` | — |
| Contrat | `/client/:projectId/contract` | • si statut `pending` |
| Factures | `/client/:projectId/invoices/` | N si factures `issued` ou `overdue` |
| Avancement | `/client/:projectId/progress` | • si nouveau rapport depuis dernière visite |
| Fichiers | `/client/:projectId/files` | N si nouveaux fichiers |
| Messages | `/client/:projectId/messaging` | N messages non lus |

Les badges numériques `N` utilisent le composant `Badge` variant `error` (petit, superposé à droite du lien).

### Éléments de droite

- **Cloche 🔔** — ouvre un panneau de notifications (voir section ci-dessous)
- **Avatar + prénom** — menu déroulant : Mon profil / Se déconnecter

### Mobile (< 768px)

La navigation centrale disparaît. Un bouton hamburger ouvre un drawer pleine hauteur contenant :
- Les liens de navigation dans l'ordre
- Les badges de notification
- Séparateur
- Mon profil / Se déconnecter

---

## Panneau de notifications (cloche)

Drawer ou popover depuis la topbar. Titre : "Notifications".

| Type | Exemple | Action au clic |
|---|---|---|
| Nouveau rapport | "L'équipe a publié un rapport d'avancement" | → `/progress` |
| Facture émise | "Nouvelle facture : 2 016,00 €" | → `/invoices/:id` |
| Facture en retard | "Facture #2024-0039 est en retard" | → `/invoices/:id` |
| Nouveau message | "Mon Agence vous a envoyé un message" | → `/messaging` |
| Nouveau fichier | "3 fichiers ont été partagés" | → `/files` |
| Contrat à signer | "Un contrat attend votre signature" | → `/contract` |

- Notifications triées du plus récent au plus ancien
- Clic sur une notification → marque comme lue + redirect
- Bouton "Tout marquer comme lu"
- État vide : "Aucune notification pour l'instant."

---

## Sections de la page

### 1. En-tête projet

```
Projet Alpha
Refonte site e-commerce

Prestataire : Mon Agence SAS  ·  Démarré le 15 janv. 2025  ·  Fin prévue : 30 juin 2025
```

Affiché sous la topbar. Pas de menu ou d'actions — information uniquement.

### 2. Alerte prioritaire (conditionnelle)

Affiché uniquement s'il y a une action urgente. **Une seule alerte à la fois**, par ordre de priorité :

| Priorité | Condition | Message | CTA |
|---|---|---|---|
| 1 | Contrat `pending` | "Votre contrat attend votre signature." | [Signer le contrat] |
| 2 | Facture `overdue` | "Une facture est en retard : X €" | [Payer maintenant] |
| 3 | Facture `issued` | "Vous avez X facture(s) à régler." | [Voir les factures] |

Composant Alert variant `warning` (priorité 1 et 2) ou `info` (priorité 3).

### 3. Barre de progression globale

Visible uniquement si au moins un rapport a été publié.

```
Avancement du projet
████████████████████░░░░  78%
D'après le rapport "Janvier 2025 — Semaine 3" · Publié le 22 janv. 2025
[Voir le rapport complet →]
```

Lien "Voir le rapport complet" → `/client/:projectId/progress`.

### 4. Cards de résumé

Grille de 4 cards cliquables :

```
┌──────────────────┬──────────────────┬──────────────────┬──────────────────┐
│  Contrat         │  Factures        │  Fichiers        │  Messages        │
│                  │                  │                  │                  │
│  ✓ Signé         │  1 à payer       │  5 documents     │  2 non lus       │
│                  │  900,00 €        │  Nouveau         │                  │
│  → Voir          │  → Payer         │  → Voir          │  → Répondre      │
└──────────────────┴──────────────────┴──────────────────┴──────────────────┘
```

Comportement des cards :

| Card | Cliquable vers | État vide |
|---|---|---|
| Contrat | `/contract` | "Pas encore de contrat" |
| Factures | `/invoices/` | "Aucune facture" |
| Fichiers | `/files` | "Aucun fichier partagé" |
| Messages | `/messaging` | "Aucun message" |

La card Contrat est en `warning` si `pending`, en `success` si `signed`.  
La card Factures est en `error` si `overdue`, en `warning` si `issued`.

### 5. Dernier rapport d'avancement

Aperçu condensé du rapport le plus récent :

```
Dernière mise à jour — 22 janv. 2025
Janvier 2025, Semaine 3

Avancement : ████████████████████░░░░  78%

  ✓  Phase design              Terminé
  ✓  Développement backend     Terminé
  ●  Développement frontend    En cours
  ○  Tests & recette           À faire

[Voir tous les rapports →]
```

Masqué si aucun rapport publié (un message d'absence s'affiche à la place).

---

## Premier accès (onboarding client)

Si `first_login = true` pour cet utilisateur dans cette zone, afficher un banner d'accueil en haut du contenu (sous la topbar), **avant** les autres sections :

```
┌──────────────────────────────────────────────────────────┐
│  Bienvenue dans votre espace client                      │
│                                                          │
│  Mon Agence SAS vous a invité à collaborer sur le        │
│  projet Alpha. Cet espace vous permet de suivre         │
│  l'avancement, consulter vos documents et               │
│  communiquer avec l'équipe.                              │
│                                                          │
│  [Consulter le contrat]  [Voir les factures]  [Ignorer] │
└──────────────────────────────────────────────────────────┘
```

Le banner est fermable ([Ignorer]) et ne réapparaît plus. `first_login` passe à `false` à la fermeture.

---

## États

| État | Affichage |
|---|---|
| Loading | Skeleton : alerte + barre progression + 4 cards + rapport |
| Projet sans contrat, sans facture, sans rapport | Cards vides, pas d'alerte, pas de progression |
| Contrat en attente | Alert warning + card contrat en warning |
| Facture en retard | Alert warning + card factures en error |
| Modules désactivés | Card correspondante masquée (ex : contrat désactivé → card masquée) |

---

## Responsive

| Breakpoint | KPI Cards | Rapport |
|---|---|---|
| Mobile | 2×2 (grille), topbar hamburger | Milestones empilés |
| Tablet | 4 colonnes, navigation topbar scrollable | Rapport max-width 640px |
| Desktop | 4 colonnes | Rapport max-width 768px |
