const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  createdAt:      { type: Date },
  dueDate:        { type: Date, default: null },
  fixedValue:     { type: Boolean, required: true },
  fixedData:      { type: Boolean, required: true },
  value:          { type: Number, required: true },
  user:           { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fixedDueDay:    { type: Number, default: null },
  payMethod:      { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentMethod', required: true },
  description:    { type: String, required: true },
  isInstallment:  { type: Boolean, required: true }
});

module.exports = mongoose.model('Expense', ExpenseSchema);
