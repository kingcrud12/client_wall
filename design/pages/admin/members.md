# Page — Membres & Rôles (Admin)

**Zone** : Admin  
**Route** : `/admin/projects/:projectId/members`  
**Auth** : owner, manager  
**Composants** : `Avatar`, `Badge`, `Button`, `PermissionMatrix`, `Select`, `Sidebar`, `Navbar`

---

## Objectif

Gérer les membres d'un projet, leurs rôles et les permissions associées. Configurer qui peut faire quoi sur les ressources du projet.

---

## Sections

### 1. Header

```
Membres & Rôles — Projet Alpha              [+ Inviter un membre]
```

### 2. Onglets

```
[Membres]  [Rôles]
```

---

## Onglet Membres

### Liste des membres

Tableau avec :

| Avatar + Nom | Email | Zone(s) | Rôle | Statut | Actions |
|---|---|---|---|---|---|
| [M] Marie Martin | marie@agence.fr | Zone Collab | Développeur | Actif | [...] |
| [J] Jean Dupont | jean@client.fr | Zone Client | Client Standard | Actif | [...] |

**Actions (menu contextuel)** :
- Changer de rôle
- Changer de zone
- Retirer du projet
- (Owner only) Révoquer l'accès au workspace

### Filtres

```
[Tous] [Zone Client] [Zone Collaborateurs]  [🔍 Rechercher...]
```

### Inviter un membre

Dialog/modal :
- Email du membre (requis)
- Zone à assigner (select)
- Rôle à assigner (select dynamique selon zone)
- Message personnalisé (optionnel)
- [Envoyer l'invitation]

Si l'email est déjà membre du workspace → assignation directe.
Si non → email d'invitation envoyé.

---

## Onglet Rôles

### Liste des rôles du projet

```
[+ Créer un rôle]

Client Standard     [Modifier] [Dupliquer] [Supprimer]
3 membres assignés
read:invoice, pay:invoice, message_read:message, message_write:message

Développeur         [Modifier] [Dupliquer] [Supprimer]
2 membres assignés
read:document, write:document, add:document, read:message...

Chef de projet      [Modifier] [Dupliquer] [Supprimer]
1 membre assigné
[Toutes les permissions]
```

### Créer / Modifier un rôle

Dialog avec :
1. Nom du rôle (requis)
2. Description (optionnel)
3. `PermissionMatrix` interactive

### Règles de suppression

- Un rôle ne peut être supprimé s'il est assigné à des membres.
- Si suppression tentée : "Ce rôle est assigné à 3 membres. Réassignez-les avant de supprimer."

---

## Règles d'attribution des rôles

- Un membre peut avoir **un seul rôle par projet** (attribution directe).
- Le rôle peut aussi venir de la **zone** (héritage de zone).
- Si conflit entre rôle direct et rôle de zone, la priorité est à définir par l'implémentation (voir doc DB).

---

## États

| État | Affichage |
|---|---|
| 0 membres | "Ce projet n'a pas encore de membres." + [Inviter un membre] |
| 0 rôles | "Créez des rôles pour définir les accès." + [Créer un rôle] |
| Invitation en cours | Badge "En attente" sur la ligne du membre |

---

## Responsive

| Breakpoint | Membres | Rôles |
|---|---|---|
| Mobile | Liste cards avec actions | Cards rôles dépliables |
| Tablet | Tableau simplifié | Cards rôles |
| Desktop | Tableau complet | Liste rôles + détail |
