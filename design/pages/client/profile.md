# Page — Profil (Client)

**Zone** : Client  
**Route** : `/client/:projectId/profile`  
**Auth** : utilisateur connecté (toutes zones)  
**Composants** : `Input`, `Button`, `Avatar`, `Badge`, `Navbar`

---

## Objectif

Permettre au client de consulter et modifier ses informations personnelles, changer son mot de passe, gérer ses préférences de notification et se déconnecter.

---

## Accès

Accessible depuis le menu déroulant de l'avatar dans la topbar : "Mon profil".

---

## Layout

Page en colonne unique, max-width 640px centré. Sections séparées par des dividers.

```
[Topbar]
┌─────────────────────────────────────────────────────┐
│  Mon profil                                         │
│                                                     │
│  Section : Informations personnelles               │
│  Section : Sécurité                                 │
│  Section : Notifications                           │
│  Section : Session                                 │
└─────────────────────────────────────────────────────┘
```

---

## Section — Informations personnelles

### Avatar

```
[Avatar large — 80px]  [Changer la photo]  [Supprimer]
```

Upload de photo :
- Formats : JPG, PNG, WEBP
- Taille max : 2 Mo
- Recadrage automatique en carré (outil de crop intégré après sélection)

### Champs

| Champ | Type | Validation | Notes |
|---|---|---|---|
| Prénom | `input[text]` | Requis, max 50 chars | — |
| Nom | `input[text]` | Requis, max 50 chars | — |
| Email | `input[email]` | Requis, format email | Modification déclenche un email de confirmation |
| Téléphone | `input[tel]` | Optionnel | Formatage automatique |
| Poste / fonction | `input[text]` | Optionnel | Ex : "Directeur financier" |
| Organisation | `input[text]` | Optionnel, lecture seule | Nom de l'entreprise cliente (renseigné par l'agence) |

Action : [Enregistrer les modifications]

### Changement d'email

Si l'email est modifié, afficher une info avant la sauvegarde :

> "Un email de confirmation sera envoyé à la nouvelle adresse. Le changement prendra effet après confirmation."

Après sauvegarde : banner info "Un email de confirmation a été envoyé à [nouvelle adresse]."

---

## Section — Sécurité

### Changer le mot de passe

| Champ | Type | Validation |
|---|---|---|
| Mot de passe actuel | `input[password]` | Requis |
| Nouveau mot de passe | `input[password]` | Requis, min 8 chars |
| Confirmer le nouveau mot de passe | `input[password]` | Requis, identique au précédent |

Indicateur de robustesse sous "Nouveau mot de passe" (même composant que reset-password).

Action : [Changer le mot de passe]

### Erreurs

| Erreur | Message |
|---|---|
| Mot de passe actuel incorrect | "Mot de passe actuel incorrect." |
| Mots de passe différents | "Les nouveaux mots de passe ne correspondent pas." |
| Trop court | "Le mot de passe doit contenir au moins 8 caractères." |

---

## Section — Notifications

Préférences d'envoi d'email (pas de push notifications dans l'espace client) :

| Événement | Toggle |
|---|---|
| Nouveau message de l'équipe | ✓ (activé par défaut) |
| Nouveau rapport d'avancement | ✓ (activé par défaut) |
| Facture émise | ✓ (activé par défaut) |
| Facture en retard | ✓ (activé par défaut) |
| Nouveau fichier partagé | ✓ (activé par défaut) |
| Contrat à signer | ✓ (activé par défaut) |

Action : [Enregistrer les préférences] (ou auto-save au toggle avec feedback toast discret).

---

## Section — Session

```
Connecté en tant que : jean.dupont@societe.fr
Dernière connexion : Aujourd'hui à 09:14 depuis Paris, France

[Se déconnecter de ce projet]
[Se déconnecter de tous les appareils]   ← Button ghost
```

**[Se déconnecter de ce projet]** :
- Détruit le token de session courant
- Redirect vers `/auth/login`

**[Se déconnecter de tous les appareils]** :
- Dialog de confirmation :
  > "Vous serez déconnecté de tous vos appareils et navigateurs. Vous devrez vous reconnecter."
  > [Confirmer] / [Annuler]
- Invalide tous les tokens de session actifs
- Redirect vers `/auth/login`

---

## États

| État | Affichage |
|---|---|
| Loading | Skeleton des champs |
| Sauvegarde en cours | Bouton en `loading` |
| Succès | Toast "Modifications enregistrées." |
| Erreur validation | Messages inline sous les champs concernés |
| Upload avatar en cours | Spinner sur l'avatar |

---

## Responsive

Page en colonne unique sur tous les breakpoints. Padding 24px mobile, 48px desktop.
