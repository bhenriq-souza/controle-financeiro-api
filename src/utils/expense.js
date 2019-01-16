const { addMonths, format, isAfter } = require('date-fns');

const { Expense } = require('../models');
const { ConstantsUtil } = require('./constants');
const { PaymentMethod } = require('../models')

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

  /**
   * Create installments
   * 
   * @param {Object} expenseData 
   * 
   * @returns {*} Resulta data 
   */
  static async addInstallments(expenseData) {
    const promises = [];
    const payMethod = PaymentMethod.findOne({ _id: expenseData.payMethod });
    for(let i = 0; i < ConstantsUtil.FIXED_DATE_PERIOD; i++) {
      if(!payMethod.isCreditCard) {           
        const newDueDate = format(addMonths(new Date(expenseData.dueDate), 1));
        expenseData.dueDate = newDueDate;
      }
      /*** in case of not fixed value */
      if(!expenseData.fixedValue) {
        expenseData.pendentData = true;
      }
      const expense = new Expense(expenseData);
      promises.push(await expense.save());
    }
    return await Promise.all(promises);
  }
}

module.exports = ExpenseUtil;