const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nick: String,
  color: String,
  insertTime: Number,
  lastAct: Number,
  serverTime: Number,
  status: Number,
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
