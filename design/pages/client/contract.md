# Page — Contrat (Client)

**Zone** : Client  
**Route** : `/client/:projectId/contract`  
**Auth** : membre zone client (permission `read:contract`)  
**Composants** : `Badge`, `Button`, `Navbar`

---

## Objectif

Permettre au client de consulter, télécharger et signer son contrat de mission.

---

## Sections

### 1. Header

```
Contrat de mission — Projet Alpha

[EN ATTENTE DE SIGNATURE]   Proposé par : Mon Agence SAS
```

### 2. Visualiseur de document

Affichage du PDF embarqué :

```
┌──────────────────────────────────────┐
│                                      │
│         [Visualiseur PDF]            │
│                                      │
│   Contrat de Prestation de Services  │
│   Entre Mon Agence SAS et            │
│   Dupont & Associés                  │
│   ...                                │
│                                      │
│   [< Page 1/3 >]                    │
└──────────────────────────────────────┘
```

**Fallback si PDF non supporté** : "Votre navigateur ne supporte pas la prévisualisation. [Télécharger le contrat]"

### 3. Actions selon statut

#### Statut `pending`

```
Ce contrat attend votre signature.

[Télécharger le contrat]
[Signer le contrat] ← Button primary — redirige vers outil de signature externe
```

Info contextuelle :
> "La signature est gérée via un service tiers sécurisé. Vous serez redirigé pour finaliser la signature."

#### Statut `signed`

```
✓ Contrat signé le 20 janvier 2025 par Jean Dupont

[Télécharger le contrat signé]
```

Badge `success` en haut de page.

#### Statut `rejected`

```
✗ Ce contrat a été rejeté le 18 janvier 2025

Si vous souhaitez discuter des termes, contactez Mon Agence SAS via la messagerie.

[Aller à la messagerie]
```

---

## Logique de signature

1. Clic sur [Signer le contrat]
2. Redirection vers l'outil de signature externe (url dans `signature_ref`)
3. Webhook ou retour de l'outil externe met à jour le statut en base (`signed`)
4. À la prochaine consultation de la page : badge `signed` affiché

---

## États

| État | Affichage |
|---|---|
| Loading | Skeleton visualiseur |
| `pending` | Visualiseur + actions signature |
| `signed` | Visualiseur + badge + téléchargement |
| `rejected` | Message + lien messagerie |
| Aucun contrat | "Aucun contrat disponible pour ce projet pour l'instant." |
| Erreur chargement PDF | Fallback texte + bouton télécharger |

---

## Données non affichées

- Tarification interne
- Notes internes sur le contrat

---

## Responsive

| Breakpoint | Comportement |
|---|---|
| Mobile | Visualiseur pleine largeur scrollable, actions sous le PDF |
| Tablet | Visualiseur 100% + actions sous |
| Desktop | Visualiseur max 800px centré, actions à droite en sticky sidebar |
