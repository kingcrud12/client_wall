# Page — Messagerie (Client)

**Zone** : Client  
**Route** : `/client/:projectId/messaging`  
**Auth** : membre zone client (permission `message_read:message`)  
**Écriture** : permission `message_write:message` requise  
**Composants** : `MessageThread`, `Navbar`

---

## Objectif

Permettre au client de communiquer avec l'organisation dans un espace dédié à sa zone. Simple et épuré.

---

## Layout

Identique au composant `MessageThread` adapté pour la zone client :

```
┌──────────────────┬──────────────────────────────────────┐
│  CONVERSATIONS   │  [Thread sélectionné]                 │
│  ─────────────── │  ─────────────────────────────────── │
│ ● Support        │  Support                              │
│   Dernier msg    │  ─────────────────────────────────── │
│                  │  [Avatar] Mon Agence — 10:30          │
│   Bienvenue      │  Bonjour, comment puis-je vous aider?│
│   Dernier msg    │                                       │
│                  │  [Avatar] Vous — 10:35                │
│ + Nouveau sujet  │  Je n'ai pas reçu ma facture.         │
│                  │                                       │
│                  │  ─────────────────────────────────── │
│                  │  [Écrire un message...]  [Envoyer]   │
└──────────────────┴──────────────────────────────────────┘
```

---

## Différences vs messagerie Admin/Collab

1. **Threads limités à la zone client** — le client ne voit pas les threads des zones collaborateurs
2. **Interlocuteurs** — messages échangés avec les managers/membres de l'organisation
3. **Cross-zone** — si `cross_zone_authorization` accordée, un thread peut inclure un collaborateur spécifique
4. **Pas de journal global** — le client n'a pas accès à cette vue

---

## Panneau gauche (liste des conversations)

- Threads de la zone client du projet
- Badge "Nouveau" sur threads non lus
- Heure ou date du dernier message
- Aperçu du dernier message (1 ligne, tronqué)
- Bouton "+ Nouveau sujet" si `message_write:message`

---

## Zone de saisie

- Textarea auto-resize
- Enter → envoie (Shift+Enter pour nouvelle ligne)
- Bouton [Envoyer]
- Masquée / disabled si pas de permission `message_write:message` → message : "Vous n'avez pas la permission d'envoyer des messages."

---

## Messagerie directe avec collaborateur

Si `cross_zone_authorization` accordée entre ce client et un collaborateur spécifique :

Une section supplémentaire dans le panneau gauche :

```
MESSAGES DIRECTS
  [Avatar] Thomas Leblanc (Développeur)
```

Ouvre une conversation 1-to-1 avec ce collaborateur.

Visible uniquement si au moins une autorisation cross-zone existe pour cet utilisateur.

---

## États

| État | Affichage |
|---|---|
| Loading | Skeleton panneau gauche + chat |
| Aucun thread | "Démarrez une conversation avec Mon Agence." + [+ Nouveau sujet] |
| Pas de permission write | Zone saisie grisée + message explicatif |
| Connexion perdue | Alert + "Messages non envoyés. Reconnexion..." |

---

## Responsive

| Breakpoint | Comportement |
|---|---|
| Mobile | Vue unique : liste OU chat (navigation back) |
| Tablet | Split 35% + 65% |
| Desktop | Split fixe 260px + reste |
