const mongoose = require('mongoose');

const uri = "mongodb+srv://misiuCep:vky1Jh8b9XAAl0ya@cluster0.73pmi.mongodb.net/chinese?retryWrites=true&w=majority";

const mongoClient = mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('DB Connected'));

module.exports = { mongoClient };
