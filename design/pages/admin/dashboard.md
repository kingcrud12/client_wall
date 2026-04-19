# Page — Dashboard Admin

**Zone** : Admin  
**Route** : `/admin/`  
**Auth** : owner, manager  
**Composants** : `DashboardGrid`, `CardProject`, `CardInvoice`, `Sidebar`, `Navbar`

---

## Objectif

Vue d'ensemble du workspace. Donne une vision synthétique de l'état global : projets actifs, factures récentes, alertes (impayés, échéances proches).

---

## Layout

```
[Navbar]
[Sidebar] | [Contenu]
```

---

## Sections

### 1. Header de page

```
Bonjour, Marie 👋
Workspace : Mon Agence
```

- Salutation personnalisée avec le prénom de l'utilisateur
- Nom du workspace
- Date du jour

### 2. KPI Cards (DashboardGrid)

4 métriques principales :

| Métrique | Valeur | Sous-texte |
|---|---|---|
| Projets actifs | N | "+X ce mois" |
| Clients actifs | N | Membres dans zones client |
| CA ce mois (TTC) | X €  | Factures payées du mois courant |
| En attente de paiement | X € | Factures `issued` + `overdue` |

La carte "En attente" est en orange (`--color-warning-*`) si montant > 0.

### 3. Projets récents

Liste des 5 derniers projets actifs avec activité. Chaque item :
- Nom du projet
- Nombre de zones + membres
- Date de dernière activité
- Raccourcis : Documents, Factures, Messagerie

Bouton "Voir tous les projets" → `/admin/projects/`

### 4. Factures récentes

Liste des 5 dernières factures (toutes statuts). Chaque item :
- N° facture + client
- Montant TTC
- Statut (Badge)
- Date d'échéance

Bouton "Voir toutes les factures" → filtre cross-projet (à définir)

### 5. Alertes (si applicable)

Bloc conditionnel affiché si :
- Factures en retard (`overdue`) → Alert `warning`
- Stockage proche de la limite → Alert `warning`
- Plan dépassé (clients/sièges) → Alert `error`

---

## États

| État | Affichage |
|---|---|
| Loading | Skeletons pour KPIs + listes |
| Nouveau workspace (0 projets) | Message d'accueil + CTA "Créer votre premier projet" |
| Workspace avec données | Affichage complet |

---

## Responsive

| Breakpoint | KPIs | Listes |
|---|---|---|
| Mobile | 2 colonnes | 1 colonne (accordion ou stack) |
| Tablet | 2 colonnes | 2 colonnes |
| Desktop | 4 colonnes | 2 colonnes côte à côte |
