# Page — Messagerie (Client)

**Zone** : Client  
**Route** : `/client/:projectId/messaging`  
**Auth** : membre zone client (permission `message_read:message`)  
**Écriture** : permission `message_write:message` requise  
**Composants** : `MessageThread`, `Avatar`, `Badge`, `Button`, `Input`, `Navbar`

---

## Objectif

Offrir au client un espace de communication direct et simple avec l'organisation. Conversations organisées par sujet, pièces jointes supportées. Interface épurée — le client n'a accès qu'à ses propres threads.

---

## Layout

```
[Topbar]
┌──────────────────────┬─────────────────────────────────────────┐
│  Conversations       │  [Thread actif]                          │
│  ──────────────────  │  ──────────────────────────────────────  │
│  ● Support projet    │  Support projet                          │
│    2 nouveaux msgs   │  ──────────────────────────────────────  │
│                      │  [Messages]                              │
│    Bienvenue         │                                          │
│    Vu                │                                          │
│                      │  ──────────────────────────────────────  │
│  ─────────────────── │  [Zone de saisie]                        │
│  MESSAGES DIRECTS    │                                          │
│  [M] Marie Martin    │                                          │
│                      │                                          │
│  [+ Nouveau sujet]   │                                          │
└──────────────────────┴─────────────────────────────────────────┘
```

---

## Panneau gauche — Liste des conversations

### Threads de la zone client

Chaque item de la liste :

```
┌──────────────────────────────────────────────────────┐
│  ●  Support projet                    Hier, 14:32   │
│     Mon Agence : "Voici les maquettes finales..."   │
│                                         [2 nouveaux] │
├──────────────────────────────────────────────────────┤
│     Bienvenue sur votre espace           2 janv.    │
│     Mon Agence : "Bonjour ! Votre espace..."        │
└──────────────────────────────────────────────────────┘
```

- Point bleu `●` = thread avec messages non lus
- Badge numérique "N nouveaux" si plusieurs messages non lus
- Aperçu du dernier message (1 ligne, tronqué, avec nom de l'expéditeur)
- Threads triés du plus récent au plus ancien

### Messages directs (cross-zone)

Affichés uniquement si une `cross_zone_authorization` existe entre cet utilisateur et un collaborateur spécifique :

```
MESSAGES DIRECTS
──────────────────
[M]  Marie Martin     (Développeuse)
```

Ouvre une conversation 1-to-1 avec ce collaborateur.

### Bouton nouveau sujet

```
[+ Nouveau sujet]
```

Visible si `message_write:message`. Ouvre un dialog :

```
Nouveau sujet de discussion

Titre du sujet (requis)
[Ex : Question sur la livraison...]

Message initial (optionnel)
[Textarea]

[Créer la conversation]   [Annuler]
```

---

## Zone de messages (panneau droit)

### En-tête du thread

```
Support projet
[Participants : Mon Agence SAS, Jean Dupont]
```

### Fil de messages

```
────── Hier ─────────────────────────────────────────

  Mon Agence SAS                              14:32
  Bonjour Jean, voici les maquettes validées.

  📎 maquettes-v3.zip    15,2 MB    [Télécharger]
  🖼 capture-home.png              [Prévisualiser]

  ────────────────────────────────────────────────

                           Vous (Jean Dupont)  14:45
              Merci, je vais regarder ça ce soir.
                                           ✓✓ Lu

────── Aujourd'hui ──────────────────────────────────

  Mon Agence SAS                              09:15
  Avez-vous des retours ?

                                                 Lu
```

#### Bulles de message

- Messages de l'organisation : alignés à gauche, fond `--color-bg-subtle`
- Messages du client : alignés à droite, fond `--color-primary-100`
- Nom de l'expéditeur affiché sur le premier message d'une séquence, masqué si même expéditeur
- Heure affichée sous chaque message

#### Indicateurs de lecture

| Indicateur | Signification |
|---|---|
| ✓ (1 coche) | Message envoyé |
| ✓✓ (2 coches grises) | Message délivré |
| ✓✓ (2 coches bleues) | Message lu |

Visibles uniquement sur les messages envoyés par le client.

#### Pièces jointes dans les messages

| Type | Rendu |
|---|---|
| Image | Miniature inline (max 240px) + bouton [Prévisualiser] |
| PDF | Chip avec icône, nom, taille + bouton [Télécharger] |
| Autre fichier | Chip avec icône, nom, taille + bouton [Télécharger] |

Clic sur une miniature image → lightbox (même comportement que la page Fichiers).

#### Indicateur de frappe

```
Mon Agence est en train d'écrire...
```

Affiché en bas du fil quand l'interlocuteur rédige un message (WebSocket).

---

## Zone de saisie

```
┌──────────────────────────────────────────────────────────────────┐
│  [📎]   Votre message...                            [Envoyer →]  │
└──────────────────────────────────────────────────────────────────┘
```

- Textarea auto-resize (max 5 lignes avant scroll interne)
- **Enter** → envoie le message
- **Shift+Enter** → nouvelle ligne
- **Bouton 📎** → ouvre le sélecteur de fichiers (voir ci-dessous)
- Bouton [Envoyer] désactivé si textarea vide et aucun fichier en attente

### Envoi de pièces jointes

Clic sur 📎 → sélecteur de fichiers (natif ou custom) :
- Fichiers sélectionnés affichés en chips au-dessus de la zone de saisie
- Chaque chip : icône + nom + taille + bouton ✕ pour retirer
- Upload simultané avec le message à l'envoi
- Taille max : 20 Mo par fichier
- Formats : tous

```
[📄 brief-v2.docx  1,2 MB  ✕]   [🖼 logo.png  3,4 MB  ✕]

[📎]   Voici les fichiers demandés.                [Envoyer →]
```

### Comportement si `message_write:message` absent

Zone de saisie masquée. À la place :

```
Vous n'avez pas la permission d'envoyer des messages dans cet espace.
Contactez l'équipe si vous pensez qu'il s'agit d'une erreur.
```

---

## États

| État | Affichage |
|---|---|
| Loading | Skeleton panneau gauche + skeleton fil de messages |
| Aucun thread | "Démarrez une conversation avec [Nom workspace]." + [+ Nouveau sujet] |
| Thread sélectionné — chargement | Skeleton bulles de messages |
| Thread sélectionné — vide | "Démarrez cette conversation." |
| Connexion perdue | Banner : "Connexion perdue. Les messages non envoyés seront renvoyés automatiquement." |
| Message en cours d'envoi | Bulle grisée + spinner dans la bulle |
| Erreur d'envoi | Bulle avec icône ⚠ + lien "Réessayer" |

---

## Responsive

| Breakpoint | Comportement |
|---|---|
| Mobile | Vue unique : liste OU messages (navigation retour via bouton ←) |
| Tablet | Split 35% liste + 65% messages |
| Desktop | Split fixe 280px liste + reste messages |

**Sur mobile**, quand un thread est ouvert :
- La topbar affiche un bouton ← pour revenir à la liste
- Le titre du thread remplace le titre de la page dans la topbar
