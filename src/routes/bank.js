const { BankController } = require('../controllers');

const routes = [
  {
    method: 'GET',
    url: '/api/banks',
    handler: BankController.getAllBanks
  },  
  {
    method: 'POST',
    url: '/api/banks',
    handler: BankController.addBank
  },
  {
    method: 'PUT',
    url: '/api/banks',
    handler: BankController.updateBank
  },  
  {
    method: 'DELETE',
    url: '/api/banks',
    handler: BankController.deleteBank
  }
];

class BanksRoutes {

  constructor() { }

  /**
   * Get users routes
   * 
   */
  static get routes() {
    return routes;
  }

}

module.exports = BanksRoutes;