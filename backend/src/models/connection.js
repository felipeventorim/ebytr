const { MongoClient } = require('mongodb');

require('dotenv').config();

const DB_NAME = 'TodoList';

// const uri = "mongodb+srv://<login>:<password>@cluster0.2dmiw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const uri = `mongodb+srv://${process.env.LOGIN}:${process.env.PASSWORD}@cluster0.2dmiw.mongodb.net/ebytr?retryWrites=true&w=majority`;

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

const connection = () => (db
  ? Promise.resolve(db)
  : MongoClient.connect(uri, OPTIONS).then((conn) => {
    db = conn.db(DB_NAME);
    return db;
  }));

module.exports = connection;
