// Déclaration des librairies nodeJS

// Déclaration des librairies
// const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Déclaration des fichiers de configuration

/**
 * Paramétrage du schéma `User`
 */
const UserSchema = new Schema({
  email: {
    type: String,
    index: {
      unique: true,
      sparse: true
    },
    lowercase: true,
    trim: true,
    default: '',
    required: true
  },
  firstname: {
    type: String,
    trim: true,
    default: '',
    required: true
  },
  lastname: {
    type: String,
    trim: true,
    default: '',
    required: true
  },
  displayName: {
    type: String,
    default: ''
  },
  phoneNumber: {
    type: String,
    default: '',
    required: true
  },
  password: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    default: '',
    required: true
  },
  providerData: {},
  additionnalProviderData: {},
  roles: {
    type: [{
      type: String,
      enum: ['user', 'admin']
    }],
    default: ['user'],
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
  updated: {
    type: Date
  },
  hasResetInProgress: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  active: {
    type: Boolean,
    default: true
  }
});

/**
 * Hashage du mot de passe
 * Utilisation de la méthode `pre`, exécuté sur chaque `save` du model
 * Vérification que le mot de passe est modifié (méthode isModified de mongoose)
 */
// UserSchema.pre('save', next => {
//   if (this.password && this.isModified('password')) {
//     // Création du sel (10 tours)
//     const salt = bcrypt.genSaltSync(10);
//     // Hashage du mot de passe
//     const hash = bcrypt.hashSync(this.password, salt);
//     // Sauvegarde du hash
//     this.password = hash;
//   }
//   next();
// });

/**
 * Authentification: Vérification du mot de passe
 * Comparaison d'un string avec le password (hash) du user
 * @name authenticate
 * @param {string} password
 * @returns {boolean}
 */
// UserSchema.methods.authenticate = password => bcrypt.compareSync(password, this.password);

/**
 * Initialisation du model
 * @name User
 */
mongoose.model('User', UserSchema);
