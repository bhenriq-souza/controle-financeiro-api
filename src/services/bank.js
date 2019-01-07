

const { format } = require('date-fns');

const { Bank } = require('../models');
const { HttpUtil } = require('../utils');

class BankService {

  constructor() { }

  /**
   * Get all bank
   * 
   * @returns {Array} Array of banks
   */
  static async getAllBanks() {
    const banks = await Bank.find();
    return HttpUtil.makeJsonResult(200, { success: true, banks: banks });
  }

  /**
   * Create a new bank
   * 
   * @param {Object} bankData 
   * 
   * @returns {Object} Result object
   */
  static async addBank(bankData) {
    const createdAt = format(new Date());  
    /*** update create date */
    bankData.createdAt = createdAt;
    const bank = new Bank(bankData);
    const newBank = await bank.save();
    return HttpUtil.makeJsonResult(200, { success: true, bank: newBank });
  }

  /**
   * Update a existing bank
   * 
   * @param {String} id Existing bank id
   * @param {Object} bankData Update data
   * 
   * @returns {Object} Result object
   */
  static async updateBank(id, bankData) {    
    const updatedBank = await Bank.findByIdAndUpdate(id, bankData, { new: true });
    if(!updatedBank) return HttpUtil.makeJsonResult(404, { success: false, msg: ['Bank not found'] });
    return HttpUtil.makeJsonResult(200, { success: true, updatedBank: updatedBank });
  }

  /**
   * Delete a existing bank
   * 
   * @param {String} id Existing bank id
   * 
   * @returns {Object} Result object
   */
  static async deleteBank(id) {    
    const bank = await Bank.findByIdAndDelete(id);
    if(!bank) return HttpUtil.makeJsonResult(404, { success: false, msg: ['Bank not found'] });
    return HttpUtil.makeJsonResult(200, { success: true });
  }

}

module.exports = BankService;