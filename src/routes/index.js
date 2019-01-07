const AuthRoutes = require('./authentication');
const BanksRoutes = require('./bank');
const ExpensesRoutes = require('./expense');
const PaymentMethosRoutes = require('./paymentMethod');
const UsersRoutes = require('./user');

exports.routes = [
  ...AuthRoutes.routes,
  ...BanksRoutes.routes,
  ...ExpensesRoutes.routes,
  ...PaymentMethosRoutes.routes,
  ...UsersRoutes.routes  
];