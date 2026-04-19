# Ton et Voix — Client Wall

---

## Principes fondamentaux

### 1. Direct, sans détour

Client Wall parle clairement. On ne tourne pas autour du pot, on ne noie pas dans les explications.

```
✓ "Votre facture a été payée."
✗ "Il semblerait que votre transaction ait bien été enregistrée par notre système."

✓ "Accès refusé."
✗ "Malheureusement, nous ne sommes pas en mesure de vous donner accès à cette ressource."
```

### 2. Humain sans être familier

Le ton est chaleureux mais professionnel. On ne dit pas "tutoyer par défaut", on ne dit pas "Hey !" non plus.

```
✓ "Bonjour, bienvenue dans votre espace."
✓ "Votre rapport a bien été publié."
✗ "Waouh, votre rapport est en ligne !"
✗ "Nous sommes ravis de vous accueillir dans notre plateforme."
```

### 3. Actif, pas passif

Les verbes actifs, les tournures positives.

```
✓ "Créer un projet"
✗ "Un projet peut être créé"

✓ "Vous n'avez pas la permission de modifier cette facture."
✗ "La modification n'est pas autorisée pour ce rôle."
```

### 4. Précis sur les données sensibles

Sur les permissions, les erreurs financières ou les suppressions : être explicite sur ce qui se passe, sans ambiguïté.

```
✓ "Cette action supprimera définitivement le document. Cette opération est irréversible."
✗ "Êtes-vous sûr ?"
```

### 5. Calme face aux erreurs

Les erreurs ne sont pas catastrophiques. On informe, on propose une sortie.

```
✓ "Impossible de charger les factures. Vérifiez votre connexion et réessayez."
✗ "ERREUR : Échec de la requête (500)"

✓ "Aucune facture pour l'instant."
✗ "Aucun résultat trouvé."
```

---

## Registre par zone

### Zone Admin (Owner / Manager)
- Ton : efficace, dense, informationnel
- Vocabulaire métier assumé (workspace, zone, permission, rôle)
- Actions nommées avec précision (Émettre, Valider, Archiver, Exposer)

### Zone Collaborateurs
- Ton : collaboratif, orienté tâche
- Vocabulaire : feuille de temps, timesheet, livrable, rapport
- Moins de vocabulary de gestion, plus d'opérationnel

### Zone Client
- Ton : rassurant, pédagogique si besoin
- Vocabulaire simplifié (pas de "zone", pas de "workspace")
- Éviter le jargon technique
- Toujours indiquer qui fait quoi ("Mon Agence vous a partagé...")

---

## Exemples par contexte

### Labels de boutons

| ✓ Bon | ✗ Mauvais |
|---|---|
| Émettre la facture | Valider |
| Soumettre pour validation | Envoyer |
| Retirer du projet | Supprimer le membre |
| Ajouter un document | Upload |
| Exposer à la zone client | Partager |
| Télécharger le PDF | Exporter |

### Messages de confirmation

```
✓ "Cette facture sera émise et ne pourra plus être modifiée. Continuer ?"
✗ "Confirmer l'action ?"

✓ "Le document sera exposé à tous les membres de la Zone Client Alpha."
✗ "Voulez-vous partager ?"
```

### Messages de succès (toast)

```
✓ "Facture émise. Un lien de paiement a été généré."
✓ "Rapport publié. La Zone Client peut maintenant le consulter."
✓ "Membre invité. Marie Martin recevra un email."
✗ "Succès !"
✗ "Opération terminée avec succès."
```

### Messages d'erreur

```
✓ "Votre session a expiré. Reconnectez-vous pour continuer."
✓ "Ce fichier dépasse la limite de 10 MB de votre plan."
✓ "Impossible d'envoyer le message. Vérifiez votre connexion."
✗ "Error 401"
✗ "Une erreur est survenue."
```

### États vides

```
✓ "Aucune facture pour ce projet. [Créer la première facture]"
✓ "Aucun document partagé pour l'instant. L'équipe ajoutera des fichiers prochainement."
✓ "Aucun message. Démarrez la conversation."
✗ "No results found."
✗ "Aucune donnée."
```
