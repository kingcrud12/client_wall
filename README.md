# Client wall

**Client wall** est une web app permettant aux freelances, entreprises, associations de créer des espaces pour gérer leurs clients et leurs collaborateurs : sur ces espaces , ces derniers peuvent retrouver : le contrat signé, les factures, l'avancement du projet, uploader des fichiers, payer une facture via stripe. discuter avec le freelance.

Les freelances peuvent quant à eux : mettre à jour l'état d'avancement d'un projet avec des captures d'écrans à l'appui, uploader des fichiers, discuter avec le client

Les vues :

- une vue propriétaire (prestataires, entreprises)
- une vue usager (collaborateurs, clients)

Parcours :

Le propriétaire crée un workspace

- zone admin / zone client / zone collaborateurs (Primo parcours)

## Zone admin

La zone admin est l’espace principal du propriétaire du workspace, c’est-à-dire le freelance, le prestataire ou l’entreprise.
Elle lui permet de piloter l’ensemble de la relation client, l’organisation documentaire, la collaboration interne et le suivi financier.

### Objectifs de la zone admin

La zone admin doit permettre au propriétaire de :

- créer et configurer son workspace ;
- administrer les paramètres globaux de l’espace.
- gérer ses clients et ses collaborateurs ;
- gérer les accès et les permissions ;
- communiquer avec les clients et les collaborateurs ;
- créer et suivre les projets ;
- centraliser les documents, contrats et factures ;
- suivre les paiements ;

## Zone collaborateurs

c'est l'espace de travail interne pour l'équipe du prestataire.
La zone collaborateur est conçue pour l'exécution et la production. Elle permet aux membres de l'équipe (employés, sous-traitants) de gérer les tâches quotidiennes sans forcément avoir accès aux données sensibles du compte (chiffre d'affaires global, paramètres de facturation Stripe du propriétaire).

### Objectifs de la zone admin

La zone collaborateurs doit permettre aux collaborateurs d'accéder :

- Au Tableau de bord Projets
- Mettre à jour d'Avancement : Outil permettant de changer l'état d'un projet (ex: "En cours" à "Révision") et d'ajouter des captures d'écran pour validation.
- Faire la gestion Documentaire : Upload de livrables et accès aux fichiers sources partagés par le client.
- Communiquer en Interne & Externe : Messagerie permettant de discuter avec le propriétaire (en interne) ou directement avec le client (si autorisé par le propriétaire).
- Mettre à jour Feuille de temps (Optionnel) : Log des heures passées sur chaque phase du projet.

Accès Restreint : Le collaborateur voit les factures liées à son projet pour suivi, mais ne peut généralement pas modifier les coordonnées bancaires du workspace.

## Zone client

c'est l'espace de transparence et de self-service pour l'usager final.

La zone client est un portail "en lecture seule" pour la structure du projet, mais "en lecture/écriture" pour la collaboration et le paiement. L'objectif est de rassurer le client et de centraliser tous ses échanges.

### Objectifs de la zone client

La zone client client doit permettre au client de :

- Consulter et télécharger le contrat signé (PDF).

- Consulter l'historique des factures avec indicateur de statut (Payé / En attente).

- De payer une facture via un bouton intégrant stripe pour régler les factures instantanément par CB.

- Suivre ée Projet (Timeline) :

- Visualisation de la barre de progression.

- Accès aux captures d'écran déposées par le collaborateur/freelance pour valider les étapes.

- Centre de Partage :

- Zone d'upload pour envoyer les éléments nécessaires au prestataire (logos, textes, briefs).

- Accès aux livrables finaux.

- Messagerie Directe : Fil de discussion unique avec le prestataire pour éviter les emails perdus.

## Fonctionnalités

Plusieurs fonctionnalités seront implémentées, les principales sont :

- l'authentification
- le paiement
- le chat (messagerie)
- notification
- upload et stockage de documents

Il faudrait penser à intégrer d'autres services tiers à l'avenir tel que gmail, outlook

L'app est un bureau virtuel permettant à un presta d'organiser sa communication avec des clients

## Monétisation
Freemium (gratuit jusqu'à 2 clients) puis 5 €/mois.

3 plans :

gratuit : 2 clients max / nombre de sièges : 0 / espace de stockage : 2 Go / taille de fichiers : 10 MB

Medium : 10 clients max/ nombre de sièges : 2 / espace de stockage : 20 Go / taille de fichiers : 50 MB

Extra : 20 clients max / nombre de sièges : 5 / espace de stockage : 40 Go / taille de fichiers : 100 MB

More, contact us to set up entreprise plan

stockage peut couter : 1 euro / mois pour 10 Go de fichiers stockés

serveur web et bdd : 15 euros / mois

domaine et hebergement : 10 euros / an

Sur l'année : 250

Il faut avoir au moins : 300 euros de bénéfices la première année
