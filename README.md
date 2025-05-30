# SmartNote - Application de Prise de Notes

Une application web moderne et intuitive pour créer, organiser et gérer vos notes personnelles.

## 🚀 Fonctionnalités

- **Authentification sécurisée** : Inscription et connexion avec JWT
- **Gestion complète des notes** : Créer, modifier, supprimer vos notes
- **Recherche avancée** : Recherche par titre, contenu ou tags
- **Organisation intelligente** : Tri par date, titre, épinglage des notes importantes
- **Interface responsive** : Optimisée pour desktop et mobile
- **Tags personnalisés** : Organisez vos notes avec des étiquettes
- **Sauvegarde automatique** : Toutes vos données sont sécurisées en base

## 🛠️ Technologies Utilisées

### Backend
- **Node.js** & **Express.js** - Serveur et API REST
- **MongoDB** & **Mongoose** - Base de données et ODM
- **JWT** - Authentification sécurisée
- **bcryptjs** - Chiffrement des mots de passe

### Frontend
- **React 18** & **TypeScript** - Interface utilisateur moderne
- **React Router DOM** - Navigation SPA
- **Tailwind CSS** - Design responsive et moderne
- **Axios** - Client HTTP
- **React Hot Toast** - Notifications utilisateur
- **Lucide React** - Icônes modernes

## 📦 Installation

### Prérequis
- Node.js (v16 ou supérieur)
- MongoDB (local ou Atlas)
- npm ou yarn

### Backend

1. **Cloner le projet**
\`\`\`bash
git clone <votre-repo>
cd smartnote/backend
\`\`\`

2. **Installer les dépendances**
\`\`\`bash
npm install
\`\`\`

3. **Configuration**
\`\`\`bash
cp .env.example .env
\`\`\`
Modifiez le fichier `.env` avec vos paramètres :
\`\`\`env
MONGODB_URI=mongodb://localhost:27017/smartnote
JWT_SECRET=votre_secret_jwt_super_securise
PORT=5000
NODE_ENV=development
\`\`\`

4. **Démarrer le serveur**
\`\`\`bash
# Mode développement
npm run dev

# Mode production
npm start
\`\`\`

### Frontend

1. **Aller dans le dossier frontend**
\`\`\`bash
cd ../frontend
\`\`\`

2. **Installer les dépendances**
\`\`\`bash
npm install
\`\`\`

3. **Configuration**
\`\`\`bash
cp .env.example .env
\`\`\`
Modifiez le fichier `.env` :
\`\`\`env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
\`\`\`

4. **Démarrer l'application**
\`\`\`bash
npm start
\`\`\`

L'application sera accessible sur `http://localhost:3000`

## 🏗️ Structure du Projet

\`\`\`
smartnote/
├── backend/
│   ├── models/          # Modèles MongoDB
│   ├── routes/          # Routes API
│   ├── middleware/      # Middlewares (auth, etc.)
│   ├── server.js        # Point d'entrée
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/  # Composants React
    │   ├── contexts/    # Contextes (Auth)
    │   ├── services/    # Services API
    │   └── App.tsx      # Composant principal
    └── package.json
\`\`\`

## 🔧 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur

### Notes
- `GET /api/notes` - Liste des notes (avec recherche et tri)
- `POST /api/notes` - Créer une note
- `GET /api/notes/:id` - Récupérer une note
- `PUT /api/notes/:id` - Modifier une note
- `DELETE /api/notes/:id` - Supprimer une note
- `PATCH /api/notes/:id/pin` - Épingler/désépingler une note

## 🎨 Fonctionnalités Avancées

### Recherche Intelligente
- Recherche dans le titre, contenu et tags
- Tri par date de création, modification ou titre
- Ordre croissant/décroissant

### Gestion des Tags
- Ajout de tags personnalisés
- Recherche par tags
- Interface intuitive pour la gestion

### Interface Responsive
- Design adaptatif pour tous les écrans
- Navigation optimisée mobile
- Expérience utilisateur fluide

## 🚀 Déploiement

### Backend (Heroku/Railway/Render)
1. Configurer les variables d'environnement
2. Connecter à MongoDB Atlas
3. Déployer avec `git push`

### Frontend (Vercel/Netlify)
1. Configurer l'URL de l'API en production
2. Build avec `npm run build`
3. Déployer le dossier `build/`

## 🔮 Évolutions Futures

- **Résumés automatiques** avec IA
- **Suggestions intelligentes** de contenu
- **Collaboration** en temps réel
- **Export** PDF/Markdown
- **Thèmes** personnalisables
- **Synchronisation** multi-appareils

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche feature
3. Commit vos changements
4. Push vers la branche
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement

---

**SmartNote** - Organisez vos idées, simplifiez votre vie ! 📝✨
