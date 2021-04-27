const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const { mongoClient } = require('./service/mongoose');
const { Room } = require('./schema/room');

mongoClient.then(async err => {
    app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 } }));

    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/', function (req, res, next) {
        const room = new Room({ id: Date.now() });

        room.save(function (err, fluffy) {
            if (err) return console.error(err);
            return;
        });
        // if (req.session.views) {
        //     req.session.views++
        //     res.setHeader('Content-Type', 'text/html')
        //     res.write('<p>views: ' + req.session.views + '</p>')
        //     res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
        //     res.end()
        // } else {
        //     req.session.views = 1
        //     res.end('welcome to the session demo. refresh!')
        // }
    });

    app.listen(3000);
});
