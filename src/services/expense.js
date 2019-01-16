

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
    return HttpUtil.makeJsonResult(200, { success: true, expenses: expenses });
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
    const expenses = await Expense.find({ user: userId, fixedDate: true, fixedDueDay: dueDay });
    return HttpUtil.makeJsonResult(200, { success: true, expenses: expenses });
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
    return HttpUtil.makeJsonResult(200, { success: true, expenses: expenses });
  }

  /**
   * Create a new expense
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

    // If the expense is duplicated, return an error and forces the user to update the data
    if(duplicatedExpense) {
      return HttpUtil.makeJsonResult(409, { 
        msg: ['Expense already registered.'], 
        expense: duplicatedExpense 
      });
    }

    /*** is due date valid */
    if(!ExpenseUtil.checkDueDate(expenseData.dueDate)) {
      return HttpUtil.makeJsonResult(409, { 
        success: false, 
        msg: ['Due date must be greather then creation day'] 
      });
    }

    /*** is issue value valid */
    if(!ExpenseUtil.checkIssueValue(expenseData.value)) {
      return HttpUtil.makeJsonResult(409, { 
        success: false, 
        msg: ['Invalid value'] 
      });
    }

    /*** no pendent data */
    expenseData.pendentData = false;

    /*** update create date */
    expenseData.createdAt = createdAt;   

    let result = null;

    /*** if it's fixed date, create new expenses for a fixed number of dates */
    if(expenseData.fixedDate) {
      result = await ExpenseUtil.addInstallments(expenseData);
    } else {
      /*** instantiate new expense */
      const expense = new Expense(expenseData);
      /*** save expense */
      result = await expense.save();
    }

    return HttpUtil.makeJsonResult(200, { success: true, expense: result });
  }

  /**
   * Update a existing expense
   * 
   * @param {String} id Existing expense id
   * @param {Object} expenseData Update data
   * 
   * @returns {Object} Result object
   */
  static async updateExpense(id, expenseData) {    
    const updatedExpense = await Expense.findByIdAndUpdate(id, expenseData, { new: true });
    if(!updatedExpense) return HttpUtil.makeJsonResult(404, { success: false, msg: ['Expense not found'] });
    return HttpUtil.makeJsonResult(200, { success: true, updatedExpense: updatedExpense });
  }

  /**
   * Delete a existing expense
   * 
   * @param {String} id Existing expense id
   * 
   * @returns {Object} Result object
   */
  static async deleteExpense(id) {    
    const expense = await Expense.findByIdAndDelete(id);
    if(!expense) return HttpUtil.makeJsonResult(404, { success: false, msg: ['Expense not found'] });
    return HttpUtil.makeJsonResult(200, { success: true });
  }

}

module.exports = ExpenseService;