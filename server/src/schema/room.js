const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  gameOn: Boolean,
  plansza: {
    red: [Number],
    green: [Number],
    blue: [Number],
    yellow: [Number],
  },
  red: {
    nick: String,
    color: String,
    insertTime: Number,
    lastAct: Number,
    serverTime: Number,
    status: {
      type: String,
      enum: ['connected', 'ready', 'void'],
      default: 'void',
    },
  },
  green: {
    nick: String,
    color: String,
    insertTime: Number,
    lastAct: Number,
    serverTime: Number,
    status: {
      type: String,
      enum: ['connected', 'ready', 'void'],
      default: 'void',
    },
  },
  blue: {
    nick: String,
    color: String,
    insertTime: Number,
    lastAct: Number,
    serverTime: Number,
    status: {
      type: String,
      enum: ['connected', 'ready', 'void'],
      default: 'void',
    },
  },
  yellow: {
    nick: String,
    color: String,
    insertTime: Number,
    lastAct: Number,
    serverTime: Number,
    status: {
      type: String,
      enum: ['connected', 'ready', 'void'],
      default: 'void',
    },
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = { Room };

