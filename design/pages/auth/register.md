# Page — Register

**Zone** : Auth  
**Route** : `/auth/register`  
**Auth** : Aucune

---

## Objectif

Création d'un nouveau compte et d'un nouveau workspace. Destiné aux propriétaires qui souhaitent démarrer avec Client Wall (pas aux collaborateurs ou clients — ceux-ci sont invités).

---

## Layout

Identique à la page login : 2 colonnes desktop, 1 colonne mobile.

---

## Sections

### Header

- Logo Client Wall
- Titre : "Créez votre espace de travail"
- Sous-titre : "Démarrez gratuitement, sans carte bancaire."

### Formulaire (multi-étapes)

#### Étape 1 — Informations personnelles

| Champ | Type | Validation |
|---|---|---|
| Prénom | `input[text]` | Requis |
| Nom | `input[text]` | Requis |
| Email professionnel | `input[email]` | Requis, format email, unique |
| Mot de passe | `input[password]` | Requis, min 8 chars |
| Confirmation MDP | `input[password]` | Requis, doit matcher |

#### Étape 2 — Votre workspace

| Champ | Type | Validation |
|---|---|---|
| Nom du workspace | `input[text]` | Requis, 2-60 chars |
| Slug (URL) | `input[text]` | Auto-généré depuis le nom, modifiable, unique, alphanumeric-dash |
| Secteur d'activité | `select` | Optionnel |

**Indication de l'URL** : `votre-espace.clientwall.fr` → preview live du slug

#### Étape 3 — Confirmation

- Résumé des informations
- Acceptation CGU + politique de confidentialité (checkbox obligatoire)
- Bouton : "Créer mon espace"

---

## Indicateur d'étapes

```
[1 Compte] — [2 Workspace] — [3 Confirmation]
```

Étape active mise en évidence (primary), étapes passées cochées, étapes futures grises.

---

## Logique post-inscription

1. Création compte + workspace en base
2. Email de bienvenue envoyé
3. Connexion automatique
4. Redirection vers `/admin/` avec onboarding (workspace setup)

---

## Erreurs

| Erreur | Champ | Message |
|---|---|---|
| Email déjà utilisé | Email | "Cette adresse est déjà associée à un compte. Connectez-vous." |
| Slug déjà pris | Slug | "Cette URL est déjà utilisée. Essayez : mon-agence-2" |
| MDP trop faible | Mot de passe | "Le mot de passe doit contenir au moins 8 caractères." |
| MDP ne correspondent pas | Confirmation | "Les mots de passe ne correspondent pas." |

---

## Responsive

Identique à la page login.

---

## Accessibilité

- Indicateur d'étapes : `aria-label="Étape 2 sur 3 : Workspace"`
- Navigation entre étapes au clavier
- Validation progressive (à la sortie du champ, pas uniquement à la soumission)
