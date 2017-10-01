// Déclaration des librairies nodeJS
const path = require('path');

// Déclaration des librairies
const mongoose = require('mongoose');

// Déclaration des fichiers de configuration

// Initialisation des models
let User = require(path.resolve('./server/modules/models/user.server.model'));
User = mongoose.model('User');

/**
 * Passage des informations du user dans le middleware expressJS
 * @name userByID
 * @param {string} userId id de l'utilisateur
 * @returns {object} modelUser du user accessible par le paramètre req de expressJS 
 */
exports.userByID = (req, res, next, userId) => {
  // Vérification que le userId est un id valide au sens mongoose
  // Utilisation de la méthode `isValid` de mongoose
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    // Log de l'erreur
    return res.status(400).json({
      title: 'Syntaxe erronée',
      message: 'Information utilisateur erronée'
    });
  }
  User.findById(userId, '-password', '-providerData').exec((err, user) => {
    if (err) {
      res.status(500).json({
        title: 'Erreur interne du serveur',
        message: err
      });
      return next();
    } else if (!user) {
      res.status(409).json({
        title: 'La requête ne peut pas être traitée',
        message: `L'utilisateur ${userId} est inconnu`
      });
      return next();
    }
    // Passage des informations du user au middleware
    req.modelUser = user;
    next();
  });
};

/**
 * Initialisation et export de la méthode createUser
 * Création d'un user via le backoffice d'administration
 * TODO: Ajouter le filtre qui vérifie que l'admin est authentifié et bien admin
 * @name createUser
 * @param {object} userObject
 */
exports.createUser = (req, res) => {
  // Récupération des champs du body posté dans le formulaire
  const user = new User(req.body);
  user.provider = 'local';

  // Sauvegarde du user dans mongoDB
  user.save(error => {
    if (error) {
      return res.status(422).json({
        title: 'Une erreur est survenue',
        message: error
      });
    }
    // Suppression des valeurs sensibles du middleware
    user.password = undefined;

    return res.status(201).json({
      title: 'Création du user',
      message: 'Succés'
    });
  });
};

/**
 * Initialisation et export de la méthode deleteUser
 * Suppression d'un user via le backoffice d'administration
 * TODO: Ajouter le filtre qui vérifie que l'admin est authentifié et bien admin
 * TODO: Répercuter la suppression de l'utilisateur sur l'ensemble des collections
 * @name deleteUser
 */
exports.deleteUser = (req, res) => {
  const user = req.modelUser;

  user.remove(error => {
    if (error) {
      return res.status(409).json({
        title: 'La requête ne peut pas être traitée',
        message: `L'utilisateur ${user} est inconnu`
      });
    }

    return res.status(200).json({
      title: `Suppression du user: ${user}`,
      message: 'Succés'
    });
  });
};
