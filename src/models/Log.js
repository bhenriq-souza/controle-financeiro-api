const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const LogSchema = mongoose.Schema({
  action:     { type: String, required: true },
  category:   { type: String, required: true },
  createdBy:  { type: ObjectId, ref: 'User', required: true },
  message:    { type: String, required: true },
  diff:       { type: Schema.Types.Mixed },
},{
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
});

LogSchema.index({ action: 1, category: 1 });

module.exports = mongoose.model('Log', LogSchema);