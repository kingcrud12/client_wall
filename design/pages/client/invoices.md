# Page — Factures (Client)

**Zone** : Client  
**Route liste** : `/client/:projectId/invoices/`  
**Route détail** : `/client/:projectId/invoices/:invoiceId`  
**Auth** : membre zone client (permission `read:invoice`)  
**Paiement** : permission `pay:invoice` requise pour le bouton payer  
**Composants** : `Badge`, `Button`, `CardInvoice`, `InvoiceTable`, `Navbar`

---

## Objectif

Permettre au client de consulter toutes ses factures et de payer celles qui sont en attente via Stripe.

---

## Page Liste (`/invoices/`)

### Sections

#### Header

```
Mes factures — Projet Alpha
```

#### Métriques (simplifiées, sans données confidentielles)

```
┌──────────────┬──────────────┬──────────────┐
│  Total payé  │  En attente  │  En retard   │
│  8 000 € TTC │  3 500 € TTC │  1 000 € TTC │
└──────────────┴──────────────┴──────────────┘
```

#### Filtres

```
[Tous] [À payer] [Payées] [En retard]
```

#### Liste des factures

Cards `CardInvoice` ou tableau simplifié.

Colonnes : N° Facture, Date émission, Échéance, Montant TTC, Statut, Actions

**Actions par statut** :

| Statut | Actions |
|---|---|
| `draft` | Non visible (brouillons jamais exposés au client) |
| `issued` | Voir, Payer (si `pay:invoice`) |
| `paid` | Voir, Télécharger |
| `overdue` | Voir, Payer (si `pay:invoice`) — card mise en avant |
| `partially_paid` | Voir |

#### Alerte facture en retard

Banner d'alerte en haut si facture `overdue` :

```
⚠ Vous avez une facture en retard.
1 000,00 € — Facture #2024-0039 — Échue le 5 janv. 2025
[Payer maintenant]
```

---

## Page Détail (`/invoices/:invoiceId`)

### Structure

Document facture formaté :

```
                          FACTURE #2024-0042
Mon Agence SAS                         Date : 15 janv. 2025
12 rue du Commerce                     Échéance : 15 févr. 2025
75001 Paris
SIRET : 123 456 789 00000

Adressée à :
Dupont & Associés
45 avenue des Fleurs, 69001 Lyon

Désignation                  Qté     Prix unitaire    Total HT
─────────────────────────────────────────────────────────────
Développement web             1       1 500,00 €     1 500,00 €
Hébergement                   12         15,00 €       180,00 €
─────────────────────────────────────────────────────────────
                                         Total HT : 1 680,00 €
                                         TVA (20%) :  336,00 €
                                         Total TTC : 2 016,00 €

Statut : ÉMISE
```

### Actions

- [Télécharger PDF]
- [Payer maintenant] — `Button primary` — visible uniquement si `issued` ou `overdue` ET `pay:invoice`

**Comportement "Payer maintenant"** :
1. Redirection vers lien Stripe externe (nouvel onglet ou redirect)
2. Retour sur la page après paiement
3. Statut mis à jour via webhook Stripe (peut nécessiter un délai)
4. Message : "Votre paiement est en cours de traitement. Le statut sera mis à jour sous peu."

---

## Données non affichées (confidentielles)

- Montant HT des lignes (sauf si même que TTC car TVA 0%)
- Taux horaire interne
- Marges
- Informations bancaires de l'agence

---

## Gestion multi-représentants

Un client peut avoir plusieurs comptes représentants dans la même zone. Seuls ceux avec la permission `pay:invoice` voient le bouton paiement. L'organisation Client Wall ne gère pas le partage interne du paiement entre représentants — c'est la responsabilité du client.

---

## Responsive

| Breakpoint | Comportement |
|---|---|
| Mobile | Cards factures, bouton payer prominent |
| Tablet | Tableau + bouton payer |
| Desktop | Document facture centré + sidebar actions |
