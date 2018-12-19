const { UserController } = require('../controllers');

const routes = [
  {
    method: 'GET',
    url: '/api/users',
    handler: UserController.getAllUsers
  },
  {
    method: 'GET',
    url: '/api/users/:id',
    handler: UserController.getSingleUser
  },
  {
    method: 'POST',
    url: '/api/users',
    handler: UserController.addUser
  },
  {
    method: 'PUT',
    url: '/api/users/:id',
    handler: UserController.updateUser
  },
  {
    method: 'DELETE',
    url: '/api/users/:id',
    handler: UserController.deleteUser
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
