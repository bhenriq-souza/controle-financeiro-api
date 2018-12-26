const { ExpenseController } = require('../controllers');

const routes = [
  {
    method: 'GET',
    url: '/api/expenses/:id',
    handler: ExpenseController.getAllExpenses
  },
  {
    method: 'GET',
    url: '/api/expenses/:id/:day',
    handler: ExpenseController.getFixedExpenses
  },
  {
    method: 'POST',
    url: '/api/expenses/:id',
    handler: ExpenseController.getExpensesByPeriod
  },
  {
    method: 'POST',
    url: '/api/expenses',
    handler: ExpenseController.addExpense
  }
];

class ExpensesRoutes {

  constructor() { }

  /**
   * Get users routes
   * 
   */
  static get routes() {
    return routes;
  }

}

module.exports = ExpensesRoutes;