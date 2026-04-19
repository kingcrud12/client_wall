# Page — Paramètres Workspace (Admin)

**Zone** : Admin  
**Route** : `/admin/settings`  
**Auth** : owner, manager (section danger zone : owner uniquement)  
**Composants** : `Input`, `Button`, `Select`, `Sidebar`, `Navbar`

---

## Objectif

Configurer le workspace : informations légales, intégrations, facturation, danger zone.

---

## Layout

Page avec navigation par onglets ou sections ancre (sidebar secondaire) :

```
[Sidebar principale]  [Nav secondaire]  [Contenu]

Informations générales
Informations légales
Intégration Stripe
Danger zone (owner)
```

---

## Section — Informations générales

| Champ | Type | Description |
|---|---|---|
| Nom du workspace | `input[text]` | Nom affiché dans l'interface |
| Slug (URL) | `input[text]` | URL unique du workspace |
| Logo | `FileUploader` | Logo SVG/PNG max 2MB |
| Secteur d'activité | `select` | Optionnel |

Action : [Sauvegarder les informations]

---

## Section — Informations légales de facturation

Ces informations pré-remplissent les factures créées.

| Champ | Type | Description |
|---|---|---|
| Raison sociale | `input[text]` | Nom légal de l'entité |
| SIRET | `input[text]` | Format : 14 chiffres |
| Numéro TVA intracommunautaire | `input[text]` | Optionnel |
| Adresse | `input[text]` | Rue |
| Ville | `input[text]` | — |
| Code postal | `input[text]` | — |
| Pays | `select` | — |
| Email de facturation | `input[email]` | Pour les rappels et notifications |

Action : [Sauvegarder]

---

## Section — Intégration Stripe

| Champ | Type | Description |
|---|---|---|
| Clé API Stripe | `input[password]` | Masquée, affichage partiel `sk_live_*****` |
| Webhook secret | `input[password]` | Pour la vérification des webhooks |

Statut de connexion :
- ✓ Stripe connecté (vert)
- ✗ Stripe non configuré (gris)
- ⚠ Erreur de connexion (orange)

Actions : [Sauvegarder], [Tester la connexion], [Déconnecter Stripe]

---

## Section — Danger Zone

Visible uniquement pour l'**owner**.

```
┌─────────────────────────────────────────────────────┐
│ ⚠ Zone Dangereuse                                   │
│                                                      │
│ Transférer l'ownership                               │
│ Transférer ce workspace à un autre membre.           │
│ [Transférer l'ownership]                            │
│                                                      │
│ Supprimer le workspace                               │
│ Cette action est irréversible. Tous les projets,    │
│ documents et données seront définitivement supprimés.│
│ [Supprimer le workspace]                            │
└─────────────────────────────────────────────────────┘
```

Les deux actions ouvrent un **dialog de confirmation** demandant de taper le nom du workspace pour confirmer.

---

## États

| État | Description |
|---|---|
| Loading | Skeleton des champs |
| Sauvegarde | Bouton en loading, feedback toast succès |
| Erreur validation | Messages d'erreur inline sous les champs |
| Stripe connecté | Badge vert "Connecté" |

---

## Responsive

Page en colonne unique sur mobile et tablet. Desktop : contenu max 768px centré.
