const UsersRoutes = require('./user');
const AuthRoutes = require('./authentication');
const ExpensesRoutes = require('./expense');

exports.routes = [
  ...UsersRoutes.routes,
  ...AuthRoutes.routes,
  ...ExpensesRoutes.routes
];