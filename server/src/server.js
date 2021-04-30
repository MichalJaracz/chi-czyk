const express = require('express');
const session = require('express-session');
const cors = require('cors');

const bodyParser = require('body-parser');
const { mongoClient } = require('./service/mongoose');
const { Room, createRoom, setUserToRoom, getUserRoomId } = require('./schema/room');

const app = express();

const corsWhitelist = [
  'http://localhost:8888',
    /** other domains if any */
];

app.set('trust proxy', 1);
app.use(cors({
    credentials: true,
    origin: function(origin, callback) {
        if (corsWhitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}));
app.use(session({
    secret: 'keyboard cat',
    cookie: {},
    resave: false,
    saveUninitialized : false,
}));
app.use(bodyParser());

mongoClient.then(async err => {
    app.get('/create-room', async function (req, res, next) {
        const room = createRoom();
        await room.save();

        res.end();
    });

    app.get('/test-session', function (req, res, next) {
        if (req.session.views) {
            req.session.views = req.session.views + 1;
        }
        if (!req.session.views) {
            req.session.views = 1;
        }
        res.end(JSON.stringify({
            views: req.session.views,
            username: req.session.username,
        }));
    });

    app.post('/user', async function (req, res, next) {
        if (req.body.username && !req.session.username) {
            const userRoomId = await getUserRoomId();
            await setUserToRoom(userRoomId, req.body.username);

            req.session.username = req.body.username;
            req.session.userRoomId = userRoomId;

            res.end();
        }
        res.end();
    });

    app.post('/room', async function (req, res, next) {
        console.log('POST /room, body:', req.body);

        let responseData = null;

        if (req.session.username && req.session.userRoomId) {
            responseData = await Room.findById(req.session.userRoomId);
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(responseData);
    });

    app.listen(3000);
});
