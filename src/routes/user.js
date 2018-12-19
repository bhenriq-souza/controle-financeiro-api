const { UserController } = require('../controllers');

const routes = [
  {
    method: 'POST',
    url: '/api/users',
    handler: UserController.registerUser
  }
];

class UsersRoutes {

  constructor() { }

  /**
   * Get users routes
   * 
   */
  static get routes() {
    return routes;
  }

}

module.exports = UsersRoutes;
