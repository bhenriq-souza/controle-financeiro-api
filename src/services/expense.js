

const bcrypt = require('bcrypt');
const { format } = require('date-fns');

const { Expense } = require('../models');
const { ExpenseUtil, HttpUtil } = require('../utils');

class ExpenseService {

  constructor() { }

  /**
   * Get all expenses
   * 
   * @param {String} userId 
   * 
   * @returns {Array} Array of expenses
   */
  static async getExpensesByUser(userId) {
    const expenses = await Expense.find({ user: userId });
    return HttpUtil.makeJsonResult(200, { expenses: expenses });
  }

  /**
   * Get all fixed expenses 
   * 
   * @param {String} userId
   * @param {Number} dueDay 
   * 
   * @returns {Array} Array of expenses
   */
  static async getFixedExpensesByUser(userId, dueDay) {
    const expenses = await Expense.find({ user: userId, fixedData: true, fixedDueDay: dueDay });
    return HttpUtil.makeJsonResult(200, { expenses: expenses });
  }

  /**
   * 
   * @param {String} userId 
   * @param {Date} initialDate 
   * @param {Date} finalDate 
   * 
   * @returns {Array} Array of expenses
   */
  static async getExpensesInPeriod(userId, initialDate, finalDate) {
    const expenses = await Expense.find({ user: userId, dueDate: { $gt: initialDate, $lt: finalDate } });
    return HttpUtil.makeJsonResult(200, { expenses: expenses });
  }

  /**
   * Creates new expense
   * 
   * @param {Object} expenseData 
   * 
   * @returns {Object} Result object
   */
  static async addExpense(expenseData) {
    const createdAt = format(new Date());
    const duplicatedExpense = await ExpenseUtil.verifyExpensesDuplicated(
      expenseData.dueDate, 
      expenseData.value, 
      expenseData.user
    );
    /*** is expense duplicate */ 
    // If the expense is duplicated, return an error and forces the user to update the data
    if(duplicatedExpense) {
      return HttpUtil.makeJsonResult(409, { 
        msg: ['Expense already registered.'], 
        expense: duplicatedExpense 
      });
    }
    /*** is due date valid */
    if(!ExpenseUtil.checkDueDate(expenseData.dueDate)) {
      return HttpUtil.makeJsonResult(409, { msg: ['Due date must be greather then creation day'] });
    }
    /*** is issue value valid */
    if(!ExpenseUtil.checkIssueValue(expenseData.value)) {
      return HttpUtil.makeJsonResult(409, { msg: ['Invalid value'] });
    }
    /*** is fixed data */
    if(expenseData.fixedData) {
      expenseData.dueDate = null;
    }
    /*** update create date */
    expenseData.createdAt = createdAt;
    const expense = new Expense(expenseData);
    const newExpense = await expense.save();
    return HttpUtil.makeJsonResult(200, { success: true, id: newExpense._id });
  }
}

module.exports = ExpenseService;