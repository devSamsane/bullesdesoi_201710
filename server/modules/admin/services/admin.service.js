// Déclaration des librairies nodeJS
const path = require('path');

// Déclaration des librairies
// const mongoose = require('mongoose');

// Déclaration des fichiers de configuration
// const config = require(path.resolve('./server/lib/config/index.js'));
const UserRepository = require(path.resolve('./server/modules/users/repositories/user.repository'));
const UserService = require(path.resolve('./server/modules/users/services/user.service.js'));

/**
 * Définition de la class AdminService
 * Publication des services de la fonction admin
 * TODO: Générer un mot de passe à la création et l'envoyer par email au client
 * TODO: Demander la réinitialisation du mot de passe à la première connexion
 * @class AdminService
 */
class AdminService {

  // Création d'un utilisateur via le backend d'admin
  static async createUser (userObject) {

    // Configuration du provider
    // Via le backend, le provider prend la valeur `local`
    userObject.provider = 'local';

    // Suppression du rôle de l'object userObject
    // Utilisation du default du model
    // Les utilisateurs sous rôles admin seront créés directement sur MongoDB
    delete userObject.role;

    // Création du mot de passe
    userObject.password = await UserService.generateRandom();

    // TODO: Envoi des informations par email
    // if(userObject.email) {
    // await UserService.sendEmailConfirmation(userObject.email);
    // }

    // Hash du mot de passe
    if (userObject.password) {
      userObject.password = await UserService.hashPassword(userObject.password);
    }

    // Sauvegarde du user en base
    const user = await UserRepository.create(userObject);

    // Suppression du mot de passe et du sel du userObject
    user.password = undefined;
    user.salt = undefined;

    // Renvoi de l'objet user créée
    return Promise.resolve(user);
  }
}

module.exports = AdminService;
