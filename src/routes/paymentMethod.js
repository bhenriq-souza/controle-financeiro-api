const { PaymentMethodController } = require('../controllers');

const routes = [
  {
    method: 'GET',
    url: '/api/payMethods',
    handler: PaymentMethodController.getAllPaymentMethods
  },  
  {
    method: 'POST',
    url: '/api/payMethods',
    handler: PaymentMethodController.addPaymentMethod
  },
  {
    method: 'PUT',
    url: '/api/payMethods',
    handler: PaymentMethodController.updatePaymentMethod
  },  
  {
    method: 'DELETE',
    url: '/api/payMethods',
    handler: PaymentMethodController.deletePaymentMethod
  }
];

class PaymentMethodsRoutes {

  constructor() { }

  /**
   * Get users routes
   * 
   */
  static get routes() {
    return routes;
  }

}

module.exports = PaymentMethodsRoutes;