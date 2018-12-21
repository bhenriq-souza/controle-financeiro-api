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
 * Provides password confirmation verification
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
 * Provides password pattern verification
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
 * Build validation object
 * 
 * @param {Boolean} valid 
 * @param {Array} messages 
 * 
 * @returns {Object} Validation object
 */
function _makeValidationObject(valid, messages) {
  return  {
    valid: valid,
    msg: messages
  };
}

class UserUtil { 

  constructor() { }

  /**
   * Provides password validation
   * 
   * @param {String} password 
   * @param {String} passwordConfirmation 
   * 
   * @returns {Object} Password validation object
   */
  static pwdValidation(password, passwordConfirmation) {    
    const pwdConfirmation = _verifyPasswordConfirmation(password, passwordConfirmation);
    const pwdPattern = _verifyPasswordPattern(password);
    if(!pwdConfirmation)  return _makeValidationObject(false, ['Password and confirmation must match']);
    if(!pwdPattern.valid) return _makeValidationObject(false, pwdPattern.msg);
    return _makeValidationObject(true, []);
  }

  /**
   * Private method - Provides email validation
   * 
   * @param {String} email User email
   * 
   * @returns {Boolean} true - The email is available
   */
  static async checkEmailAvailability(email) {
    const user = await User.findOne({ email: email });
    return user === null;
  }
}

module.exports = UserUtil;