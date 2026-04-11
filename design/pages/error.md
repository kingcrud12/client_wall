# Page — Erreur générique

**Zone** : Toutes  
**Route** : Aucune route fixe — rendue en overlay ou en remplacement du contenu selon le contexte  
**Auth** : Indépendant  
**Composants** : `Button`

---

## Objectif

Informer l'utilisateur qu'une erreur inattendue s'est produite (erreur 500, erreur réseau, crash JS) et lui proposer des actions de récupération.

---

## Variantes

### 1. Erreur pleine page (crash critique)

Utilisée quand l'application ne peut pas afficher la zone courante (ex : crash de l'ErrorBoundary React, erreur 503).

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│                   ⚠                                  │
│           Une erreur est survenue                    │
│                                                      │
│  Quelque chose s'est mal passé de notre côté.        │
│  Nos équipes ont été notifiées.                      │
│                                                      │
│       [Recharger la page]   [Retour à l'accueil]    │
│                                                      │
└──────────────────────────────────────────────────────┘
```

- **Icône** : triangle d'alerte (`--color-warning-500`), 48px
- **Titre** : "Une erreur est survenue"
- **Corps** : "Quelque chose s'est mal passé de notre côté. Nos équipes ont été notifiées."
- **CTA principal** : [Recharger la page] — `Button primary` → `window.location.reload()`
- **CTA secondaire** : [Retour à l'accueil] — `Button secondary` → destination selon zone active (même logique que 404)

### 2. Erreur inline (section dégradée)

Utilisée quand une section de la page échoue à charger, sans bloquer le reste de l'interface.

```
┌──────────────────────────────────────────────────────┐
│  Impossible de charger cette section.                │
│  [Réessayer]                                         │
└──────────────────────────────────────────────────────┘
```

- Fond `--color-error-50`, bordure `--color-error-200`
- Texte `--color-error-700`
- Bouton [Réessayer] → `Button ghost` (relance la requête)

### 3. Erreur réseau (toast)

Utilisée pour les actions ponctuelles échouant en arrière-plan (ex : échec d'enregistrement d'un formulaire).

```
[✗] Impossible de sauvegarder. Vérifiez votre connexion.   [Réessayer]
```

Implémentée via le composant Toast avec variant `error`. Durée : persist jusqu'à action ou fermeture manuelle.

---

## Codes d'erreur couverts

| Code HTTP | Variante | Message |
|---|---|---|
| 400 | Toast error | "Requête invalide. Vérifiez les données saisies." |
| 401 | Pleine page | "Votre session a expiré. Reconnectez-vous." + CTA [Se reconnecter] → `/auth/login` |
| 403 | Pleine page ou inline | "Vous n'avez pas accès à cette ressource." |
| 404 | → Page 404 dédiée | — |
| 500 | Pleine page | "Une erreur serveur est survenue. Nos équipes ont été notifiées." |
| 503 | Pleine page | "Service temporairement indisponible. Réessayez dans quelques minutes." |
| Réseau | Toast error | "Impossible de se connecter. Vérifiez votre connexion." |

---

## Règles de comportement

- Ne jamais afficher de stack trace ou de message d'erreur technique à l'utilisateur.
- Les erreurs 401 déclenchent une déconnexion et une redirection vers `/auth/login` avec un paramètre `?session_expired=1` pour afficher un message dédié.
- Les erreurs sont loguées côté client (console + service de monitoring à définir).
- En cas d'erreur pendant un formulaire multi-étapes, conserver les données saisies.

---

## États

Composant statique selon la variante. Aucune interaction au-delà des CTAs définis.

---

## Responsive

Variante pleine page : centré verticalement et horizontalement. Padding 24px mobile, 48px desktop.  
Variante inline : largeur 100% du conteneur parent.
