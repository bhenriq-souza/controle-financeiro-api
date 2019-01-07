

const { format } = require('date-fns');

const { PaymentMethod } = require('../models');
const { HttpUtil } = require('../utils');

class PaymentMethodService {

  constructor() { }

  /**
   * Get all Payment Methods
   * 
   * @returns {Array} Array of Payment Methods
   */
  static async getAllPaymentMethods() {
    const payMethods = await PaymentMethod.find().populate('associateBank', 'febraban');
    return HttpUtil.makeJsonResult(200, { success: true, payMethods: payMethods });
  }

  /**
   * Create a new Payment Method
   * 
   * @param {Object} payMethodData 
   * 
   * @returns {Object} Result object
   */
  static async addPaymentMethod(payMethodData) {
    const createdAt = format(new Date());  
    /*** update create date */
    payMethodData.createdAt = createdAt;
    const payMethod = new PaymentMethod(payMethodData);
    const newPayMethod = await payMethod.save();
    return HttpUtil.makeJsonResult(200, { success: true, newPayMethod: newPayMethod });
  }

  /**
   * Update a existing Payment Method
   * 
   * @param {String} id Existing Payment Method id
   * @param {Object} payMethodData Update data
   * 
   * @returns {Object} Result object
   */
  static async updatePaymentMethod(id, payMethodData) {    
    const updatedPaymentMethod = await PaymentMethod.findByIdAndUpdate(id, payMethodData, { new: true });
    if(!updatedPaymentMethod) return HttpUtil.makeJsonResult(404, { success: false, msg: ['Payment Method not found'] });
    return HttpUtil.makeJsonResult(200, { success: true, updatedPaymentMethod: updatedPaymentMethod });
  }

  /**
   * Delete a existing Payment Method
   * 
   * @param {String} id Existing Payment Method id
   * 
   * @returns {Object} Result object
   */
  static async deletePaymentMethod(id) {    
    const payMethod = await PaymentMethod.findByIdAndDelete(id);
    if(!payMethod) return HttpUtil.makeJsonResult(404, { success: false, msg: ['Payment Method not found'] });
    return HttpUtil.makeJsonResult(200, { success: true });
  }

}

module.exports = PaymentMethodService;