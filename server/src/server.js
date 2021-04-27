const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const { mongoClient } = require('./service/mongoose');
const { Room } = require('./schema/room');

const createRoom = async () => {
    return new Room({
        gameOn: false,
        plansza: {
            red: [0, 1, 2, 3],
            green: [0, 1, 2, 3],
            blue: [0, 1, 2, 3],
            yellow: [0, 1, 2, 3],
        },
        red: {
            nick: 'Jan',
            insertTime: Date.now(),
            lastAct: Date.now(),
            serverTime: Date.now(),
            status: 'void',
        },
        green: {
            nick: 'Ela',
            insertTime: Date.now(),
            lastAct: Date.now(),
            serverTime: Date.now(),
            status: 'void',
        },
        blue: {
            nick: 'Joe',
            insertTime: Date.now(),
            lastAct: Date.now(),
            serverTime: Date.now(),
            status: 'void',
        },
        yellow: {
            nick: 'Dupa',
            insertTime: Date.now(),
            lastAct: Date.now(),
            serverTime: Date.now(),
            status: 'void',
        },
    });
};

const getLastRoom = async () => {
    const rooms = await Room.find();
    return rooms.pop();
};

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000000 } }));
app.use(bodyParser.urlencoded({ extended: true }));

mongoClient.then(async err => {

    app.get('/create-room', async function (req, res, next) {
        const room = createRoom();
        await room.save();

        res.end();
    });

    app.get('/username', async function (req, res, next) {
        if (req.query.name) {
            req.session.username = req.query.name;

            res.end();
        }
        res.end('Set username!!!!! /username?name=RandomName');
    });

    app.get('/room', async function (req, res, next) {
        let responseData = null;

        // sprawdz czy username jest ustawione w sesji
        // jezeli nie to zwroci null i wyswietl komponent do wprowadzenia nicku
        if (req.session.username) {
            if (req.session.userRoomId) {
                responseData = await Room.findById(req.session.userRoomId);
            }

            if (!req.session.userRoomId) {
                const lastRoom = await getLastRoom();

                if (lastRoom.gameOn) {
                    const newRoom = await createRoom();
                    await newRoom.save();
                    responseData = newRoom;

                    req.session.userRoomId = newRoom._id;
                }

                if (!lastRoom.gameOn) {
                    req.session.userRoomId = lastRoom._id;
                    responseData = await Room.findById(req.session.userRoomId);
                }
            }
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(responseData);
    });

    app.listen(3000);
});
