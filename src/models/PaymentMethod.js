const mongoose = require('mongoose');

const PaymentMethodSchema = new mongoose.Schema({  
  name:           { type: String, required: true },
  associateBank:  { type: mongoose.Schema.Types.ObjectId, ref: 'Bank', required: false },
  isCreditCard:   { type: Boolean, required: true },
  creditCardData: {
    brandName:          { type: String },
    receiptClosingDay:  { type: Number },
    receiptDueDay:      { type: Number },
    overDraftLimit:     { type: Number },
  }
});

module.exports = mongoose.model('PaymentMethod', PaymentMethodSchema);