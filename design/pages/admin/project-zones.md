# Page — Gestion des zones (Admin)

**Zone** : Admin  
**Route** : `/admin/projects/:projectId/zones`  
**Auth** : owner, manager  
**Composants** : `Badge`, `Button`, `Input`, `Select`, `PermissionMatrix`, `Sidebar`, `Navbar`

---

## Objectif

Configurer les zones d'un projet : activer/désactiver chaque zone, définir les droits d'accès par défaut, personnaliser les modules disponibles.

---

## Layout

```
[Sidebar principale]  [Contenu]

En-tête : Zones — Projet Alpha
[Zone Collaborateurs]  [Zone Client]  ← onglets
```

---

## En-tête de page

```
Zones — Projet Alpha                     [+ Créer une zone personnalisée (pro)]
```

Note : la création de zone personnalisée est réservée au plan Pro. Pour les plans inférieurs, le bouton est affiché mais désactivé avec un tooltip "Disponible sur le plan Pro".

---

## Onglet — Zone Collaborateurs

### Statut et activation

```
Zone Collaborateurs                       [Activée ✓]
Espace de travail de l'équipe interne. Timesheets, rapports, documents, messagerie.
```

Toggle pour activer/désactiver la zone. Si désactivée :
- Les membres de la zone perdent l'accès immédiatement
- Les données (timesheets, rapports) sont conservées
- Un dialog de confirmation s'affiche : "Désactiver la zone Collaborateurs rendra l'accès inaccessible à X membres."

### Modules disponibles

Liste des modules activables indépendamment :

| Module | Actif | Description |
|---|---|---|
| Timesheets | ✓ | Saisie et validation des feuilles de temps |
| Rapports d'avancement | ✓ | Création et publication de rapports |
| Documents | ✓ | Dépôt et consultation de fichiers |
| Messagerie | ✓ | Fil de messages zone |

### Rôles par défaut

Liste des rôles disponibles pour cette zone avec option de définir un rôle par défaut à l'invitation :

```
Rôle par défaut à l'invitation : [Développeur ▼]
```

Lien : "Gérer les rôles" → `/admin/projects/:id/members` (onglet Rôles)

---

## Onglet — Zone Client

### Statut et activation

```
Zone Client                               [Activée ✓]
Espace dédié au client externe. Contrat, factures, progression, fichiers, messagerie.
```

Même logique de toggle que la zone Collaborateurs.

### Modules disponibles

| Module | Actif | Description |
|---|---|---|
| Contrat | ✓ | Affichage et signature du contrat |
| Factures | ✓ | Consultation et paiement des factures |
| Rapports d'avancement | ✓ | Consultation des rapports publiés |
| Fichiers partagés | ✓ | Accès aux fichiers et upload client |
| Messagerie | ✓ | Fil de messages client |

### Personnalisation de l'accueil client

```
Message de bienvenue (optionnel)
[Textarea — ex : "Bienvenue sur votre espace projet. Retrouvez ici tous vos documents..."]

Logo à afficher dans la zone client
[FileUploader — SVG ou PNG, max 1 Mo]
```

### Rôle par défaut

```
Rôle par défaut à l'invitation : [Client Standard ▼]
```

### Lien d'accès client

```
Lien d'accès direct à la zone client :
https://app.clientwall.io/client/:projectId/     [Copier]
```

Ce lien peut être partagé directement avec le client. L'accès nécessite tout de même une authentification.

---

## Règles métier

- Une zone désactivée conserve toutes les données.
- Désactiver un module ne supprime pas les données liées.
- La zone Client ne peut pas accéder à la zone Collaborateurs ni à la zone Admin.
- Au moins une zone doit rester active par projet.

---

## États

| État | Description |
|---|---|
| Loading | Skeleton des sections |
| Zone désactivée | Card en grisé, toggle en état OFF |
| Aucun module actif | Alert warning : "Aucun module actif. Les membres n'auront rien à consulter." |

---

## Responsive

| Breakpoint | Comportement |
|---|---|
| Mobile | Onglets en tabs scrollables, formulaires 1 colonne |
| Tablet | Même structure, max-width 640px |
| Desktop | Contenu max-width 768px |
