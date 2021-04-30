const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  gameOn: Boolean,
  turn: String,
  plansza: {
    red: [Number],
    green: [Number],
    blue: [Number],
    yellow: [Number],
  },
  red: {
    nick: String,
    color: String,
    status: {
      type: String,
      enum: ['connected', 'ready', 'void'],
      default: 'void',
    },
  },
  green: {
    nick: String,
    color: String,
    status: {
      type: String,
      enum: ['connected', 'ready', 'void'],
      default: 'void',
    },
  },
  blue: {
    nick: String,
    color: String,
    status: {
      type: String,
      enum: ['connected', 'ready', 'void'],
      default: 'void',
    },
  },
  yellow: {
    nick: String,
    color: String,
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
    turn: 'red',
    plansza: {
      red: [0, 1, 2, 3],
      green: [0, 1, 2, 3],
      blue: [0, 1, 2, 3],
      yellow: [0, 1, 2, 3],
    },
    turn: 'red',
    red: {
      nick: '',
      status: 'void',
    },
    green: {
      nick: '',
      status: 'void',
    },
    blue: {
      nick: '',
      status: 'void',
    },
    yellow: {
      nick: '',
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
  const userColors = ['red', 'green'];
  const userRoom = await Room.findById(roomId);

  const userColor = userColors.find(color => userRoom[color].nick === '');
  userRoom[userColor].nick = nick;

  if (userColor === 'green') {
    userRoom.gameOn = true;
  }

  await userRoom.save();

  return userColor;
};

module.exports = { Room, createRoom, getLastRoom, getUserRoomId, setUserToRoom };

