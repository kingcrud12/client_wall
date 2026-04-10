# Composant — InvoiceTable

**Catégorie** : Page Section  
**Fichier cible** : `src/components/page-sections/InvoiceTable.tsx`

---

## Description

Tableau de liste des factures d'un projet. Utilisé dans la page `/invoices/` des zones Admin et Client. Inclut filtres, tri et actions contextuelles.

---

## Colonnes

### Zone Admin

| Colonne | Largeur | Contenu |
|---|---|---|
| N° Facture | 120px | `#2024-0042`, monospace |
| Client | flexible | Nom destinataire |
| Date émission | 130px | `15 janv. 2025` |
| Échéance | 110px | `15 févr. 2025` (rouge si dépassée) |
| Montant HT | 110px | `1 500,00 €`, tabular-nums, right-aligned |
| Montant TTC | 110px | `1 800,00 €`, tabular-nums, right-aligned |
| Statut | 120px | `Badge` statut |
| Actions | 80px | Menu contextuel (voir, émettre, télécharger) |

### Zone Client

| Colonne | Largeur | Contenu |
|---|---|---|
| N° Facture | 120px | `#2024-0042` |
| Date émission | 130px | `15 janv. 2025` |
| Échéance | 110px | `15 févr. 2025` |
| Montant TTC | 120px | `1 800,00 €` |
| Statut | 120px | `Badge` statut |
| Actions | 120px | Voir, Payer (si applicable) |

---

## En-tête de tableau (FiltersBar)

```
[Filtre statut ▼]  [Recherche numéro/client...]  [Exporter CSV*]  [+ Nouvelle facture*]
```
(*) = Zone Admin uniquement

---

## Actions contextuelles (menu)

### Zone Admin — selon statut

| Statut | Actions disponibles |
|---|---|
| `draft` | Voir, Modifier, Émettre, Supprimer |
| `issued` | Voir, Télécharger PDF, Marquer payée (manuel) |
| `paid` | Voir, Télécharger PDF |
| `overdue` | Voir, Télécharger PDF, Relancer |
| `partially_paid` | Voir, Télécharger PDF |
| `refund` | Voir, Télécharger PDF |

### Zone Client — selon statut + permissions

| Statut | Permission `pay` | Actions |
|---|---|---|
| `issued` | Oui | Voir, Payer maintenant |
| `issued` | Non | Voir |
| `overdue` | Oui | Voir, Payer maintenant (urgence) |
| `paid` | — | Voir, Télécharger |
| Autres | — | Voir |

---

## État "Overdue"

Les lignes avec statut `overdue` ont :
- Fond de ligne : `--color-warning-50`
- Date d'échéance en `--color-warning-600`
- Icône d'alerte ⚠ avant la date

---

## États du tableau

| État | Affichage |
|---|---|
| Loading | Skeleton de 5 lignes |
| Empty (aucune facture) | Illustration + "Aucune facture pour ce projet. [Créer une facture]" |
| Empty (filtre actif) | "Aucune facture correspond à ce filtre. [Effacer le filtre]" |
| Error | "Une erreur est survenue. [Réessayer]" |

---

## Responsive

| Breakpoint | Comportement |
|---|---|
| Mobile | Cards (CardInvoice) au lieu du tableau |
| Tablet | Tableau avec colonnes réduites (sans Montant HT) |
| Desktop | Tableau complet |
