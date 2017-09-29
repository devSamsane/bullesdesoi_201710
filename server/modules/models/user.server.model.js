// Déclaration des librairies nodeJS

// Déclaration des librairies
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
 * Initialisation du model
 * @name User
 */
mongoose.model('User', UserSchema);
