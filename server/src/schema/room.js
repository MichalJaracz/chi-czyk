const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  id: Number,
  started: Boolean,
  plansza: Array,
});

const Room = mongoose.model('Room', roomSchema);

module.exports = { Room };
