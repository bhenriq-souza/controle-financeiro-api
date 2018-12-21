const bcrypt = require('bcrypt');
const { format } = require('date-fns');

const { User } = require('../models');
const { AuthUtil, UserUtil } = require('../utils');

class UserService {

  constructor() { }

  /**
   * Register a new user
   * 
   * @param {Object} user 
   * 
   * @returns {Object} Result object
   */
  static async registerUser(userData) {
    const emailValidation = await UserUtil.checkEmailAvailability(userData.email);
    if(!emailValidation) return { status: 409, result: { msg: ['Email is not available'] } };
    const pwdValidation = UserUtil.pwdValidation(userData.password, userData.passwordConfirmation);
    if(!pwdValidation.valid) return { status: 409, result: { msg: pwdValidation.msg } };
    const encryptedPassword = bcrypt.hashSync(userData.password, 10);
    const createdAt = format(new Date());
    const lastLogin = format(new Date());
    const user = new User({
      email: userData.email,
      password: encryptedPassword,
      createdAt: createdAt,
      lastLogin: lastLogin
    });
    const newUser = await user.save();
    const token = AuthUtil.generateToken(newUser);
    const resultData = {
      userId: newUser._id,
      email: newUser.email,
      token: token
    };
    return { status: 200, result: { user: resultData } };
  }
}

module.exports = UserService;