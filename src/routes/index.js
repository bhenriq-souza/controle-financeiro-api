const AuthRoutes = require('./authentication');
const BanksRoutes = require('./bank');
const ExpensesRoutes = require('./expense');
const UsersRoutes = require('./user');

exports.routes = [
  ...UsersRoutes.routes,
  ...AuthRoutes.routes,
  ...ExpensesRoutes.routes,
  ...BanksRoutes.routes
];