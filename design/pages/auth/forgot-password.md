# Page — Mot de passe oublié

**Zone** : Auth  
**Route** : `/auth/forgot-password`  
**Auth** : Aucune (redirection vers `/admin/` si déjà connecté)

---

## Objectif

Permettre à un utilisateur de demander un lien de réinitialisation de mot de passe par email.

---

## Layout

Même structure que `/auth/login` : panneau gauche brand (desktop), formulaire à droite.

```
┌────────────────────┬──────────────────────────────────┐
│                    │   Logo Client Wall                │
│   Illustration     │                                   │
│   ou brand visual  │   Mot de passe oublié             │
│                    │                                   │
│                    │   [Email]                         │
│                    │                                   │
│                    │   [Envoyer le lien]               │
│                    │                                   │
│                    │   ← Retour à la connexion         │
└────────────────────┴──────────────────────────────────┘
```

**Mobile** : Panneau gauche masqué, formulaire pleine largeur.

---

## Sections

### Header

- Logo Client Wall
- Titre : "Mot de passe oublié"
- Sous-titre : "Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe."

### Formulaire

| Champ | Type | Validation | Placeholder |
|---|---|---|---|
| Email | `input[email]` | Requis, format email | `vous@entreprise.com` |

### Actions

- **Bouton principal** : "Envoyer le lien de réinitialisation" (`Button` variant `primary`, full-width)
- **Lien** : "← Retour à la connexion" → `/auth/login`

---

## États

| État | Description |
|---|---|
| Default | Formulaire vide |
| Loading | Bouton en `loading`, spinner |
| Succès | Confirmation (voir ci-dessous) |
| Email inconnu | Afficher le même message de succès (sécurité : ne pas révéler si l'email existe) |
| Erreur réseau | Alert `error` sous le bouton |

### État Succès

Après soumission réussie, remplacer le formulaire par :

```
┌─────────────────────────────────────────────────────┐
│                   ✉  Email envoyé                    │
│                                                      │
│  Si l'adresse jean@agence.fr est associée à un      │
│  compte, vous recevrez un email dans quelques        │
│  minutes.                                            │
│                                                      │
│  Vérifiez aussi votre dossier spam.                  │
│                                                      │
│  [← Retour à la connexion]                          │
└─────────────────────────────────────────────────────┘
```

---

## Logique

1. POST `/api/auth/forgot-password` avec `{ email }`
2. Le backend génère un token signé (expiration 1h) et envoie l'email
3. Le frontend affiche toujours l'état succès, quelle que soit la réponse (sécurité)
4. L'email contient un lien : `https://app.clientwall.io/auth/reset-password?token=:token`

---

## Accessibilité

- `<main>` avec `aria-label="Formulaire de mot de passe oublié"`
- Focus sur le champ email à l'arrivée
- `autocomplete="email"` sur le champ
- Erreurs annoncées via `aria-live="polite"`

---

## Responsive

| Breakpoint | Layout |
|---|---|
| Mobile | 1 colonne, logo en haut, padding 24px |
| Tablet | 1 colonne centrée (max 400px) |
| Desktop | 2 colonnes 50/50 |
