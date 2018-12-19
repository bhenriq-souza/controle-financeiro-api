const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email:      { type: String, unique: true, required: true, trim: true },
  password:   { type: String },
  createdAt:  { type: Date },
  lastLogin:  { type: Date, default: null },
  avatarUrl:  { type: String, default: null }
});

module.exports = mongoose.model('User', UserSchema);
