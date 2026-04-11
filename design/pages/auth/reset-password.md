# Page — Réinitialisation du mot de passe

**Zone** : Auth  
**Route** : `/auth/reset-password?token=:token`  
**Auth** : Aucune

---

## Objectif

Permettre à un utilisateur de définir un nouveau mot de passe via le lien reçu par email.

---

## Layout

Même structure que `/auth/login` : panneau gauche brand (desktop), formulaire à droite.

```
┌────────────────────┬──────────────────────────────────┐
│                    │   Logo Client Wall                │
│   Illustration     │                                   │
│   ou brand visual  │   Nouveau mot de passe            │
│                    │                                   │
│                    │   [Nouveau mot de passe]          │
│                    │   [Confirmer le mot de passe]     │
│                    │                                   │
│                    │   [Réinitialiser]                 │
└────────────────────┴──────────────────────────────────┘
```

---

## Sections

### Header

- Logo Client Wall
- Titre : "Créer un nouveau mot de passe"
- Sous-titre : "Votre nouveau mot de passe doit contenir au moins 8 caractères."

### Formulaire

| Champ | Type | Validation | Placeholder |
|---|---|---|---|
| Nouveau mot de passe | `input[password]` | Requis, min 8 chars | `••••••••` |
| Confirmer le mot de passe | `input[password]` | Requis, identique au champ précédent | `••••••••` |

Indicateur de robustesse sous le premier champ :

```
Robustesse :  ████████░░  Fort
```

Niveaux : Faible (rouge), Moyen (orange), Fort (vert). Basé sur longueur + complexité.

### Actions

- **Bouton principal** : "Réinitialiser le mot de passe" (`Button` variant `primary`, full-width)

---

## Logique

1. À l'arrivée sur la page : POST `/api/auth/validate-reset-token` pour vérifier la validité du token
   - Token invalide ou expiré → afficher l'état d'erreur (voir ci-dessous)
2. Soumission : POST `/api/auth/reset-password` avec `{ token, password }`
3. Succès → redirect vers `/auth/login` avec message toast "Mot de passe mis à jour. Connectez-vous."

---

## États

| État | Description |
|---|---|
| Default | Formulaire vide |
| Loading validation token | Spinner centré, formulaire masqué |
| Token invalide / expiré | Page d'erreur (voir ci-dessous) |
| Loading soumission | Bouton en `loading`, formulaire désactivé |
| Erreur validation | Messages inline sous les champs |
| Succès | Redirect + toast |

### Token invalide ou expiré

Remplacer le formulaire par :

```
┌─────────────────────────────────────────────────────┐
│                   ⚠  Lien expiré                     │
│                                                      │
│  Ce lien de réinitialisation n'est plus valide.      │
│  Il a peut-être expiré (validité : 1 heure) ou       │
│  déjà été utilisé.                                   │
│                                                      │
│  [Demander un nouveau lien]  →  /auth/forgot-password│
└─────────────────────────────────────────────────────┘
```

### Erreurs de validation

| Erreur | Message |
|---|---|
| Mots de passe différents | "Les mots de passe ne correspondent pas." |
| Trop court | "Le mot de passe doit contenir au moins 8 caractères." |
| Erreur réseau | Alert `error` : "Une erreur est survenue. Réessayez." |

---

## Accessibilité

- `<main>` avec `aria-label="Formulaire de réinitialisation du mot de passe"`
- Focus sur le premier champ à l'arrivée
- `autocomplete="new-password"` sur les deux champs
- Indicateur de robustesse annoncé via `aria-live="polite"`

---

## Responsive

| Breakpoint | Layout |
|---|---|
| Mobile | 1 colonne, logo en haut, padding 24px |
| Tablet | 1 colonne centrée (max 400px) |
| Desktop | 2 colonnes 50/50 |
