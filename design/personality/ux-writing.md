# UX Writing — Règles de rédaction UI

Règles spécifiques de rédaction pour chaque type d'élément de l'interface.

---

## Labels de formulaire

**Règle** : courts, sans "Veuillez entrer", sans article.

```
✓ Adresse email
✓ Raison sociale
✓ Date d'échéance
✓ Taux TVA

✗ Veuillez entrer votre adresse email
✗ Le nom de votre raison sociale
✗ Entrez la date d'échéance
```

**Placeholders** : exemple concret, jamais une répétition du label.

```
✓ Label : "Email"  → Placeholder : "vous@entreprise.com"
✓ Label : "SIRET"  → Placeholder : "123 456 789 00000"
✓ Label : "Montant HT" → Placeholder : "0,00"

✗ Label : "Email"  → Placeholder : "Entrez votre email"
```

---

## Labels de boutons

**Règle** : verbe à l'infinitif ou à l'impératif + complément si ambigu.

| Contexte | Label |
|---|---|
| Création générique | Créer, Ajouter, Nouveau |
| Création spécifique | Créer un projet, Ajouter un membre, Nouveau rapport |
| Sauvegarde | Enregistrer, Sauvegarder |
| Soumission | Soumettre, Émettre, Publier |
| Annulation (dialog) | Annuler |
| Confirmation positive | Confirmer, Valider, Oui, supprimer |
| Retour | Retour, ← Retour aux projets |
| Actions destructives | Supprimer le projet, Retirer du workspace, Révoquer l'accès |

---

## Titres de pages

Format : `[Objet] — [Contexte]`

```
✓ "Factures — Projet Alpha"
✓ "Membres & Rôles — Projet Alpha"
✓ "Rapports d'avancement — Projet Alpha"
✓ "Paramètres — Mon Agence"

✗ "Gestion des factures"
✗ "Vue membre"
```

---

## Titres de dialogs / modales

Courts, orientés action ou confirmation.

```
✓ "Inviter un membre"
✓ "Supprimer ce document ?"
✓ "Émettre la facture #2024-0042"
✓ "Créer un rôle"

✗ "Confirmation de l'action"
✗ "Avertissement"
```

---

## Messages de statut

### Badges

Texte court, nom du statut traduit.

| Statut technique | Label FR |
|---|---|
| `draft` | Brouillon |
| `issued` | Émise |
| `paid` | Payée |
| `overdue` | En retard |
| `partially_paid` | Part. payée |
| `refund` | Remboursée |
| `in_progress` | En cours |
| `submitted` | Soumise |
| `validated` | Validée |
| `pending` | En attente |
| `signed` | Signé |
| `rejected` | Refusé |
| `published` | Publié |
| `archived` | Archivé |
| `todo` | À faire |
| `done` | Terminé |

---

## Dates et heures

- Toujours en français : `15 janv. 2025`, `le 15 janvier 2025`
- Dates relatives pour les événements récents : "il y a 2 heures", "hier", "il y a 3 jours"
- Dates absolues au-delà de 7 jours
- Format heure : `10:30` (pas 10h30 dans l'interface)

```javascript
// Date relative
"il y a 2 heures" / "hier" / "il y a 3 jours"

// Date courte
"15 janv. 2025"

// Date longue
"15 janvier 2025 à 10:30"
```

---

## Montants financiers

- Toujours avec 2 décimales : `1 500,00 €`
- Symbole euro après le montant (convention française)
- Espace fine avant l'euro : `1 500,00 €`
- Séparateur de milliers : espace fine
- Séparateur décimal : virgule
- Sur mobile : `1 500 €` acceptable (sans centimes si .00)

```javascript
Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(1500)
// → "1 500,00 €"
```

---

## Données personnelles

Toujours `Prénom Nom` dans l'ordre français. Jamais de civilité (M., Mme) imposée.

---

## Messages d'erreur de formulaire

**Règle** : dire ce qui est faux + comment corriger.

```
✓ "Adresse email invalide. Vérifiez le format (exemple@domaine.fr)."
✓ "Le SIRET doit contenir 14 chiffres."
✓ "Le mot de passe doit contenir au moins 8 caractères."
✓ "Ce slug est déjà utilisé. Essayez 'mon-agence-2'."

✗ "Champ requis."
✗ "Format invalide."
✗ "Erreur."
```

---

## Notifications (toasts)

- Durée d'affichage : 4 secondes (succès), 8 secondes (erreur), persistant (critique)
- Succès : concis, positif, sans ponctuation finale inutile
- Erreur : concis + action si possible

```
✓ [✓ Succès] "Rapport publié avec succès."
✓ [⚠ Attention] "La facture a été émise, mais l'email de notification n'a pas pu être envoyé."
✓ [✗ Erreur] "Échec de l'envoi. Vérifiez votre connexion et réessayez."
```

---

## Accessibilité du texte

- Contraste minimum WCAG AA : 4.5:1 pour texte normal, 3:1 pour grand texte
- Jamais d'information véhiculée uniquement par la couleur (toujours un texte ou icône)
- Les états d'erreur ont un texte d'erreur associé (pas uniquement une bordure rouge)
- Les icônes seules ont un `aria-label`

---

## Internationalisation (i18n)

Le produit est pensé pour être traduit. Règles :
- Jamais de texte codé en dur dans les composants
- Toutes les chaînes dans des fichiers de traduction (`fr.json`, `en.json`)
- Les pluriels sont gérés (0 projet, 1 projet, 2 projets)
- Les dates et montants utilisent `Intl` APIs

Locale cible initiale : **fr-FR**. Locale secondaire : **en-US**.
