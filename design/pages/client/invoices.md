# Page — Factures (Client)

**Zone** : Client  
**Route liste** : `/client/:projectId/invoices/`  
**Route détail** : `/client/:projectId/invoices/:invoiceId`  
**Auth** : membre zone client (permission `read:invoice`)  
**Paiement** : permission `pay:invoice` requise  
**Composants** : `Badge`, `Button`, `CardInvoice`, `Navbar`

---

## Objectif

Permettre au client de consulter toutes ses factures, payer celles qui sont en attente via Stripe, et télécharger les reçus. L'interface distingue clairement ce qui nécessite une action de ce qui est archivé.

---

## Page Liste (`/invoices/`)

### Header

```
Mes factures — Projet Alpha
```

### Bannière d'alerte (conditionnelle)

Affichée uniquement si une ou plusieurs factures sont `overdue` :

```
┌─────────────────────────────────────────────────────────────────┐
│  ⚠  Vous avez 1 facture en retard                              │
│     Facture #2024-0039 — 1 000,00 € — Échue le 5 janv. 2025   │
│                                          [Payer maintenant →]  │
└─────────────────────────────────────────────────────────────────┘
```

Si plusieurs factures `overdue` :
```
⚠  Vous avez 2 factures en retard — Total : 2 000,00 €    [Voir les factures en retard]
```

### Métriques de synthèse

Visibles uniquement si au moins une facture existe (données TTC uniquement) :

```
┌──────────────────┬──────────────────┬──────────────────┐
│  Total payé      │  À régler        │  En retard       │
│  8 000,00 € TTC  │  3 500,00 € TTC  │  1 000,00 € TTC  │
└──────────────────┴──────────────────┴──────────────────┘
```

La card "En retard" est rouge (`--color-error-*`) si montant > 0, grise sinon.

### Filtres

```
[Toutes]  [À payer]  [En retard]  [Payées]
```

### Liste des factures

Tableau sur desktop, cards empilées sur mobile.

Colonnes : N° facture | Émise le | Échéance | Montant TTC | Statut | Actions

**Actions par statut** :

| Statut | Visible | Actions |
|---|---|---|
| `draft` | Non | — (jamais exposé au client) |
| `issued` | Oui | [Voir] · [Payer] (si `pay:invoice`) |
| `overdue` | Oui | [Voir] · [Payer] (si `pay:invoice`) — ligne surlignée error |
| `paid` | Oui | [Voir] · [Télécharger le reçu] |
| `partially_paid` | Oui | [Voir] · [Payer le solde] (si `pay:invoice`) |
| `refund` | Oui | [Voir] |

### État vide

```
Aucune facture pour l'instant.
L'organisation vous notifiera lorsqu'une facture sera émise.
```

---

## Page Détail (`/invoices/:invoiceId`)

### Document facture formaté

```
┌─────────────────────────────────────────────────────────────────┐
│                                    FACTURE #2024-0042           │
│  Mon Agence SAS                    Date : 15 janv. 2025         │
│  12 rue du Commerce                Échéance : 15 févr. 2025     │
│  75001 Paris                                                    │
│  SIRET : 123 456 789 00000                                      │
│                                                                 │
│  Adressée à :                                                   │
│  Dupont & Associés                                              │
│  45 avenue des Fleurs, 69001 Lyon                               │
│                                                                 │
│  Désignation                     Qté      Total TTC             │
│  ─────────────────────────────────────────────────             │
│  Développement web                 1    1 800,00 €              │
│  Hébergement (12 mois)            12      216,00 €              │
│  ─────────────────────────────────────────────────             │
│                           Total TTC :   2 016,00 €              │
│                                                                 │
│  Statut : [ÉMISE]                                               │
└─────────────────────────────────────────────────────────────────┘
```

> Note : seuls les montants TTC sont affichés. Les montants HT, taux de TVA et taux horaires internes sont masqués.

### Panneau d'actions (sticky desktop, sous le document sur mobile)

**Facture `issued` :**

```
[Télécharger le PDF]
[Payer maintenant — 2 016,00 €]   ← Button primary (si pay:invoice)
```

**Facture `overdue` :**

```
⚠ Cette facture est en retard depuis le 15 févr. 2025.

[Télécharger le PDF]
[Payer maintenant — 2 016,00 €]   ← Button danger (si pay:invoice)
```

**Facture `partially_paid` :**

```
Paiement partiel enregistré.
Déjà payé : 1 000,00 €
Solde restant : 1 016,00 €

[Télécharger le PDF]
[Payer le solde — 1 016,00 €]   ← Button primary (si pay:invoice)
```

**Facture `paid` :**

```
✓ Payée le 20 févr. 2025

[Télécharger le PDF]
[Télécharger le reçu de paiement]
```

**Sans permission `pay:invoice` (lecture seule) :**

Le bouton paiement est masqué. À la place :
> "Le paiement doit être effectué par le responsable financier de votre organisation."

---

## Flux de paiement Stripe

1. Clic sur [Payer maintenant] → `Button` passe en `loading`
2. POST `/api/invoices/:id/payment-link` → URL Stripe
3. Redirect vers Stripe Checkout (nouvel onglet ou redirect selon config)
4. Après paiement Stripe → retour sur `/client/:projectId/invoices/:invoiceId`
5. Bandeau de confirmation affiché :

```
┌─────────────────────────────────────────────────────────────┐
│  ✓ Votre paiement a été reçu.                              │
│  Le statut de cette facture sera mis à jour sous peu.       │
│  Un reçu vous a été envoyé par email.                       │
└─────────────────────────────────────────────────────────────┘
```

Le statut `paid` est définitivement mis à jour via webhook Stripe (peut prendre quelques secondes).

---

## Règles d'affichage

- Les factures `draft` ne sont **jamais** visibles dans la zone client.
- Les montants affichés sont **toujours TTC**.
- La décomposition HT/TVA n'est pas affichée (disponible dans le PDF téléchargeable).
- Plusieurs représentants d'un même client peuvent voir les factures, mais seul celui avec `pay:invoice` voit le bouton de paiement.

---

## États

| État | Affichage |
|---|---|
| Loading liste | Skeleton métriques + skeleton 5 lignes |
| Loading détail | Skeleton document |
| Erreur chargement | Alert error + [Réessayer] |
| Paiement en cours | Bouton loading + message "Redirection vers le paiement..." |
| Après retour Stripe | Bandeau confirmation |

---

## Responsive

| Breakpoint | Liste | Détail |
|---|---|---|
| Mobile | Cards factures pleine largeur, bouton payer prominent | Document en scroll, actions en bas |
| Tablet | Tableau simplifié (N°, montant, statut, action) | Document max-width 640px + actions sous |
| Desktop | Tableau complet | Document max-width 800px + sidebar actions sticky (300px) |
