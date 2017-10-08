// Déclaration des librairies nodeJS
const path = require('path');

// Déclaration des librairies

// Déclaration des fichiers de configuration
const config = require(path.resolve('./server/lib/config/index.js'));
const UserRepository = require(path.resolve('./server/modules/users/repositories/user.repository'));
const UserService = require(path.resolve('./server/modules/users/services/user.service.js'));

/**
 * Définition de la class AdminService
 * Publication des services de la fonction admin
 * TODO: Demander la réinitialisation du mot de passe à la première connexion
 * @class AdminService
 */
class AdminService {

  /**
   * Méthode de création d'un utilisateur par le backoffice d'administration
   * @static createUser
   * @param {object} userObject
   * @returns {object} user json
   * @memberof AdminService
   */
  static async createUser (userObject) {

    // Configuration du provider
    // Via le backend, le provider prend la valeur `local`
    userObject.provider = 'local';
    userObject.displayName = `${userObject.firstname} ${userObject.lastname}`;

    // Suppression du rôle de l'object userObject
    // Utilisation du default du model
    // Les utilisateurs sous rôles admin seront créés directement sur MongoDB
    delete userObject.role;

    // Création du mot de passe
    userObject.password = await UserService.generateRandomPassphrase();

    // Envoi des informations par email
    if (config.mailer.active) {
      if (userObject.email) {
        await UserService.sendEmailConfirmation(userObject);
      }
    }

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

  /**
   * Méthode de suppression d'un utilisateur, via son id
   * @static deleteUser
   * @param {object} user
   * @memberof AdminService
   */
  static async deleteUser (user) {
    return Promise.resolve(user.remove());
  }
}
module.exports = AdminService;
