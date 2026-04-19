# Page — Abonnement & Plan (Admin)

**Zone** : Admin  
**Route** : `/admin/billing`  
**Auth** : owner uniquement  
**Composants** : `Badge`, `Button`, `Input`, `Sidebar`, `Navbar`

---

## Objectif

Gérer l'abonnement du workspace : consulter le plan actif, changer de formule, voir l'historique de facturation, mettre à jour les informations de paiement.

---

## Layout

Page avec navigation par sections (scroll ou onglets) :

```
[Sidebar principale]  [Contenu]

Plan actif
Changer de plan
Historique de paiement
Moyen de paiement
```

---

## Section — Plan actif

```
┌───────────────────────────────────────────────────────┐
│  Plan actuel : Starter          [ACTIF]               │
│                                                        │
│  Renouvellement le : 15 mai 2025                       │
│  Montant : 29 € / mois TTC                            │
│                                                        │
│  Usage :                                               │
│  Projets actifs    3 / 5       ████████░░░░            │
│  Membres          12 / 20      ████████████░░░░        │
│  Stockage         1.2 Go / 5 Go ████░░░░░░░░           │
│                                                        │
│  [Changer de plan]  [Annuler l'abonnement]            │
└───────────────────────────────────────────────────────┘
```

Alertes conditionnelles :
- Si quota > 80% → Alert `warning` : "Vous approchez de la limite de votre plan."
- Si quota = 100% → Alert `error` : "Limite atteinte. Passez à un plan supérieur pour continuer."

---

## Section — Changer de plan

Affichage des plans disponibles en cards côte à côte :

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Free       │  │  Starter ✓  │  │   Pro         │
│   0 €/mois   │  │  29 €/mois  │  │  79 €/mois   │
│              │  │              │  │              │
│  2 projets   │  │  5 projets   │  │  Illimité    │
│  5 membres   │  │  20 membres  │  │  Illimité    │
│  1 Go        │  │  5 Go        │  │  50 Go       │
│  Pas de      │  │  Stripe +   │  │  Tout inclus  │
│  Stripe      │  │  1 client   │  │              │
│              │  │              │  │              │
│ [Plan actuel]│  │ [Actif]      │  │[Passer au Pro]│
└──────────────┘  └──────────────┘  └──────────────┘
```

- Plan actif : card mise en avant avec bordure primaire, bouton désactivé
- Downgrade vers Free : alert de confirmation listant les ressources perdues
- Upgrade : redirect Stripe Checkout

---

## Section — Historique de paiement

Tableau des factures d'abonnement :

| Date | Description | Montant | Statut | Action |
|---|---|---|---|---|
| 15 avr. 2025 | Starter — Avril 2025 | 29,00 € | Payée | [Télécharger] |
| 15 mars 2025 | Starter — Mars 2025 | 29,00 € | Payée | [Télécharger] |
| 15 févr. 2025 | Starter — Févr. 2025 | 29,00 € | Payée | [Télécharger] |

État vide : "Aucune facture pour le moment."

---

## Section — Moyen de paiement

```
Carte enregistrée : Visa •••• •••• •••• 4242    Expire 12/2026
[Mettre à jour la carte]
```

Le bouton "Mettre à jour la carte" redirige vers le portail client Stripe.

---

## Section — Annuler l'abonnement

Lien discret en bas de page (pas de bouton proéminent) :

```
Vous souhaitez annuler ? → Annuler mon abonnement
```

Dialog de confirmation :
- Rappel de la date de fin d'accès (fin de la période en cours)
- Liste des données conservées vs supprimées après annulation
- Champ de texte optionnel : "Raison de l'annulation"
- [Confirmer l'annulation] (danger) / [Garder mon abonnement]

---

## Règles métier

- Seul l'**owner** peut accéder à cette page et effectuer des modifications.
- Les upgrades sont traités immédiatement via Stripe Checkout.
- Les downgrades prennent effet à la prochaine période de facturation.
- L'annulation conserve l'accès jusqu'à la fin de la période payée.
- Les données du workspace sont conservées 30 jours après annulation avant suppression définitive.

---

## États

| État | Description |
|---|---|
| Loading | Skeleton des sections |
| Sans abonnement actif | Afficher uniquement les plans + CTA souscription |
| Plan Free | Section historique masquée, moyen de paiement masqué |

---

## Responsive

| Breakpoint | Plans | Tableau |
|---|---|---|
| Mobile | Plans en stack vertical | Cards au lieu du tableau |
| Tablet | Plans 2 colonnes | Tableau simplifié |
| Desktop | Plans 3 colonnes | Tableau complet |
