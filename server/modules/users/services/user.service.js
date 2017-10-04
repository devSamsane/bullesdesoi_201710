// Déclaration des librairies nodeJS
const path = require('path');

// Déclaration des librairies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const generatePassword = require('generate-password');
const owasp = require('owasp-password-strength-test');

// Déclaration des fichiers de configuration
const config = require(path.resolve('./server/lib/config/index.js'));
const UserRepository = require('../repositories/user.repository');

// Paramétrage bcrypt
const SALT_ROUNDS = 10;

/**
 * Définition de la class UserService
 * 
 * @class UserService
 */
class UserService {

  static deserialize (user) {
    if (!user || typeof user !== 'object') {
      return null;
    }

    return {
      id: user.id,
      displayName: user.displayName,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      provider: user.provider,
      created: user.created
    };
  }

  static async getUserDeserializedById (id) {
    const user = await UserRepository.getById(id);
    return this.deserialize(user);
  }

  /**
  * Méthode de hashage du mot de passe
  * TODO: Vérifier que le mot de passe ou la passphrase fait au maximum 72 caractères sinonrenvoyer une erreur 
  * @static hashPassword
  * @param {string} password 
  * @memberof UserService
  */
  static async hashPassword (password) {
    return bcrypt.hash(String(password), SALT_ROUNDS);
  }

  /**
   * Méthode de génération de passphrase respectant l'owasp
   * Longueur max = 72 caractères
   * @static generateRandomPassphrase
   * @memberof UserService
   */
  static async generateRandomPassphrase () {
    return new Promise((resolve, reject) => {
      // Définition des variables
      let password = '';
      const repeatingCharacters = new RegExp('(.)\\1{2,}', 'g');
      // Itération tant que le mot de passe ne respecte pas les exigences
      // Longueur du mot de passe entre 8 et 16 caractères
      while (password.length < 12 || repeatingCharacters.test(password)) {
        // Construction du mot de passe
        password = generatePassword.generate({
          length: Math.floor(Math.random() * (16)) + 6,
          numbers: true,
          symbols: true,
          uppercase: true,
          excludeSimilarCharacters: true
        });
        // Vérification de la nécessité de retirer des caractères doublonnés
        password = password.replace(repeatingCharacters, '');
      }

      // Envoi de l'échec si le mot de passe ne respecte pas les tests owasp
      if (owasp.test(password).errors.length) {
        reject(new Error('Une erreur est survenue lors de la création du mot de passe'));
      } else {
        resolve(password);
      }
    });
  }
}

module.exports = UserService;
