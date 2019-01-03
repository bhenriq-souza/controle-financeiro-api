
const boom = require('boom');

const { ExpenseServices } = require('../services');
const { HttpUtil } = require('../utils');

class ExpensesController {

  constructor() { }

  /**
   * GET /expenses/:id
   * 
   * @param {*} request 
   * @param {*} reply 
   */
  static async getAllExpenses(request, reply) {
    try {
      const { id } = request.params;
      const result = await ExpenseServices.getExpensesByUser(id);
      HttpUtil.makeHttpResponse(reply, result.status, result.result);
    } catch (error) {
      throw boom.boomify(error);
    }
  }

  /**
   * GET /expenses/:id/:day
   * 
   * @param {*} request 
   * @param {*} reply 
   */
  static async getFixedExpenses(request, reply) {
    try {
      const { id, day } = request.params;
      const result = await ExpenseServices.getFixedExpensesByUser(id, day);
      HttpUtil.makeHttpResponse(reply, result.status, result.result);
    } catch (error) {
      throw boom.boomify(error);
    }
  }

  /**
   * POST /expenses/:id
   * 
   * @param {*} request 
   * @param {*} reply 
   */
  static async getExpensesByPeriod(request, reply) {
    try {
      const { id } = request.params;
      const { initialDate, finalDate } = request.body;
      const result = await ExpenseServices.getExpensesInPeriod(id, initialDate, finalDate);
      HttpUtil.makeHttpResponse(reply, result.status, result.result);
    } catch (error) {
      throw boom.boomify(error);
    }
  }

  /**
   * POST - /expenses
   * 
   * @param {*} request 
   * @param {*} reply 
   */
  static async addExpense(request, reply) {
    try {
      const data = request.body;
      const result = await ExpenseServices.addExpense(data);
      HttpUtil.makeHttpResponse(reply, result.status, result.result);
    } catch (error) {
      throw boom.boomify(error);
    }
  }

  /**
   * PUT - /expenses
   * 
   * @param {*} request 
   * @param {*} reply 
   */
  static async updateExpense(request, reply) {
    try {
      const { id, data } = request.body;
      const result = await ExpenseServices.updateExpense(id, data);
      HttpUtil.makeHttpResponse(reply, result.status, result.result);
    } catch (error) {
      throw boom.boomify(error);
    }
  }

  /**
   * DELETE - /expenses
   * 
   * @param {*} request 
   * @param {*} reply 
   */
  static async deleteExpense(request, reply) {
    try {
      const { id } = request.body;
      const result = await ExpenseServices.deleteExpense(id);
      HttpUtil.makeHttpResponse(reply, result.status, result.result);
    } catch (error) {
      throw boom.boomify(error);
    }
  }
}

module.exports = ExpensesController;