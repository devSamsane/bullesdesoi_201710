// Déclaration des librairies nodeJS

// Déclaration des librairies
const mongoose = require('mongoose');

// Déclaration des fichiers de configuration
let User = require('../../models/user.server.model');

// Initialisation du model User
User = mongoose.model('User');

/**
 * Définition de la class UserRepository
 * @class UserRepository
 */
class UserRepository {

  // Création d'un utilisateur
  static create (userObject) {
    const user = new User(userObject);

    return user.save();
  }

  // Récupération d'un utilisateur par son id
  static getUserById (userId) {
    return User.findOne({ _id: String(userId) }).exec();
  }

  // Récupération d'un utilisateur par son email
  static getUserByEmail (email) {
    return User.findOne({ username: String(email) }).exec();
  }

}

// Export de la class UserRepository
module.exports = UserRepository;
