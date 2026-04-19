# Page — Login

**Zone** : Auth  
**Route** : `/auth/login`  
**Auth** : Aucune (redirection si déjà connecté vers `/admin/`)

---

## Objectif

Permettre à un utilisateur existant de se connecter à son compte Client Wall. Point d'entrée unique pour toutes les zones (Admin, Collaborateurs, Client) — la redirection post-login est déterminée par le rôle.

---

## Layout

Écran divisé en deux panneaux (desktop) :

```
┌────────────────────┬──────────────────────────────────┐
│                    │                                   │
│   Illustration     │   Logo Client Wall                │
│   ou               │                                   │
│   brand visual     │   Connexion à votre espace        │
│                    │                                   │
│   Quote ou tagline │   [Email]                         │
│                    │   [Mot de passe]                  │
│                    │   [Se souvenir de moi]            │
│                    │                                   │
│                    │   [Se connecter]                  │
│                    │                                   │
│                    │   Mot de passe oublié ?           │
│                    │                                   │
│                    │   Pas encore de compte ?          │
│                    │   Créer un compte                 │
└────────────────────┴──────────────────────────────────┘
```

**Mobile** : Panneau gauche masqué, formulaire pleine largeur avec logo en haut.

---

## Sections

### Header

- Logo Client Wall (SVG, 32px hauteur)
- Titre : "Connexion à votre espace"
- Sous-titre : "Entrez vos identifiants pour accéder à votre tableau de bord."

### Formulaire

| Champ | Type | Validation | Placeholder |
|---|---|---|---|
| Email | `input[email]` | Requis, format email | `vous@entreprise.com` |
| Mot de passe | `input[password]` | Requis, min 8 chars | `••••••••` |
| Se souvenir de moi | `checkbox` | — | — |

### Actions

- **Bouton principal** : "Se connecter" (`Button` variant `primary`, full-width)
- **Lien** : "Mot de passe oublié ?" → `/auth/forgot-password`

### Footer formulaire

- Texte : "Pas encore de compte ?"
- Lien : "Créer un compte" → `/auth/register`

---

## Logique

### Soumission

1. Validation front (email valide, mot de passe non vide)
2. POST `/api/auth/login` → JWT token
3. Stockage du token (localStorage ou httpOnly cookie selon impl.)
4. Redirection :
   - Si owner/manager → `/admin/`
   - Si member collaborateur → `/collab/`
   - Si client → `/client/:projectId/` (premier projet assigné)

### Erreurs

| Erreur | Message affiché |
|---|---|
| Email/MDP incorrects | "Email ou mot de passe incorrect." |
| Compte désactivé | "Ce compte a été désactivé. Contactez votre administrateur." |
| Erreur réseau | "Impossible de se connecter. Vérifiez votre connexion." |
| Trop de tentatives | "Trop de tentatives. Réessayez dans 5 minutes." |

Les erreurs s'affichent sous le bouton, dans un composant Alert `error`.

---

## États

| État | Description |
|---|---|
| Default | Formulaire vide |
| Loading | Bouton en `loading`, spinner, formulaire désactivé |
| Erreur | Alert sous le formulaire |
| Success | Redirect immédiat (pas de message) |

---

## Responsive

| Breakpoint | Layout |
|---|---|
| Mobile | 1 colonne, logo en haut, padding 24px |
| Tablet | 1 colonne centrée (max 400px) |
| Desktop | 2 colonnes 50/50 |

---

## Accessibilité

- `<main>` avec `aria-label="Formulaire de connexion"`
- Focus sur le champ email à l'arrivée sur la page
- Erreurs annoncées via `aria-live="polite"`
- `autocomplete="email"` et `autocomplete="current-password"` sur les champs
