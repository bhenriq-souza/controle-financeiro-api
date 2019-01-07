const mongoose = require('mongoose');

const PaymentMethodSchema = new mongoose.Schema({  
  name:           { type: String, required: true },
  associateBank:  { type: mongoose.Schema.Types.ObjectId, ref: 'Bank', required: false }
});

module.exports = mongoose.model('PaymentMethod', PaymentMethodSchema);