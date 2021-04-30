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

const createRoom = async () => {
  return new Room({
    gameOn: false,
    plansza: {
      red: [0, 1, 2, 3],
      green: [0, 1, 2, 3],
      blue: [0, 1, 2, 3],
      yellow: [0, 1, 2, 3],
    },
    turn: 'red',
    red: {
      nick: '',
      // insertTime: Date.now(),
      // lastAct: Date.now(),
      // serverTime: Date.now(),
      status: 'void',
    },
    green: {
      nick: '',
      // insertTime: Date.now(),
      // lastAct: Date.now(),
      // serverTime: Date.now(),
      status: 'void',
    },
    blue: {
      nick: '',
      // insertTime: Date.now(),
      // lastAct: Date.now(),
      // serverTime: Date.now(),
      status: 'void',
    },
    yellow: {
      nick: '',
      // insertTime: Date.now(),
      // lastAct: Date.now(),
      // serverTime: Date.now(),
      status: 'void',
    },
  });
};

const getLastRoom = async () => {
  const rooms = await Room.find();
  return rooms.pop();
};

const getUserRoomId = async () => {
  const lastRoom = await getLastRoom();

  if (lastRoom.gameOn) {
    const newRoom = await createRoom();
    await newRoom.save();

    return newRoom._id;
  }

  return lastRoom._id;
};

const setUserToRoom = async (roomId, nick) => {
  const userColors = ['red', 'green', 'blue', 'yellow'];
  const userRoom = await Room.findById(roomId);

  const userColor = userColors.find(color => userRoom[color].nick === '');
  userRoom[userColor].nick = nick;

  return await userRoom.save();
};

module.exports = { Room, createRoom, getLastRoom, getUserRoomId, setUserToRoom };

