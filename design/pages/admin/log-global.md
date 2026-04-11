# Page — Journal global des messages (Admin)

**Zone** : Admin  
**Route** : `/admin/projects/:projectId/log-global`  
**Auth** : owner, manager  
**Composants** : `Avatar`, `Badge`, `Input`, `Select`, `Button`, `Sidebar`, `Navbar`

---

## Objectif

Offrir aux managers une vue transversale de tous les messages échangés dans le projet (zone Collaborateurs + zone Client), pour supervision et traçabilité. Lecture seule — les managers répondent depuis la page Messagerie de chaque zone.

---

## Layout

```
[Sidebar principale]  [Filtres latéraux]  [Liste des messages]
```

---

## Sections

### Header

```
Journal global — Projet Alpha
Tous les messages de ce projet, toutes zones confondues.
```

### Filtres (panneau gauche ou inline selon breakpoint)

```
Zone       : [Toutes ▼]  (Toutes / Collaborateurs / Client)
Auteur     : [Tous ▼]    (select membres du projet)
Période    : [Ce mois ▼] (Aujourd'hui / Cette semaine / Ce mois / Période custom)
Mot-clé    : [🔍 Rechercher dans les messages...]
```

### Liste des messages

Chaque message affiché sous forme de ligne chronologique (du plus récent au plus ancien) :

```
┌──────────────────────────────────────────────────────────────────────┐
│  [M]  Marie Martin        Zone Collab      14 avr. 2025 à 14:32     │
│       "La migration est terminée, je poste les screenshots demain." │
│       [Voir le thread →]                                             │
├──────────────────────────────────────────────────────────────────────┤
│  [J]  Jean Dupont         Zone Client      14 avr. 2025 à 11:05     │
│       "Bonjour, pourriez-vous me confirmer la date de livraison ?"  │
│       [Voir le thread →]                                             │
└──────────────────────────────────────────────────────────────────────┘
```

Chaque item contient :
- Avatar + nom de l'auteur
- Badge de zone (Zone Collab en Sky, Zone Client en Emerald)
- Date et heure
- Extrait du message (max 140 chars, tronqué avec "…")
- Lien "Voir le thread →" → ouvre la page messagerie de la zone concernée avec le thread en focus

### Pagination

```
← Page précédente    Page 2 sur 8    Page suivante →
```

50 messages par page.

---

## Règles métier

- Ce journal est en **lecture seule** : les managers ne peuvent pas répondre depuis cette page.
- Les messages supprimés par leurs auteurs apparaissent comme "[Message supprimé]".
- Les messages des zones sont visibles ici même si un module messagerie est désactivé (traçabilité).
- L'export CSV du journal est disponible uniquement sur le plan Pro.

---

## États

| État | Description |
|---|---|
| Loading | Skeleton de 5 lignes |
| Aucun message | "Aucun message dans ce projet pour le moment." |
| Aucun résultat (filtre) | "Aucun message ne correspond à vos critères." + [Réinitialiser les filtres] |
| Recherche active | Badge "Filtre actif" visible, résultats mis à jour en temps réel (debounce 300ms) |

---

## Responsive

| Breakpoint | Comportement |
|---|---|
| Mobile | Filtres en drawer (bouton [Filtres] en haut), liste pleine largeur |
| Tablet | Filtres en ligne au-dessus de la liste |
| Desktop | Filtres en colonne à gauche (240px), liste à droite |
