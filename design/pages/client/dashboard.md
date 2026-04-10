# Page — Dashboard Client

**Zone** : Client  
**Route** : `/client/:projectId/`  
**Auth** : membre d'une zone client du projet  
**Composants** : `DashboardGrid`, `ProgressBar`, `Badge`, `Button`, `Navbar` (topbar)

---

## Objectif

Vue synthétique du projet côté client. Donne une vision rapide de l'état d'avancement, des factures à payer et des messages non lus. Interface d'accueil simple et rassurante.

---

## Layout

```
[Topbar : Logo | Nom projet | Aperçu Contrat Factures Avancement Fichiers Messages | Profil]

[Contenu — max 1024px centré]
```

Pas de sidebar. Navigation horizontale dans la topbar.

---

## Sections

### 1. En-tête projet

```
Projet Alpha
Refonte site e-commerce

Démarré le 15 janvier 2025 · Porteur : Mon Agence SAS
```

### 2. Barre de progression globale

Visible uniquement si un rapport d'avancement est publié.

```
Avancement du projet
████████████████░░░░  65%
Dernière mise à jour : 15 janv. 2025
```

Composant `ProgressBar` size `lg` avec label et date.

### 3. KPI Cards rapides

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│  Contrat     │  Factures    │  Factures    │  Messages    │
│  Signé ✓    │  payées : 2  │  à payer : 1 │  non lus : 3 │
│              │              │  900,00 €    │              │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

Chaque card est cliquable et renvoie vers la section correspondante.

- Contrat `pending` → card warning + "Signature requise"
- Facture `overdue` → card error + "En retard"

### 4. Dernier rapport d'avancement

Aperçu du rapport le plus récent (si publié) :

```
Dernier rapport — 15 janv. 2025
"Janvier 2025 — Semaine 2"

Milestones :
  ✓ Phase design
  ● Développement backend
  ○ Développement frontend

[Voir le rapport complet →]
```

### 5. Actions rapides

```
[Voir le contrat]  [Payer une facture]  [Envoyer un message]
```

Boutons `secondary` avec icônes. Masqués si action non applicable (ex: pas de facture à payer, contrat signé).

---

## Premier accès (onboarding)

Si c'est la première connexion du client :

```
Bienvenue dans votre espace client 👋

Mon Agence SAS vous a invité à collaborer sur le projet Alpha.

Que voulez-vous faire en premier ?
[Consulter le contrat]  [Voir les factures]  [Envoyer un message]
```

---

## États

| État | Affichage |
|---|---|
| Loading | Skeleton KPIs + section rapport |
| Pas de rapport publié | Barre de progression masquée ; "Aucun rapport disponible pour l'instant." |
| Contrat non signé | Card contrat en warning, CTA "Signer le contrat" |
| Facture overdue | Card factures en error, CTA "Payer maintenant" |

---

## Responsive

| Breakpoint | Comportement |
|---|---|
| Mobile | KPIs 2x2, sections empilées, topbar hamburger |
| Tablet | KPIs 4 colonnes, layout 1 colonne |
| Desktop | KPIs 4 colonnes, layout 1 colonne max-width 1024px |
