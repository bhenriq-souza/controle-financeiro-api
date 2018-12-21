
const boom = require('boom');

const { AuthServices } = require('../services');
const { HttpUtil } = require('../utils');

class AuthenticationController {

  constructor() { }

  /**
   * Provide login
   * 
   * @param {*} request 
   * @param {*} reply 
   */
  static async login(request, reply) {
    try {
      const { email, password } = request.body;
      const result = await AuthServices.login(email, password);
      HttpUtil.makeHttpResponse(reply, result.status, result.result);
    } catch (error) {
      throw boom.boomify(error);
    }
  }

}

module.exports = AuthenticationController;