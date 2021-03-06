// Déclaration des librairies nodeJS

// Déclaration des librairies
const express = require('express');

// Déclaration des fichiers de configuration
const admin = require('../controllers/admin.server.controller');

const router = express.Router();

/**
 * Initialisation des routes administrateur
 */
module.exports = router => {
  // TODO: Mettre les routes utilisateurs en tête de liste (évite un accès non authorisé)
  // Routes user
  router.route('/api/users/').post(admin.signupByAdmin);
  router.route('/api/users/').get(admin.getUsers);
  router.route('/api/users/:userId').delete(admin.deleteUserByAdmin);

  // Mise en place du lien middleware
  router.param('userId', admin.getUserByID);
};
