const UsersRoutes = require('./user');
const AuthRoutes = require('./authentication');

exports.routes = [
  ...UsersRoutes.routes,
  ...AuthRoutes.routes
];