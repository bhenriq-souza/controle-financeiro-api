const jwt = require('jsonwebtoken');

const config = require('../config');

class AuthUtil {

  constructor() { }

  /**
   * Generate session token
   * 
   * @param {Object} user 
   * 
   * @returns {String} Session token
   */
  static generateToken(user) {
    const { secureKey } = config;
    return jwt.sign({ id: user._id }, secureKey, { expiresIn: '1h' });
  }

}

module.exports = AuthUtil;