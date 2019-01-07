
const boom = require('boom');

const { BankServices } = require('../services');
const { HttpUtil } = require('../utils');

class BankController {

  constructor() { }

  /**
   * GET /banks
   * 
   * @param {*} request 
   * @param {*} reply 
   */
  static async getAllBanks(request, reply) {
    try {
      const { id } = request.params;
      const result = await BankServices.getAllBanks(id);
      HttpUtil.makeHttpResponse(reply, result.status, result.result);
    } catch (error) {
      throw boom.boomify(error);
    }
  }

  /**
   * POST - /banks
   * 
   * @param {*} request 
   * @param {*} reply 
   */
  static async addBank(request, reply) {
    try {
      const data = request.body;
      const result = await BankServices.addBank(data);
      HttpUtil.makeHttpResponse(reply, result.status, result.result);
    } catch (error) {
      throw boom.boomify(error);
    }
  }

  /**
   * PUT - /banks
   * 
   * @param {*} request 
   * @param {*} reply 
   */
  static async updateBank(request, reply) {
    try {
      const { id, data } = request.body;
      const result = await BankServices.updateBank(id, data);
      HttpUtil.makeHttpResponse(reply, result.status, result.result);
    } catch (error) {
      throw boom.boomify(error);
    }
  }

  /**
   * DELETE - /bank
   * 
   * @param {*} request 
   * @param {*} reply 
   */
  static async deleteBank(request, reply) {
    try {
      const { id } = request.body;
      const result = await BankServices.deleteBank(id);
      HttpUtil.makeHttpResponse(reply, result.status, result.result);
    } catch (error) {
      throw boom.boomify(error);
    }
  }
}

module.exports = BankController;