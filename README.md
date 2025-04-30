# frontend

## Étape de création du projet
```bash
npm create vite@latest firesecurityrdlshop -- --template react-ts
cd firesecurityrdlshop
```

## Démarrage du projet
```bash
npm install
npm run dev
```

## Associer à mon repos git de mon organisation
- `git init`
- `git remote add origin https://github.com/votre-organisation/nom-repo.git`
- `git add .`
- `git commit -m "Initial commit"`
- `git branch -M main`
- `git push -u origin main`

## Instructions pour installer et exécuter le code

### Prérequis
- **Node.js** (version 18 ou supérieure recommandée) et **npm** doivent être installés sur votre machine.
- Un backend doit être en cours d'exécution à l'adresse `http://localhost:5007/` pour que les appels API fonctionnent. Assurez-vous que le serveur backend est configuré et accessible.

### Installation
1. Clonez le dépôt :
```bash
   git clone https://github.com/Plamedi-Projet-Integration/firesecurityshoprdl_web.git
   cd firesecurityshoprdl_web
```
2. Installez les dépendances de base :
```bash
   npm install
```
3. Installez les dépendances supplémentaires nécessaires au projet :
```bash
   npm install jwt-decode  match-sorter react-icons react-router-dom 
```
4. (Optionnel) Pour le backend , configurez un .env en y mettant : 
VITE_API_URL = "mon adresse api".

### Exécution
1. Lancez le serveur de développement :
```bash
   npm run dev
```
2. Ouvrez votre navigateur et accédez à `http://localhost:5173` (port par défaut de Vite, sauf si modifié dans `vite.config.ts`).

### Build pour la production
1. Créez une version optimisée pour la production :
```bash
   npm run build
```
2. Prévisualisez la version build :
```bash
   npm run preview
```

## Liste des dépendances et outils utilisés

### Dépendances principales (installées manuellement après la création du projet)
- `jwt-decode`: Utilisé pour décoder les tokens JWT pour l’authentification.
- `match-sorter`: Utilisé pour trier et filtrer les données (par exemple, dans les listes).
- `react-icons`: Fournit des icônes (ex. `CiImageOn`) pour les interfaces utilisateur.
- `react-router-dom`: Gère le routage dans l’application (ex. navigation entre pages comme `/edit-product/:id`).

### Outils et dépendances de développement
- **Vite**: Bundler rapide pour le développement et la production.
- **TypeScript**: Ajoute un typage statique au projet.
- **React**: Bibliothèque pour construire des interfaces utilisateur.
- **Tailwind CSS**: Framework CSS utilitaire pour le style (utilisé dans tout le projet).
- **ESLint**: Outil de linting pour maintenir la qualité du code.
- **Sass**: Préprocesseur CSS (bien que non explicitement utilisé dans les snippets fournis, inclus dans `devDependencies`).

## Appels API
Ce projet frontend interagit avec un backend via des appels API à l’adresse `http://localhost:5007/`. Les appels API nécessitent un token d’authentification Bearer stocké dans `localStorage` (clé `bearerToken`)

### Configuration de l’API
- Assurez-vous que le backend est configuré pour accepter les requêtes CORS depuis `http://localhost:5173` (port de développement de Vite).
- Un token d’authentification valide doit être stocké dans `localStorage` sous la clé `bearerToken`. Ce token est envoyé dans l’en-tête `Authorization` de chaque requête API (ex. `Authorization: Bearer <token>`).
- Si l’URL du backend change (par exemple, en production), mettez à jour la constante `api_url` dans les composants (ex. `Product.tsx`, `EditProduct.tsx`, etc.).

## URL et commits du dépôt git

  Voici la liste des commits :
  - Premier commit contenant la structure de base de mon application en react-vite (Plamedi) [[6c86e32]](https://github.com/Plamedi-Projet-Integration/firesecurityshoprdl_web/commit/6c86e32fdd38cdb5b1d111d49c4131e852259365)
  - Création des bases de pages suivantes (Plamedi) [[22ebd96]](https://github.com/Plamedi-Projet-Integration/firesecurityshoprdl_web/commit/22ebd96a2028c57abbc9d9b90273ddc83e03c8ec)
  - Affichage d'utilisateurs avec une base de donnée de test afin de vérifier la connexion avec l'API (Plamedi) [[79a9fee]](https://github.com/Plamedi-Projet-Integration/firesecurityshoprdl_web/commit/79a9fee181d46edd90a467591b4ecca0555e0664)
  - Mis à jour de la documentation de départ dans le ReadMe (Plamedi) [[a31f6d1]](https://github.com/Plamedi-Projet-Integration/firesecurityshoprdl_web/commit/a31f6d11d9ac47e7d13571cc9b05664a0df1480f)

