# Documentation du projet FireSecurityRDLShop
Auteur : PLAMEDI ILUNGA ILUNGA
version : 1.0.0
Date : 26/05/2024

## Description du projet

FireSecurityRDLShop est une application web développée pour gérer une boutique en ligne spécialisée dans les équipements de sécurité incendie. Le frontend est construit avec React et TypeScript, en utilisant Vite comme outil de build et de développement. Le projet interagit avec un backend via des appels API pour gérer les produits, l'authentification et d'autres fonctionnalités clés. L'interface utilisateur est stylisée avec Tailwind CSS, et le routage est géré par react-router-dom. Ce projet est conçu pour être modulaire, maintenable et prêt pour un déploiement en production.

## Environnements du projet

Le projet est configuré pour fonctionner dans trois environnements distincts :

### Environnement de production

- Déployé sur un VPS (serveur privé virtuel)
- Utilise une version optimisée du build générée par `npm run build`
- L'URL de l'API backend est configurée dans un fichier `.env` avec la variable `VITE_API_URL` pointant vers l'URL de production (ex. https://api.firesecurityrdlshop.com)
- Accessible publiquement, avec des configurations CORS adaptées pour accepter les requêtes depuis le domaine de production

### Environnement de test (local)

- Utilisé pour tester les fonctionnalités dans un environnement simulant la production
- Hébergé localement sur la machine du développeur, généralement via `npm run dev`
- L'URL de l'API pointe vers un backend de test local (ex. http://localhost:5007) ou un serveur de test distant
- Permet de valider les fonctionnalités avant un déploiement en production

### Environnement de développement (local)

- Utilisé pour le développement actif et l'expérimentation de nouvelles fonctionnalités
- Hébergé localement avec `npm run dev`, avec rechargement à chaud (hot-reloading) via Vite
- L'URL de l'API est généralement configurée pour pointer vers un backend local (http://localhost:5007)
- Inclut des outils de développement comme ESLint pour maintenir la qualité du code

## Étape de création du projet

```bash
npm create vite@latest firesecurityrdlshop -- --template react-ts
cd firesecurityrdlshop
```

## Instructions pour installer et exécuter le code

### Prérequis

- Node.js (version 18 ou supérieure recommandée) et npm doivent être installés sur votre machine
- Un backend doit être en cours d'exécution à l'adresse http://localhost:5007/ pour que les appels API fonctionnent. Assurez-vous que le serveur backend est configuré et accessible

### Installation

1. **Clonez le dépôt :**
   ```bash
   git clone https://github.com/Plamedi-Projet-Integration/firesecurityshoprdl_web.git
   cd firesecurityshoprdl_web
   ```

2. **Installez les dépendances de base :**
   ```bash
   npm install
   ```

3. **Configurez un fichier .env pour le backend :**
   - Créez un fichier `.env` à la racine du projet
   - Ajoutez la variable suivante :
     ```
     VITE_API_URL="http://localhost:5007"
     ```
   - Remplacez `http://localhost:5007` par l'URL de votre API en production ou en test, selon l'environnement

### Exécution

1. **Lancez le serveur de développement :**
   ```bash
   npm run dev
   ```

2. **Ouvrez votre navigateur et accédez à http://localhost:5173** (port par défaut de Vite, sauf si modifié dans `vite.config.ts`)

## Démarrage du projet

Pour démarrer le projet en mode développement :
```bash
npm run dev
```

## Associer à un dépôt Git

Pour associer le projet à un dépôt Git dans votre organisation :
```bash
git init
git remote add origin https://github.com/votre-organisation/nom-repo.git
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

## Build pour la production

1. **Créez une version optimisée pour la production :**
   ```bash
   npm run build
   ```

2. **Prévisualisez la version build :**
   ```bash
   npm run preview
   ```

## Liste des dépendances et outils utilisés

### Dépendances principales

- **jwt-decode**: Décodage des tokens JWT pour l'authentification
- **match-sorter**: Tri et filtrage des données (ex. listes de produits)
- **react-icons**: Fournit des icônes pour l'interface utilisateur (ex. CiImageOn)
- **react-router-dom**: Gestion du routage dans l'application (ex. /edit-product/:id)

### Outils et dépendances de développement

- **Vite**: Bundler rapide pour le développement et la production
- **TypeScript**: Typage statique pour un code robuste
- **React**: Bibliothèque pour la création d'interfaces utilisateur
- **Tailwind CSS**: Framework CSS utilitaire pour le style
- **ESLint**: Outil de linting pour maintenir la qualité du code
- **Sass**: Préprocesseur CSS (inclus dans devDependencies)

## Appels API

Le frontend interagit avec un backend via des appels API à l'adresse configurée dans `VITE_API_URL` (par défaut http://localhost:5007).

### Configuration de l'API

- Le backend doit accepter les requêtes CORS depuis http://localhost:5173 (ou le domaine de production)
- Un token d'authentification Bearer, stocké dans localStorage sous la clé `bearerToken`, est requis pour les requêtes API
- Les requêtes incluent l'en-tête `Authorization: Bearer <token>`
- En production, mettez à jour `VITE_API_URL` dans le fichier `.env` pour pointer vers l'URL du backend de production