# Page — Contrat (Client)

**Zone** : Client  
**Route** : `/client/:projectId/contract`  
**Auth** : membre zone client (permission `read:contract`)  
**Signature** : permission `sign:contract` requise pour signer  
**Rejet** : permission `sign:contract` requise (le rejet est une action sur le contrat)  
**Composants** : `Badge`, `Button`, `Input`, `Navbar`

---

## Objectif

Permettre au client de consulter, télécharger, signer ou rejeter son contrat de mission. La page guide clairement vers l'action attendue et documente l'historique des versions.

---

## Layout

```
[Topbar]
┌──────────────────────────────────────┬────────────────────────┐
│                                      │                        │
│   Visualiseur PDF                    │   Panneau d'actions    │
│   (scrollable)                       │   (sticky desktop)     │
│                                      │                        │
│                                      │   Statut              │
│                                      │   Actions             │
│                                      │   Métadonnées         │
│                                      │                        │
└──────────────────────────────────────┴────────────────────────┘
```

**Mobile / Tablet** : panneau d'actions sous le visualiseur (pas de sticky).

---

## Sections

### 1. Header de page

```
Contrat de mission — Projet Alpha
[BADGE STATUT]   Proposé par : Mon Agence SAS   Version 1
```

Badge de statut : `pending` (warning), `signed` (success), `rejected` (error).

### 2. Visualiseur de document

Iframe / embed PDF :

```
┌──────────────────────────────────────┐
│                                      │
│   [Visualiseur PDF natif]            │
│                                      │
│   Contrat de Prestation de Services  │
│   Entre Mon Agence SAS et            │
│   Dupont & Associés                  │
│   ...                                │
│                                      │
│   ← Page 1 / 3 →                    │
└──────────────────────────────────────┘
```

**Fallback** si le navigateur ne supporte pas le PDF embarqué :
> "Votre navigateur ne peut pas afficher ce document."  
> [Télécharger le contrat]

### 3. Panneau d'actions (selon statut)

#### Statut `pending` — En attente de signature

```
En attente de votre signature

Ce contrat vous a été soumis le 10 janv. 2025.
Lisez-le attentivement avant de signer.

[Télécharger le PDF]

[Signer le contrat]         ← Button primary
[Refuser ce contrat]        ← Button ghost (ouvre le dialog de rejet)
```

Avertissement contextuel sous les boutons :
> "La signature redirige vers un service de signature électronique sécurisé. Votre signature a valeur légale."

#### Statut `signed` — Contrat signé

```
✓ Contrat signé

Signé le 20 janv. 2025 par Jean Dupont

[Télécharger le contrat signé]
```

Badge `success`. Aucune action supplémentaire possible.

#### Statut `rejected` — Contrat refusé

```
✗ Contrat refusé

Refusé le 18 janv. 2025 par Jean Dupont

Motif indiqué :
"Les conditions de paiement ne correspondent pas à nos attentes.
Merci de réviser l'article 4."

Pour discuter d'une révision, utilisez la messagerie.

[Aller à la messagerie →]
```

#### Statut — Aucun contrat

```
Aucun contrat disponible pour ce projet pour l'instant.
L'organisation vous informera lorsqu'un contrat sera mis à disposition.
```

---

## Dialog de rejet

Ouvert par [Refuser ce contrat]. Modale de confirmation :

```
Refuser ce contrat

Précisez la raison de votre refus (optionnel) :
[Textarea — ex : "L'article 4 ne correspond pas à notre accord verbal..."]
max 500 caractères

Ce refus sera communiqué à Mon Agence SAS.

[Confirmer le refus]  (Button danger)   [Annuler]
```

Après confirmation :
- PATCH `/api/contracts/:id` → `{ status: "rejected", rejection_reason: "..." }`
- Toast : "Refus transmis à Mon Agence SAS."
- Redirect vers dashboard

---

## Historique des versions

Si plusieurs versions du contrat ont été proposées (ex : après un rejet), afficher un accordéon en bas de page :

```
Historique des versions

▼ Version 2 — En attente (actuelle)
  Proposée le 22 janv. 2025

▶ Version 1 — Refusée
  Proposée le 10 janv. 2025
  Refusée le 18 janv. 2025
  Motif : "Les conditions de paiement..."
```

Chaque version est téléchargeable séparément.

---

## Logique de signature

1. Clic sur [Signer le contrat] → PATCH `/api/contracts/:id/sign-url` pour obtenir l'URL de signature
2. Redirection vers l'outil de signature externe (nouvel onglet)
3. Retour sur la page après signature
4. Polling ou webhook → mise à jour du statut en `signed`
5. Toast : "Contrat signé avec succès."

---

## États

| État | Affichage |
|---|---|
| Loading | Skeleton visualiseur + skeleton panneau actions |
| `pending` | Visualiseur + actions signer / refuser |
| Signature en cours (redirect externe) | Bandeau info "Signature en cours… Revenez ici après avoir signé." |
| `signed` | Visualiseur read-only + badge + téléchargement |
| `rejected` | Message + motif + lien messagerie |
| Aucun contrat | Message neutre |
| Erreur chargement PDF | Fallback téléchargement |

---

## Données non affichées

- Tarification interne (si distincte du montant visible)
- Notes internes sur le contrat
- Identité du gestionnaire ayant émis le contrat (seulement le nom de l'organisation)

---

## Responsive

| Breakpoint | Layout |
|---|---|
| Mobile | Visualiseur pleine largeur + actions sous (scroll vertical) |
| Tablet | Visualiseur 100% + actions sous, max-width 760px |
| Desktop | Visualiseur gauche (flex-1) + panneau actions droite (320px, sticky top-24) |
