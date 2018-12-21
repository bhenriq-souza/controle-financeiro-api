const { AuthController } = require('../controllers');

const routes = [
  {
    method: 'POST',
    url: '/api/login',
    handler: AuthController.login
  }
];

class AuthenticationRoutes {

  constructor() { }

  /**
   * Get users routes
   * 
   */
  static get routes() {
    return routes;
  }

}

module.exports = AuthenticationRoutes;