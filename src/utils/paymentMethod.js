

/**
 * Validate Credit Card Data 
 * 
 * @param {*} payMethod 
 */
function _validateCreditCard(payMethod) {
  return payMethod.creditCardData == null;
}

/**
 * Validate Credit Card Receipt Closing Day 
 * 
 * @param {*} payMethod 
 */
function _validateReceiptClosingDay(payMethod) {
  return  payMethod.creditCardData.receiptClosingDay &&
          payMethod.creditCardData.receiptClosingDay > 0 && 
          payMethod.creditCardData.receiptClosingDay <= 31;
}

/**
 * Validate Credit Card Receipt Due Day 
 * 
 * @param {*} payMethod 
 */
function _validateReceiptDueDay(payMethod) {
  return  payMethod.creditCardData.receiptDueDay &&
          payMethod.creditCardData.receiptDueDay > 0 && 
          payMethod.creditCardData.receiptDueDay <= 31;
}

/**
 * Validate Credit Card Overdraft Limit 
 * 
 * @param {*} payMethod 
 */
function _validateOverDraftLimit(payMethod) {
  return payMethod.creditCardData.overDraftLimit && payMethod.creditCardData.overDraftLimit > 0;
}

class PaymentMethodsUtil {

  constructor() { }

  /**
   * Validate Credit Card Payment Method
   * 
   * @param {Object} payMethod 
   * 
   * @return {Object} Result object
   */
  static isPaymentMethodValid(payMethod) {
    const result = {
      msg: [],
      valid: true
    };
    // 1. Is credit card?
    if(_validateCreditCard(payMethod)) {
      result.valid = false; 
      result.msg.push('Credit Card Data required');
    } else {
      // 2. Is receiptClosingDay valid?
      if(!_validateReceiptClosingDay(payMethod)) {
        result.valid = false; 
        result.msg.push('Receipt Closing Day must be between 1 and 31');
      }
      // 3. Is receiptDueDay valid?
      if(!_validateReceiptDueDay(payMethod)) {
        result.valid = false; 
        result.msg.push('Receipt Due Day must be between 1 and 31');
      }
      // 4. Is overDraftLimit valid?
      if(!_validateOverDraftLimit(payMethod)) {
        result.valid = false; 
        result.msg.push('Overdraft Limit must be between greather then 0');
      }
    }    
    return result;
  }
}

module.exports = PaymentMethodsUtil;