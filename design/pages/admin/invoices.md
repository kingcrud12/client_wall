# Page — Factures (Admin)

**Zone** : Admin  
**Route** : `/admin/projects/:projectId/invoices/`  
**Route détail** : `/admin/projects/:projectId/invoices/:invoiceId`  
**Route création** : `/admin/projects/:projectId/invoices/new`  
**Auth** : owner, manager  
**Composants** : `InvoiceTable`, `CardInvoice`, `Badge`, `Button`, `Sidebar`, `Navbar`

---

## Objectif

Gérer toutes les factures d'un projet : création, émission, suivi des paiements, téléchargement.

---

## Page Liste (`/invoices/`)

### Sections

#### 1. Header

```
Factures — Projet Alpha                    [+ Nouvelle facture]
```

#### 2. Métriques rapides

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│  Total émis  │  Payé        │  En attente  │  En retard   │
│  12 500 € HT │  8 000 €     │  3 500 €     │  1 000 €     │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

#### 3. InvoiceTable

Voir spec `components/page-sections/invoice-table.md`.

---

## Page Création (`/invoices/new`)

### Formulaire de création

**Section Émetteur** (pré-rempli depuis workspace settings, éditable) :
- Nom / raison sociale
- SIRET
- Numéro TVA
- Adresse complète (rue, ville, CP, pays)

**Section Destinataire** (sélection depuis les clients du projet ou saisie manuelle) :
- Nom / raison sociale
- SIRET (optionnel)
- Adresse complète

**Section Facture** :
- Numéro de facture (auto-généré, format : `YYYY-NNNN`, modifiable)
- Date d'émission (datepicker, défaut : aujourd'hui)
- Date d'échéance (datepicker)
- Taux TVA (select : 0%, 5.5%, 10%, 20%)

**Lignes de facture** (répétable) :

```
Désignation         Qté   Prix unitaire HT   Taxes   Total HT
────────────────────────────────────────────────────────────
Développement web    1        1500,00 €          —    1500,00 €
Hébergement          12          15,00 €          —     180,00 €
[+ Ajouter une ligne]
────────────────────────────────────────────────────────────
                              Total HT :        1680,00 €
                              TVA (20%) :        336,00 €
                              Total TTC :       2016,00 €
```

**Actions** :
- [Enregistrer en brouillon] — `Button secondary`
- [Prévisualiser] — ouvre modal PDF
- [Émettre la facture] — `Button primary` → confirme + génère PDF + envoie lien Stripe

---

## Page Détail (`/invoices/:invoiceId`)

### Facture brouillon (modifiable)

Même interface que le formulaire de création, mais en mode édition.

Actions : [Sauvegarder], [Émettre], [Supprimer]

### Facture émise (lecture seule)

Affichage en mode lecture — style document facture :

```
┌─────────────────────────────────────────────────┐
│                          FACTURE #2024-0042      │
│  Mon Agence SAS                                  │
│  12 rue du Commerce                              │
│  75001 Paris                                     │
│  SIRET : 123 456 789 00000                       │
│                                                  │
│  À :                        Date : 15/01/2025    │
│  Dupont & Associés          Échéance : 15/02/2025│
│  45 av. des Fleurs                               │
│  69001 Lyon                                      │
│                                                  │
│  Désignation         Qté   PU HT      Total HT   │
│  Développement web    1  1500,00€   1 500,00 €   │
│  Hébergement          12    15,00€    180,00 €   │
│                                                  │
│              Total HT :                1 680,00 €│
│              TVA (20%) :                 336,00 €│
│              Total TTC :              2 016,00 €  │
│                                                  │
│  [Statut : ÉMISE]                                │
└─────────────────────────────────────────────────┘
```

Actions : [Télécharger PDF], [Copier lien paiement], [Marquer comme payée (manuel)]

---

## Règles métier

- Une facture émise **ne peut pas être modifiée**.
- Statut `paid` : mis à jour automatiquement via webhook Stripe.
- Statut `overdue` : calculé automatiquement si `due_date` dépassée et non payée.
- Seul le montant TTC est visible dans la zone client.
- La génération du lien Stripe se fait à l'émission.

---

## Responsive

| Breakpoint | Comportement |
|---|---|
| Mobile | Cards au lieu du tableau en liste ; formulaire 1 colonne |
| Tablet | Tableau simplifié + formulaire 1-2 colonnes |
| Desktop | Tableau complet + formulaire 2 colonnes |
