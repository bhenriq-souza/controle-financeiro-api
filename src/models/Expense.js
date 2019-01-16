const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  createdAt:            { type: Date },
  dueDate:              { type: Date, default: null },
  fixedValue:           { type: Boolean, required: true },
  fixedDate:            { type: Boolean, required: true },
  value:                { type: Number, required: true },
  user:                 { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  payMethod:            { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'PaymentMethod', 
    required: true 
  },
  description:          { type: String, required: true },
  numberOfInstallment:  { type: Number, required: false },
  pendentData:          { type: Boolean, required: false }
});

module.exports = mongoose.model('Expense', ExpenseSchema);
