# Page — Onboarding workspace (Admin)

**Zone** : Admin  
**Route** : `/admin/onboarding`  
**Auth** : owner (première connexion uniquement)  
**Composants** : `Input`, `Select`, `Button`, `FileUploader`, `Sidebar` (masquée), `Navbar` (masquée)

---

## Objectif

Guider un nouvel owner à travers la configuration initiale de son workspace immédiatement après la création de compte. L'onboarding est obligatoire avant d'accéder au dashboard.

---

## Layout

Plein écran, sans sidebar ni navbar. Header minimal avec logo et indicateur de progression.

```
┌──────────────────────────────────────────────────────────────┐
│  Logo Client Wall                     Étape 2 sur 4          │
│                                       ████████░░░░░░░░        │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                    [Contenu de l'étape]                      │
│                                                              │
│              [← Retour]    [Continuer →]                     │
└──────────────────────────────────────────────────────────────┘
```

---

## Étape 1 — Bienvenue

```
Bienvenue sur Client Wall, Marie !

Avant de commencer, configurons votre espace de travail.
Cela prend moins de 3 minutes.

[Commencer →]
```

Pas de formulaire — uniquement message d'accueil et CTA.

---

## Étape 2 — Informations du workspace

```
Comment s'appelle votre structure ?
```

| Champ | Type | Validation | Description |
|---|---|---|---|
| Nom du workspace | `input[text]` | Requis, max 80 chars | Ex : "Mon Agence", "Dupont Conseil" |
| Type d'activité | `select` | Optionnel | Freelance / Agence / Cabinet / Association / Autre |
| Logo | `FileUploader` | Optionnel, SVG/PNG max 2 Mo | Affiché dans l'interface et les factures |

---

## Étape 3 — Informations légales

```
Ces informations seront pré-remplies sur vos factures.
Vous pourrez les modifier à tout moment dans les paramètres.
```

| Champ | Type | Validation | Description |
|---|---|---|---|
| Raison sociale | `input[text]` | Optionnel | Nom légal |
| SIRET | `input[text]` | Optionnel, 14 chiffres | — |
| Adresse (rue) | `input[text]` | Optionnel | — |
| Ville | `input[text]` | Optionnel | — |
| Code postal | `input[text]` | Optionnel | — |
| Pays | `select` | Optionnel | Défaut : France |

Lien discret : "Passer cette étape" (ces infos peuvent être configurées plus tard).

---

## Étape 4 — Créer votre premier projet

```
Créez votre premier projet pour commencer à travailler.
```

| Champ | Type | Validation | Description |
|---|---|---|---|
| Nom du projet | `input[text]` | Requis, max 80 chars | Ex : "Refonte site Dupont" |
| Nom du client | `input[text]` | Optionnel | — |

Actions :
- [Créer mon workspace et mon projet] (`Button primary`) → crée workspace + projet, redirect `/admin/`
- Lien discret : "Créer le projet plus tard" → crée uniquement le workspace, redirect `/admin/`

---

## Logique

1. PATCH `/api/workspace` avec les informations de l'étape 2 et 3
2. (Optionnel) POST `/api/projects` avec les données de l'étape 4
3. PATCH `/api/users/me` avec `{ onboarding_completed: true }` pour ne plus afficher l'onboarding
4. Redirect `/admin/` avec toast : "Votre espace de travail est prêt !"

L'onboarding ne s'affiche qu'une seule fois. Si `onboarding_completed = true`, toute tentative d'accès à `/admin/onboarding` redirige vers `/admin/`.

---

## États

| État | Description |
|---|---|
| Navigation entre étapes | Transition slide horizontal |
| Chargement création | Spinner plein écran sur le bouton final, overlay léger |
| Erreur | Alert `error` inline dans l'étape concernée |

---

## Responsive

| Breakpoint | Comportement |
|---|---|
| Mobile | Formulaire pleine largeur, padding 24px |
| Tablet | Formulaire centré max-width 480px |
| Desktop | Formulaire centré max-width 560px, fond de page avec illustration subtile |
