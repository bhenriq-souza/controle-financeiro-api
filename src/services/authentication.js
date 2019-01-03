const bcrypt = require('bcrypt');

const { User } = require('../models');
const { HttpUtil, AuthUtil } = require('../utils');

/**
 * Compare passwords
 * 
 * @param {String} frontPwd 
 * @param {String} userPwd 
 * 
 * @returns {Boolean} True - Password matches
 */
function _comparePassword(frontPwd, userPwd) {
  return bcrypt.compareSync(frontPwd, userPwd);
}

class AuthenticationService {

  constructor() { }

  /**
   * Provides users login
   * 
   * @param {String} email 
   * @param {String} password 
   */
  static async login(email, password) {
    const user = await User.findOne({ email: email });
    if(!user) return HttpUtil.makeJsonResult(404, { msg: ['User not found'] });
    if(!_comparePassword(password, user.password)) HttpUtil.makeJsonResult(401, { msg: ['Password does not match'] });
    const token = AuthUtil.generateToken(user);
    return HttpUtil.makeJsonResult(200, { success: true, token: token, user: user._id });
  }
}

module.exports = AuthenticationService;