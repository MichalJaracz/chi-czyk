const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://michalj0721@gmail.com:Jakistam123@cluster0.73pmi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = { mongoClient };
