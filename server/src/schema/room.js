const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
    {
        room: {
            type: String,
            unique: true,
            required: true,
        },
    },
    { timestamps: true },
);

const Room = mongoose.model('room', roomSchema);

module.exports = { Room };
