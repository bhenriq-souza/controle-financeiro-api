const { isBefore, isAfter } = require('date-fns');

const { Expense } = require('../models');

class ExpenseUtil {

  constructor() { }

  /**
   * Verify if the due date if after creation date
   * 
   * @param {Date} dueDate 
   * 
   * @returns {Boolean} True - The due date is greather then today
   */
  static checkDueDate(dueDate) {
    const today = new Date();
    return isAfter(dueDate, today);    
  }

  /**
   * Check expnse value 
   * 
   * @param {Number} value 
   * 
   * @returns {Boolean} True - The value is valid
   */
  static checkIssueValue(value) {
    return value > 0;
  }

  /**
   * Check if the expense is duplicated
   * 
   * @param {Date} dueDate 
   * @param {Number} value 
   * @param {String} userId
   * 
   * @returns {Boolean} True - The expense is not duplicated
   */
  static async verifyExpensesDuplicated(dueDate, value, userId) {     
    return await Expense.findOne({ user: userId, dueDate: dueDate, value: value });
  }

}

module.exports = ExpenseUtil;