const express = require('express')
const app = express()
const session = require('express-session')
const bodyParser = require('body-parser');
const { mongoClient } = require('./service/mongoose');


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://classed:<password>@cluster0.73pmi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const collection = client.db("test").collections().then((data) => {
        console.log(data);
    });
    // console.log(collection);

    app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 } }))

    app.use(bodyParser.urlencoded({ extended: true }))

    app.get('/', function (req, res, next) {
        if (req.session.views) {
            req.session.views++
            res.setHeader('Content-Type', 'text/html')
            res.write('<p>views: ' + req.session.views + '</p>')
            res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
            res.end()
        } else {
            req.session.views = 1
            res.end('welcome to the session demo. refresh!')
        }
    });

    app.listen(3000);

    client.close();
});

// mongoClient.connect().then(() => {
//     app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 } }))

//     app.use(bodyParser.urlencoded({ extended: true }))

//     app.get('/', function (req, res, next) {
//         console.log(req.session);
//         if (req.session.views) {
//             req.session.views++
//             res.setHeader('Content-Type', 'text/html')
//             res.write('<p>views: ' + req.session.views + '</p>')
//             res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
//             res.end()
//         } else {
//             req.session.views = 1
//             res.end('welcome to the session demo. refresh!')
//         }
//     });
// });
