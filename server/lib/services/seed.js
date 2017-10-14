// Déclaration nodeJS

// Déclaration des librairies
const _ = require('lodash');
const mongoose = require('mongoose');
const chalk = require('chalk');

// Déclaration des fichiers de configuration
const config = require('../config/index');
const UserService = require('../../modules/users/services/user.service');

// Déclaration de l'objet seed
let seedOptions = {};

/**
 * Définition de la classe SeedService
 * Publication de l'ensemble des functions nécessaire au seeding de la bd au démarrage
 * @class SeedService
 */
class SeedService {

  /**
   * Log du user et du mot de passe
   * @static reportSeeding
   * @param {any} userSeeded
   * @memberof SeedService
   */
  static async reportSeeding (userSeeded) {
    return new Promise((resolve, reject) => {
      // Vérification que le log des informations est actif
      if (seedOptions.logResults) {
        console.info(chalk.bold.blue(`Seed de la bd: ${userSeeded.email} créé avec le password ${userSeeded.password}`));
      }
      resolve();
    });
  }

  /**
   * Suppression de l'utilisateur
   * @static removeUser
   * @param {any} user
   * @returns
   * @memberof SeedService
   */
  static async removeUser (user) {
    return new Promise((resolve, reject) => {
      // Déclaration du modèle
      const User = mongoose.model('User');

      // Recherche et suppression de l'utilisateur
      User.find({ email: user.email }).remove(error => {
        if (error) {
          reject(new Error(`Impossible de supprimer l'utilisateur ${user.email}`));
        }
        resolve();
      });
    });
  }

  /**
   * Sauvegarde du user seed
   * @static saveUser
   * @param {any} user
   * @returns
   * @memberof SeedService
   */
  static async saveUser (user) {
    return new Promise((resolve, reject) => {
      // Sauvegarde de l'utilisateur
      user.save((error, userToStore) => {
        if (error) {
          reject(new Error(`Echec de sauvegarde de l'utilisateur seed ${user.email}`));
        } else {
          resolve(userToStore);
        }
      });
    });
  }

  /**
   * Vérification que le user ne pré-existe pas dans la db
   * @static checkUserNotExists
   * @param {any} user
   * @memberof SeedService
   */
  static async checkUserNotExists (user) {
    return new Promise((resolve, reject) => {
      // Déclaration du modèle User
      const User = mongoose.model('User');

      // Recherche du user dans la bd par son adresse mail
      // Renvoi une erreur ou la liste des utilisateurs (normalement on ne doit en avoir qu'un car contrainte sur le modèle)
      User.find({ email: user.email }, (error, users) => {
        if (error) {
          // La recherche n'a pas pu aboutir
          reject(new Error(`La recherche d'un utilisateur par son email n'a pas pu aboutir`));
        }

        if (users.length === 0) {
          // La recherche a aboutit et retourne un résultat 0
          // Aucun user trouvé
          resolve();
        } else {
          // Plusieurs utilisateurs trouvés
          reject(new Error(`Un utilisateur pré-existe dans la bd avec le mail suivant ${user.email}`));
        }
      });
    });
  }

  /**
   * Sauvegarde de l'utilisateur dans la bd
   * @static seedUser
   * @param {any} user user object
   * @memberof SeedService
   */
  static async seedUser (user) {
    return new Promise((resolve, reject) => {

      // Vérification en env. production que le user n'est pas l'admin
      // On vérifie qu'il ne pré-existe pas si true (on efface pas l'admin en production)
      if (user.email === seedOptions.seedAdmin.email && process.env.NODE_ENV === 'production') {
        this.checkUserNotExists(user)
          .then(this.saveUser(user))
          .then(this.reportSeeding(user))
          .then(() => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      } else {
        this.removeUser(user)
          .then(this.saveUser(user))
          .then(this.reportSeeding(user))
          .then(() => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  }

  /**
   * Fonction démarrage des opérations de seeding de la bd
   * @static startseed
   * @param {any} options
   * @memberof SeedService
   */
  static async start (options) {
    // Construction de l'objet seed
    // Initialisation des options par défaut du seeding
    seedOptions = _.clone(config.seedDB.options, true);

    // Vérification des options activées
    if (_.has(options, 'logResults')) {
      seedOptions.logResults = options.logResults;
    }
    if (_.has(options, 'seedUser')) {
      seedOptions.seedUser = options.seedUser;
    }
    if (_.has(options, 'seedAdmin')) {
      seedOptions.seedAdmin = options.seedAdmin;
    }

    const User = mongoose.model('User');
    const adminAccount = new User(seedOptions.seedAdmin);
    const userAccount = new User(seedOptions.seedUser);

    adminAccount.password = await UserService.generateRandomPassphrase();
    userAccount.password = await UserService.generateRandomPassphrase();

    return new Promise((resolve, reject) => {
      // En production seed de l'admin uniquement
      if (process.env.NODE_ENV === 'production') {
        this.seedUser(adminAccount)
          .then(() => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      } else {
        // Ajout des users admin et user pour les env != production
        this.seedUser(userAccount)
          .then(this.seedUser(adminAccount))
          .then(() => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  }

}

// Export de la class SeedService
module.exports = SeedService;
