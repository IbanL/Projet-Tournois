<a id="readme-top"></a>

<h1 align="center">Projet Tournois</h1>
<h2 align="center">Projet pour le TP DWWM Bayonne</h2>

<h3 align="center">À propos<h3>

<div align="center">

Site de gestion de Tournois de sport / jeu

</div>

## Table des matières

- [Sujet](#sujet)
- [Fonctionnalité](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation, configuration et lancement du projet](#installation-configuration-et-lancement-du-projet)
- [Dépendances](#dépendances)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Test en tant qu'admin](#test-en-tant-quadmin)
- [Arborescence](#arborescence)
- [Tests](#tests)
<!-- - [Demo](#demo)
  - [Backend - Render](#backend---render)
  - [Frontend - Vercel](#frontend---vercel) -->

## Sujet

Creation d'un site de gestion de tournois permettant la creation, gestion des matchs et suivi des tournois d'un compte.

## Fonctionnalités

- Gestion des utilisateurs (création, affichage, connexion)
- Gestion des tournois (création, affichage, inscription, desinscription suppression)
- Gestion des matches (assignement des joueurs automatique, validation des resultats)
- Authentification sécurisée (JWT & bcrypt)

## Technologies utilisées

<div align="center">

[![My Skills](https://skillicons.dev/icons?i=vscode,git,github,postman,nodejs,npm,javascript,express,mongodb,vite,react)](https://skillicons.dev)

</div>

## Prérequis

- npm :

  ```sh
  npm install npm@latest -g
  ```

  </br>

## Installation, configuration et lancement du projet

1.  Cloner le répertoire :

    ```sh
    git clone https://github.com/IbanL/Projet-Tournois.git
    ```

<br/>

2.  Installer les dépendances pour le backend et le frontend (sur deux terminaux différents):

    ```ini
    cd client
    npm i

    cd server
    npm i
    ```

    <br/>

3.  Créer un fichier `.env` dans le dossier backEnd avec les variables suivantes :

    ```ini
    PORT = le_port_sohaité (e.g 3001)

    # MongoDB
    MONGO_URI = votre_uri_mongodb

    # JsonWebToken
    JWT_SECRET = votre_phrase_secrète
    ```

<br/>

 4.  Créer un fichier `.env` dans le dossier frontEnd avec les variables suivantes :

    ```ini
        VITE_API_URL = http://localhost:3001/api/
    ```

<br/>

5.  Lancer les serveurs backend et frontend (sur deux terminaux différents):

    ```ini
    cd server
    npm start

    cd client
    npm run dev
    ```

    <p align="right">(<a href="#readme-top">back to top</a>)</p>

## Dépendances

### Frontend

```ini
  "dependencies": {
    "axios": "^1.9.0",
    "dotenv": "^16.5.0",
    "js-cookie": "^3.0.5",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.56.1",
    "react-router-dom": "^7.5.3"
  }
```

### Backend

```ini
  "dependencies": {
    "bcrypt": "^5.1.1",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "express-validator": "^7.2.1",
    "helmet": "^8.1.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.13.0",
    "multer": "^1.4.5-lts.2",
    "nodemon": "^3.1.9"
  }
```


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Arborescence

```bash
└── 📁Projet-Tournois
    └── 📁Client
        └── .env
        └── .gitignore
        └── eslint.config.js
        └── index.html
        └── package-lock.json
        └── package.json
        └── 📁public
            └── EDUCENTRE_RNCP37873_REAC.pdf
            └── icon.webp
        └── README.md
        └── 📁src
            └── App.css
            └── App.jsx
            └── 📁assets
                └── logo.webp
            └── 📁components
                └── 📁Navbar
                    └── navbar.css
                    └── Navbar.jsx
            └── index.css
            └── main.jsx
            └── 📁pages
                └── 📁Home
                    └── home.css
                    └── Home.jsx
                └── 📁Login
                    └── login.css
                    └── Login.jsx
                └── 📁Register
                    └── register.css
                    └── Register.jsx
                └── 📁Tournament
                    └── tournament.css
                    └── Tournament.jsx
            └── 📁utils
                └── ProtectedRoute.jsx
        └── vite.config.js
    └── 📁Server
        └── .env
        └── 📁config
            └── db.js
        └── 📁controllers
            └── matchController.js
            └── tournamentController.js
            └── userController.js
        └── 📁middlewares
            └── authMiddleware.js
            └── errorHandler.js
            └── validateRequest.js
        └── 📁models
            └── Match.js
            └── Tournament.js
            └── User.js
        └── package-lock.json
        └── package.json
        └── 📁routes
            └── matchRoutes.js
            └── tournamentsRoutes.js
            └── userRoutes.js
        └── server.js
        └── 📁validations
            └── matchValidation.js
            └── tournamentValidation.js
            └── userValidation.js
    └── .gitignore
    └── README.md
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Tests

- **Postman** : Tests des routes API

</br>
<div align="center">

| Method | Path                          | Desc                            |
| :----- | :---------------------------- | :------------------------------ |
| GET    | /api/users/                   | Afficher tous les utilisateurs  |
| POST   | /api/users/register           | Ajouter un utilisateur          |
| PUT    | /api/users/:id                | Modifier un utilisateur         |
| GET    | /api/users/:id                | Affiche un utilisateur          |
| POST   | /api/users/login              | Connecter un utilisateur        |
| GET    | /api/users/logout             | Déconnecter un utilisateur      |
| GET    | /api/tournaments/             | Affiche tous les tournois       |
| GET    | /api/tournaments/10           | Affiche les 10 derniers tournois|
| POST   | /api/tournaments/             | Creér un tournoi                |
| GET    | /api/tournaments/:id          | Affiche un tournoi              |
| POST   | /api/tournaments/:id/register | S'inscrire à un tournoi         |
| PUT    | /api/tournaments/:id          | Modifier un tournoi             |
| DELETE | /api/tournaments/:id/player   | Se desinscrire d'un tournoi     |
| DELETE | /api/tournaments/:id/         | Supprimer un tournoi            |
| POST   | /api/tournaments/:id/start    | Démare un tournoi               |
| GET    | /api/matches/                 | Affiche tous les matches        |
| GET    | /api/matches/:id              | Affiche un match                |
| PUT    | /api/matches/:id              | Declare un joueur comme gagnant |

</div>

<!-- ## Déploiement

 -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>
