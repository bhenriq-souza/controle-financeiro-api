const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { format } = require('date-fns');

const config = require('../config');
const { User } = require('../models');

const pwdPattern = {
  length: {
    pattern: /^([a-zA-Z0-9-!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]){8,18}$/,
    msg: 'Must contain between 8 and 18 characters.'
  },
  upperCase: {
    pattern: /[A-Z]/,
    msg: 'Must contain upper case characters.'
  },
  lowerCase: {
    pattern: /[a-z]/,
    msg: 'Must contain lower case characters.'
  }, 
  numericChar: {
    pattern: /[0-9]/,
    msg: 'Must contain numeric characters.'
  },
  specialChar: {
    pattern: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
    msg: 'Must contain special characters.'
  } 
};

/**
 * Private method - Provides password pattern verification
 * 
 * @param {String} password 
 * 
 * @returns {Object} Verification result
 */
function _verifyPasswordPattern(password) {
  let result = {
    msg: [],
    valid: true
  };
  for(let key in pwdPattern) {
    if(!pwdPattern[key].pattern.test(password)) {
      result.msg.push(pwdPattern[key].msg);
      result.valid = false;
    }
  }
  return result;
}

/**
 * Private method - Provides password confirmation verification
 * 
 * @param {String} password 
 * @param {String} passwordConfirmation 
 * 
 * @returns {Boolean} true - The password confirmation is ok
 */
function _verifyPasswordConfirmation(password, passwordConfirmation) {
  return password === passwordConfirmation;
}

/**
 * Private method - Provides password validation
 * 
 * @param {String} password 
 * @param {String} passwordConfirmation 
 * 
 * @returns {Object} Password validation object
 */
function _pwdValidation(password, passwordConfirmation) {    
  const pwdConfirmation = _verifyPasswordConfirmation(password, passwordConfirmation);
  const pwdPattern = _verifyPasswordPattern(password);
  if(!pwdConfirmation)  return { valid: false, msg: ['Password and confirmation must match'] };
  if(!pwdPattern.valid) return { valid: false, msg: pwdPattern.msg };
  return { valid: true, msg: '' };
}

/**
 * Private method - Provides email validation
 * 
 * @param {String} email User email
 * 
 * @returns {Boolean} true - The email is available
 */
async function _checkEmailAvailability(email) {
  const user = await User.findOne({ email: email });
  return user === null;
}


function _generateToken(user) {
  const { secureKey } = config;
  return jwt.sign({ id: user._id }, secureKey, { expiresIn: '1h' });
}

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
    const emailValidation = await _checkEmailAvailability(userData.email);
    if(!emailValidation) return { status: 409, result: { msg: ['Email is not available'] } };
    const pwdValidation = _pwdValidation(userData.password, userData.passwordConfirmation);
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
    const token = _generateToken(newUser);
    const resultData = {
      userId: newUser._id,
      email: newUser.email,
      token: token
    };
    return { status: 200, result: { user: resultData } };
  }
}

module.exports = UserService;