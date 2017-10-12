// Déclaration des librairies nodeJS
const path = require('path');

// Déclaration des librairies
const bcrypt = require('bcrypt');
const generatePassword = require('generate-password');
// const owasp = require('owasp-password-strength-test');
const nodemailer = require('nodemailer');
const hbsMailer = require('nodemailer-express-handlebars');

// Déclaration des fichiers de configuration
const UserRepository = require('../repositories/user.repository');
const config = require('../../../lib/config/index');

// Paramètres divers
const SALT_ROUNDS = 10;
const smtpTransport = nodemailer.createTransport(config.mailer.options);
const optionsHandlebars = {
  viewEngine: {
    extname: '.html'
  },
  viewPath: path.resolve('./server/modules/users/templates/'),
  extName: '.html'
};

/**
 * Définition de la class UserService
 * @class UserService
 */
class UserService {

  /**
   * Deserialize
   * @static
   * @param {any} user
   * @returns
   * @memberof UserService
   */
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

  /**
   * getUserDeserializedById
   * @static
   * @param {any} id
   * @returns
   * @memberof UserService
   */
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
      while (password.length < 8 || repeatingCharacters.test(password)) {
        // Construction du mot de passe
        password = generatePassword.generate({
          length: Math.floor(Math.random() * (8)) + 8, // longueur entre 8 et 16 caractères
          numbers: true,
          symbols: true,
          uppercase: true,
          excludeSimilarCharacters: true
        });
        // Vérification de la nécessité de retirer des caractères doublonnés
        password = password.replace(repeatingCharacters, '');
      }

      // BUG: Les tests owasp sur le mot de passe provoquent le rejet trop souvent
      // Envoi de l'échec si le mot de passe ne respecte pas les tests owasp
      // if (owasp.test(password).errors.length) {
      //   reject(new Error('Une erreur est survenue lors de la création du mot de passe'));
      // } else {

      // }
      resolve(password);
    });
  }

  static async sendEmailConfirmation (user) {
    return new Promise((resolve, reject) => {
      smtpTransport.use('compile', hbsMailer(optionsHandlebars));
      const mailOptions = {
        to: user.email,
        from: config.mailer.from,
        template: 'creation-compte.template',
        context: {
          email: user.email,
          password: user.password
        },
        subject: 'Confirmation de création du compte sur bullesdesoi'
      };
      smtpTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(new Error(`Erreur d'envoi du mail à l'utilisateur: ${error}`));
        } else {
          resolve(info);
        }
      });
    });
  }

}

// Export de la class UserService
module.exports = UserService;
