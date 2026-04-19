# Page — Messagerie (Admin)

**Zone** : Admin  
**Route** : `/admin/projects/:projectId/messaging`  
**Route journal** : `/admin/projects/:projectId/log-global`  
**Auth** : messaging — tous membres de zone ; log-global — owner/manager uniquement  
**Composants** : `MessageThread`, `Sidebar`, `Navbar`

---

## Objectif

Permettre la communication interne par zone. Le journal global permet aux managers de superviser tous les échanges du projet.

---

## Page Messagerie (`/messaging`)

### Layout

Split-view identique au composant `MessageThread` :

```
┌──────────────────┬─────────────────────────────────────┐
│  ZONES           │  [Thread sélectionné]                │
│  ─────────────── │  ─────────────────────────────────── │
│  Zone Client     │                                      │
│  > Support       │  [Liste messages]                    │
│  > Devis         │                                      │
│                  │                                      │
│  Zone Collabs    │  [Zone de saisie]  [Envoyer]         │
│  > Planning      │                                      │
│  + Nouveau       │                                      │
└──────────────────┴─────────────────────────────────────┘
```

### Sélecteur de zone (panneau gauche)

- Liste des zones du projet en sections dépliables
- Nombre de messages non lus par zone
- Dans chaque zone : liste des threads avec aperçu dernier message
- Bouton "+ Nouveau thread" par zone

### Règles d'accès aux zones

Un manager voit les threads de **toutes les zones** du projet.

### Création de thread

Modal :
- Titre du thread (obligatoire)
- Sélection de la zone (pre-remplie si sélection en cours)

---

## Page Journal Global (`/log-global`)

### Objectif

Vue consolidée **en lecture seule** de tous les messages de toutes les zones du projet. Outil d'audit, de supervision et de conformité.

### Layout

```
[Filtres]

[Timeline de tous les messages]
```

### Filtres

```
[Zone ▼]  [Auteur ▼]  [Thread ▼]  [Période: du - au]
```

### Timeline

Chaque entrée :

```
[Zone Client] [Thread: Support]  Marie Martin — 15 janv. 2025 à 10:30
Bonjour, je n'ai pas reçu la facture du mois dernier.
```

Groupage par jour (séparateur de date entre les groupes).

Messages supprimés affichés comme `[Message supprimé par l'auteur]`.

### Mentions légales

Bandeau en haut de page :
> "Cette vue est réservée aux managers. Elle consolide tous les échanges pour audit et supervision."

---

## États

| État | Affichage |
|---|---|
| Loading | Skeleton threads |
| Aucun thread | "Aucune conversation dans ce projet. Créez le premier thread." |
| Log vide | "Aucun message pour cette période." |

---

## Responsive

| Breakpoint | Messagerie | Journal global |
|---|---|---|
| Mobile | Vue unique (liste threads OU thread ouvert) | Timeline 1 colonne |
| Tablet | Split 1/3 + 2/3 | Timeline + filtres |
| Desktop | Split fixe 280px + reste | Timeline + filtres |
