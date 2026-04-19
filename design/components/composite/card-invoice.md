# Composant — CardInvoice

**Catégorie** : Composite  
**Fichier cible** : `src/components/composite/CardInvoice.tsx`

---

## Description

Card affichant le résumé d'une facture. Utilisée dans les listes de factures (Zone Admin et Zone Client). Cliquable pour accéder au détail.

---

## Props

| Prop | Type | Description |
|---|---|---|
| `invoice` | `Invoice` | Données de la facture |
| `onClick` | `() => void` | Navigation vers le détail |
| `zone` | `'admin' \| 'client'` | Adapte les actions affichées |

```typescript
type Invoice = {
  id: string;
  invoiceNumber: string;
  issuedAt: string;       // ISO date
  dueDate: string;        // ISO date
  recipientName: string;
  totalHt: number;
  totalWithTaxes: number;
  status: 'draft' | 'issued' | 'paid' | 'overdue' | 'partially_paid' | 'refund';
  stripeLink?: string;
}
```

---

## Structure visuelle

```
┌─────────────────────────────────────────┐
│  Facture #2024-0042         [ÉMISE]      │
│  Dupont & Associés                       │
│  ────────────────────────────────────── │
│  Émise le : 15 janv. 2025               │
│  Échéance : 15 févr. 2025               │
│                                          │
│  Total HT      1 500,00 €               │
│  Total TTC     1 800,00 €               │
│                                          │
│  [Voir détail]  [Payer maintenant]       │
└─────────────────────────────────────────┘
```

---

## Comportement par zone

### Zone Admin
- Actions : Voir détail, (si draft) Modifier, Émettre, (jamais) Payer
- Toutes les factures visibles (toutes zones/projets selon filtre)

### Zone Client
- Actions : Voir détail, Payer maintenant (si `issued`/`overdue` + permission `pay:invoice`)
- Seules les factures exposées à la zone client sont listées

---

## États

| État | Comportement |
|---|---|
| Default | Card avec ombre `--shadow-sm` |
| Hover | Ombre `--shadow-md`, curseur pointer |
| Focus | Focus ring sur la card |
| Overdue | Bordure gauche `--color-warning-500` + badge warning |

---

## Formatage des montants

- Toujours 2 décimales : `1 500,00 €`
- Utiliser `Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })`
- `font-variant-numeric: tabular-nums` pour alignement

---

## Affichage de la date

- Format : `15 janv. 2025` (Intl.DateTimeFormat, locale fr-FR)
- Si `overdue` : date en rouge + icône warning

---

## Responsive

| Breakpoint | Layout |
|---|---|
| Mobile | Card full-width, actions en colonne |
| Tablet | Cards en grille 2 colonnes |
| Desktop | Cards en grille 2-3 colonnes |

En tableau (alternative desktop) : voir `InvoiceTable` dans page-sections.

---

## Accessibilité

- La card entière est cliquable : `<article>` avec `tabindex="0"` et `role="link"` ou wrapper `<a>`
- `aria-label="Facture #2024-0042, Dupont & Associés, 1800,00 euros, Émise"` sur le wrapper
- Badge status : inclure texte pour les lecteurs d'écran
