# Page — Paramètres du projet (Admin)

**Zone** : Admin  
**Route** : `/admin/projects/:projectId/settings`  
**Auth** : owner, manager (danger zone : owner uniquement)  
**Composants** : `Input`, `Select`, `Button`, `FileUploader`, `Sidebar`, `Navbar`

---

## Objectif

Modifier les informations et la configuration d'un projet existant. Archiver ou supprimer le projet.

---

## Layout

Page en sections avec navigation par ancre (sidebar secondaire) :

```
[Sidebar principale]  [Nav secondaire]  [Contenu]

Informations générales
Dates & planning
Danger zone
```

---

## Section — Informations générales

| Champ | Type | Validation | Description |
|---|---|---|---|
| Nom du projet | `input[text]` | Requis, max 80 chars | — |
| Description | `textarea` | Optionnel, max 500 chars | — |
| Client (nom) | `input[text]` | Optionnel | Nom de l'entreprise cliente |
| Couleur / icône | Sélecteur couleur | Optionnel | Identifiant visuel dans les listes |

Action : [Sauvegarder] — toast succès "Modifications enregistrées."

---

## Section — Dates & planning

| Champ | Type | Description |
|---|---|---|
| Date de début | `input[date]` | Modifiable rétroactivement |
| Date de fin prévue | `input[date]` | Peut être dans le passé (projet terminé) |
| Statut du projet | `select` | Actif, En pause, Terminé, Archivé |

Action : [Sauvegarder]

---

## Section — Danger zone

Visible pour l'**owner** uniquement.

```
┌─────────────────────────────────────────────────────┐
│ ⚠ Zone Dangereuse                                   │
│                                                      │
│ Archiver le projet                                   │
│ Le projet sera masqué des listes actives mais toutes │
│ les données seront conservées. Réactivable à tout    │
│ moment.                                              │
│ [Archiver le projet]  (Button secondary)            │
│                                                      │
│ Supprimer le projet                                  │
│ Cette action est irréversible. Tous les membres,    │
│ documents, factures et messages seront définitive-  │
│ ment supprimés.                                     │
│ [Supprimer le projet]  (Button danger)              │
└─────────────────────────────────────────────────────┘
```

### Dialog d'archivage

- Titre : "Archiver le projet ?"
- Corps : "Le projet sera masqué mais conservé. Vous pouvez le réactiver depuis la liste des projets archivés."
- Actions : [Archiver] / [Annuler]

### Dialog de suppression

- Titre : "Supprimer le projet ?"
- Corps : liste des données qui seront supprimées (membres, documents, factures, messages)
- Champ de confirmation : "Tapez le nom du projet pour confirmer : **[nom]**"
- Actions : [Supprimer définitivement] (danger, activé seulement si le nom est correct) / [Annuler]

---

## Règles métier

- Un projet archivé n'est plus visible dans le dashboard ni les listes actives.
- Les clients ayant accès à un projet archivé perdent leur accès immédiatement.
- La suppression est irréversible et déclenche la suppression des fichiers S3 associés.
- Seul l'owner peut archiver ou supprimer un projet.

---

## États

| État | Description |
|---|---|
| Loading | Skeleton des formulaires |
| Sauvegarde | Boutons en `loading`, toast succès |
| Erreur validation | Messages inline sous les champs |
| Projet archivé | Badge "Archivé" dans le header, champs en lecture seule |

---

## Responsive

Page en colonne unique sur mobile et tablet. Desktop : contenu max 768px centré.
