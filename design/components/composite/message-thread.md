# Composant — MessageThread

**Catégorie** : Composite  
**Fichier cible** : `src/components/composite/MessageThread.tsx`

---

## Description

Interface de messagerie dans une zone. Composé de deux parties : la liste des threads (panneau gauche) et le détail du thread sélectionné (panneau droit). Sur mobile, navigation entre les deux vues.

---

## Structure

```
┌─────────────────┬──────────────────────────────────┐
│   THREADS       │  [Thread sélectionné]             │
│   ─────────     │  ──────────────────────────────── │
│ ● Support       │  Support client                   │
│   Dernier msg   │  ────────────────────────────────│
│                 │  [Avatar] Marie — 10:30           │
│   Facturation   │  Bonjour, je n'ai pas reçu        │
│   Dernier msg   │  la facture du mois dernier.      │
│                 │                                   │
│ + Nouveau       │  [Avatar] Vous — 10:35            │
│   thread        │  Je vous l'envoie de suite.       │
│                 │                                   │
│                 │  ──────────────────────────────── │
│                 │  [Zone de saisie...]   [Envoyer]  │
└─────────────────┴──────────────────────────────────┘
```

---

## Sous-composants

### ThreadList (panneau gauche)

- Liste des threads de la zone
- Chaque item : titre du thread, aperçu du dernier message, date relative, badge non lus
- Bouton "+ Nouveau thread" en haut ou en bas de la liste
- Thread actif : fond `--color-bg-subtle`, bordure gauche primary

### ThreadView (panneau droit)

- Header : titre du thread, nombre de participants
- Scrollable, messages chronologiques du plus ancien au plus récent
- Scroll automatique vers le bas à l'ouverture et à la réception d'un message

### MessageBubble

- Messages de l'utilisateur courant : alignés à droite, fond primary light
- Messages des autres : alignés à gauche, fond `--color-bg-subtle`
- Affichage : Avatar (pour les messages des autres), nom, contenu, heure
- Messages supprimés (soft delete) : texte grisé "Message supprimé" en italique
- Action sur hover : bouton supprimer (si auteur du message)

### MessageInput

- Textarea auto-resize (min 1 ligne, max 5 lignes)
- Bouton envoyer
- Raccourci : Enter envoie, Shift+Enter nouvelle ligne
- Disabled si zone fermée ou permission `message_write` absente

---

## Props

| Prop | Type | Description |
|---|---|---|
| `zoneId` | `string` | UUID de la zone |
| `threads` | `Thread[]` | Liste des threads |
| `selectedThreadId` | `string \| null` | Thread actif |
| `messages` | `Message[]` | Messages du thread actif |
| `currentUserId` | `string` | Pour identifier les messages propres |
| `canWrite` | `boolean` | Permission `message_write` |
| `onThreadSelect` | `(id: string) => void` | Sélectionner un thread |
| `onNewThread` | `() => void` | Créer un thread |
| `onSendMessage` | `(content: string) => void` | Envoyer un message |
| `onDeleteMessage` | `(id: string) => void` | Supprimer un message |

---

## Responsive

| Breakpoint | Layout |
|---|---|
| Mobile (`< 768px`) | Vue unique : liste OU thread (navigation back) |
| Tablet (`768px+`) | Layout 2 colonnes 1/3 + 2/3 |
| Desktop | Layout 2 colonnes 280px fixe + reste |

---

## Accessibilité

- `role="log"` sur la liste des messages avec `aria-live="polite"`
- `aria-label="Conversation : Support client"` sur le ThreadView
- Le textarea : `aria-label="Écrire un message"`
- Les messages supprimés : `aria-label="Message supprimé par l'auteur"`
