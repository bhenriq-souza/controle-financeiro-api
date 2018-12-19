const boom = require('boom');

const { User } = require('../models');
const { UserServices } = require('../services');
const { HttpUtil } = require('../utils');

class UserController {

  constructor() { }

  /**
   * POST - /users
   * 
   * @param {*} request 
   * @param {*} reply 
   */
  static async registerUser(request, reply) {
    try {
      const user = request.body;      
      const result = await UserServices.registerUser(user);
      HttpUtil.makeHttpResponse(reply, result.status, result.result);
    } catch (error) {
      throw boom.boomify(error);
    }
  }
}

module.exports = UserController;