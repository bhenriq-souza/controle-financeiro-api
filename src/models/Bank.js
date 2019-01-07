const mongoose = require('mongoose');

const BankSchema = new mongoose.Schema({  
  createdAt:      { type: Date },
  febraban:       { type: String, required: true },
  name:           { type: String, required: true }
});

module.exports = mongoose.model('Bank', BankSchema);