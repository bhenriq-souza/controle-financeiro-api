
const boom = require('boom');

const { PaymentMethodServices } = require('../services');
const { HttpUtil } = require('../utils');

class PaymentMethodController {

  constructor() { }

  /**
   * GET /payMethods
   * 
   * @param {*} request 
   * @param {*} reply 
   */
  static async getAllPaymentMethods(request, reply) {
    try {
      const { id } = request.params;
      const result = await PaymentMethodServices.getAllPaymentMethods(id);
      HttpUtil.makeHttpResponse(reply, result.status, result.result);
    } catch (error) {
      throw boom.boomify(error);
    }
  }

  /**
   * POST - /payMethods
   * 
   * @param {*} request 
   * @param {*} reply 
   */
  static async addPaymentMethod(request, reply) {
    try {
      const data = request.body;
      const result = await PaymentMethodServices.addPaymentMethod(data);
      HttpUtil.makeHttpResponse(reply, result.status, result.result);
    } catch (error) {
      throw boom.boomify(error);
    }
  }

  /**
   * PUT - /payMethods
   * 
   * @param {*} request 
   * @param {*} reply 
   */
  static async updatePaymentMethod(request, reply) {
    try {
      const { id, data } = request.body;
      const result = await PaymentMethodServices.updatePaymentMethod(id, data);
      HttpUtil.makeHttpResponse(reply, result.status, result.result);
    } catch (error) {
      throw boom.boomify(error);
    }
  }

  /**
   * DELETE - /payMethods
   * 
   * @param {*} request 
   * @param {*} reply 
   */
  static async deletePaymentMethod(request, reply) {
    try {
      const { id } = request.body;
      const result = await PaymentMethodServices.deletePaymentMethod(id);
      HttpUtil.makeHttpResponse(reply, result.status, result.result);
    } catch (error) {
      throw boom.boomify(error);
    }
  }
}

module.exports = PaymentMethodController;