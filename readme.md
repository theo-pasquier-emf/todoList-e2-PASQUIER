# Mini-projet CI/CD - Application de gestion de tâches

## Contexte

Une application web de gestion de tâches vous est fournie. Il s'agit d'une application simple basée sur Node.js et Express, avec un frontend HTML/CSS/JavaScript statique.

Votre travail consiste à reprendre ce code source et à mettre en place une chaîne CI/CD complète permettant d'aller du dépôt GitHub jusqu'au déploiement de l'application sur Kubernetes, avec une approche GitOps via ArgoCD.

## Objectif

L'objectif du projet est de construire une chaîne de livraison simple et cohérente autour de l'application fournie :

* versionner le code dans un dépôt GitHub ;
* mettre en place une intégration continue avec GitHub Actions ;
* construire et publier une image Docker de l'application ;
* décrire le déploiement de l'application sur Kubernetes ;
* déployer l'application via ArgoCD.

## Travail demandé

Vous devez réaliser les éléments suivants, dans cet ordre logique :

1. Créer un dépôt GitHub contenant le code fourni.
2. Mettre en place un workflow GitHub Actions de CI dédié au linting.
3. Mettre en place un workflow GitHub Actions de CD qui build une image Docker, le tag puis la pousse dans Azure Container Registry (ACR).
4. Fournir un descripteur Kubernetes permettant de déployer l'application.
5. Réaliser une `Application` AgroCD pointant vers le descripteur de déploiement de l'application.

## Contraintes techniques imposées

Pour cet exercice, les choix techniques suivants sont imposés :

* le linting doit être réalisé avec `ESLint` ;
* l'image applicative doit être construite avec un `Dockerfile` ;
* les workflows GitHub Actions de CI et de CD doivent être séparés ;
* le déploiement Kubernetes doit être décrit avec des manifests YAML standard ;

## Attendus par livrable

### 1. Dépôt GitHub

Le code fourni doit être placé dans un dépôt GitHub propre et exploitable. Le dépôt doit contenir l'ensemble des fichiers nécessaires à l'exécution du projet et à la mise en œuvre de la chaîne CI/CD.

### 2. Workflow GitHub Actions de CI

Vous devez fournir un workflow distinct pour la CI. Ce workflow doit au minimum :

* se déclencher sur `push` et/ou `pull_request` ;
* installer la bonne version de Node.js ;
* installer les dépendances du projet ;
* exécuter le linting avec `ESLint`.

Le but de cette CI est de vérifier automatiquement la qualité statique du code.

### 3. Workflow GitHub Actions de CD

Vous devez fournir un second workflow distinct pour la CD. Ce workflow doit au minimum :

* se déclencher selon une logique cohérente avec un déploiement ;
* construire l'image Docker de l'application ;
* taguer l'image de façon exploitable ;
* se connecter à Azure Container Registry ;
* pousser l'image dans ACR.

Le workflow doit utiliser des variables ou secrets GitHub adaptés. 

### 4. Descripteur Kubernetes

Vous devez fournir un manifeste Kubernetes YAML standard permettant de déployer l'application sur un cluster.

Le descripteur doit inclure au minimum :

* une ressource `Deployment` ;
* une ressource `Service` ;
* une image provenant d'Azure Container Registry ;
* un port exposé cohérent avec l'application Node.js/Express.

Le manifest doit être suffisamment clair pour permettre un déploiement direct sur un cluster Kubernetes déjà disponible.

### 5. Application ArgoCD

Vous devez créer une nouvelle application sur ArgoCD qui aura la responsabilité de redéployer automatiquement l'application sitôt qu'un changement dans le code est effectué.

### 6. Documentation

Vous documenterez les différentes étapes réalisés dans un fichier en format markdown disponible sur votre repository.

## Contraintes et hypothèses

Pour cet exercice, les hypothèses suivantes sont à prendre en compte :

* l'application source est une application Node.js/Express simple ;
* Azure Container Registry est déjà disponible ;
* le cluster Kubernetes cible est déjà disponible, vous pouvez utiliser le même accès que vous utilisiez durant le module ;
* ArgoCD est déjà installé et accessible, vous pouvez utiliser le même accès que vous utilisiez durant le module ;


## Critères de réussite

Le rendu sera considéré comme satisfaisant si :

* le dépôt GitHub est propre, complet et exploitable ;
* le workflow de CI s'exécute correctement ;
* la CI échoue si le linting échoue ;
* le workflow de CD construit bien une image Docker exploitable ;
* l'image est poussée correctement dans ACR ;
* le manifest Kubernetes est valide et déployable ;
* l'application Kubernetes référence bien l'image publiée ;
* les sources sur GitHub ne contiennent pas d'éléments sensibles au niveau de la sécurité (username / password)
* ArgoCD est en mesure de synchroniser le déploiement ;
* la démonstration finale est claire et structurée ;
* les choix techniques sont expliqués de façon compréhensible ;
* les questions posées sur le workflow CI/CD reçoivent des réponses pertinentes;
* la documentation est complète, tous les points réalisés pour mettre en place ce qui est demandé dans cette consigne y figurent.

## Démonstration finale attendue

En fin de travail, une démonstration devra être réalisée.

Cette démonstration doit inclure :

* une présentation synthétique du dépôt et de l'organisation des fichiers utiles à la CI/CD ;
* une explication du workflow de CI ;
* une explication du workflow de CD ;
* une explication du rôle du `Dockerfile`, des manifests Kubernetes et de la ressource ArgoCD ;
* une illustration du chemin complet entre le commit, la CI, la construction de l'image, le push dans ACR et le déploiement.

Lors de cette démonstration, vous devez être capables :

* d'expliquer vos choix de déclencheurs GitHub Actions ;
* d'expliquer les secrets, variables et paramétrages utilisés ;
* d'expliquer comment l'image Docker est identifiée et réutilisée ;
* d'expliquer comment Kubernetes déploie l'application ;
* d'expliquer comment ArgoCD détecte et applique l'état attendu ;
* de répondre aux questions posées sur le fonctionnement général du workflow CI/CD.