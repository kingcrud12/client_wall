# Page — Créer un projet (Admin)

**Zone** : Admin  
**Route** : `/admin/projects/new`  
**Auth** : owner, manager  
**Composants** : `Input`, `Select`, `Button`, `FileUploader`, `Sidebar`, `Navbar`

---

## Objectif

Créer un nouveau projet dans le workspace. L'utilisateur renseigne les informations de base, configure les zones initiales et peut inviter des membres directement à la création.

---

## Layout

Page formulaire multi-étapes (stepper) ou formulaire unique scrollable.

```
[Sidebar principale]  [Contenu — Formulaire]

Étape 1 : Informations du projet
Étape 2 : Configuration des zones
Étape 3 : Inviter des membres (optionnel)
```

Barre de progression en haut du formulaire :

```
① Informations  ——  ② Zones  ——  ③ Membres
```

---

## Étape 1 — Informations du projet

### Champs

| Champ | Type | Validation | Description |
|---|---|---|---|
| Nom du projet | `input[text]` | Requis, max 80 chars | Ex : "Refonte site web Dupont" |
| Description | `textarea` | Optionnel, max 500 chars | Résumé de la mission |
| Client (nom) | `input[text]` | Optionnel | Nom de l'entreprise cliente |
| Date de début | `input[date]` | Optionnel | Défaut : aujourd'hui |
| Date de fin prévue | `input[date]` | Optionnel, > date début | — |
| Couleur / icône | Sélecteur couleur | Optionnel | Pour distinguer les projets dans les listes |

### Actions

- [Continuer] → Étape 2 (valide les champs requis)
- [Annuler] → `/admin/projects/`

---

## Étape 2 — Configuration des zones

Explication contextuelle :

> "Un projet contient deux zones : la zone Collaborateurs (équipe interne) et la zone Client (accès externe). Vous pouvez activer chaque zone indépendamment."

```
┌────────────────────────────────────────────────────────┐
│  Zone Collaborateurs                    [Activée ✓]    │
│  Accès à l'équipe interne, timesheets,                 │
│  rapports d'avancement, documents.                     │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│  Zone Client                            [Activée ✓]    │
│  Accès externe : contrat, factures,                    │
│  avancement, fichiers, messagerie.                     │
└────────────────────────────────────────────────────────┘
```

Les deux zones sont activées par défaut. Un toggle permet de désactiver chaque zone (désactiver la zone client masque toutes les options liées).

### Actions

- [← Retour]
- [Continuer] → Étape 3

---

## Étape 3 — Inviter des membres (optionnel)

Section optionnelle. Un lien "Passer cette étape" est affiché.

```
Inviter des membres à ce projet

[Email]    [Zone ▼]    [Rôle ▼]    [+ Ajouter]

jean@agence.fr     Zone Collab    Développeur     [×]
marie@client.fr    Zone Client    Client Standard  [×]

[← Retour]    [Créer le projet]
```

Comportement :
- Les membres ajoutés ici reçoivent une invitation par email à la création
- Si l'email est déjà dans le workspace, l'assignation est directe

### Actions

- [Passer cette étape] → crée le projet sans membres
- [← Retour]
- [Créer le projet] (`Button primary`) → crée le projet + envoie les invitations

---

## Logique

1. POST `/api/projects` avec les infos de base
2. Les zones sont créées automatiquement selon la configuration de l'étape 2
3. POST `/api/projects/:id/members` pour chaque invitation de l'étape 3
4. Redirect vers `/admin/projects/:id/` (vue générale du nouveau projet)
5. Toast succès : "Projet créé avec succès."

---

## États

| État | Description |
|---|---|
| Création en cours | Bouton "Créer le projet" en `loading`, formulaire désactivé |
| Erreur de validation | Messages inline sous les champs concernés |
| Erreur réseau | Alert `error` au-dessus du bouton |

---

## Responsive

| Breakpoint | Comportement |
|---|---|
| Mobile | Stepper en liste numérotée, formulaire 1 colonne |
| Tablet | Stepper horizontal, formulaire 1 colonne max-width 560px |
| Desktop | Stepper horizontal, formulaire max-width 640px centré |
