// Déclaration nodeJS

// Déclaration des librairies

// Déclaration des fichiers de configuration

const API_ERROR_CODES = {
  serverError: 'SERVER_ERROR'
};

class ApiError extends Error {

  /**
   * Creates an instance of ApiError.
   * @param {any} message
   * @param {any} [{status, code}={}]
   * @memberof ApiError
   */
  constructor (message, { status, code } = {}) {
    super(message);

    // Configuration du code status HTTP
    this.status = status || 500;

    // Configuration du code erreur api
    this.code = code || API_ERROR_CODES.serverError;

    // Assurance de l'utilisation du nom de la subClass
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }

}

// Export de la class ApiError
module.exports = ApiError;
