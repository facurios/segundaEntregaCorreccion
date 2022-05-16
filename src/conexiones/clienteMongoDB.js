const config = require('../../config');
const { MongoClient } = require("mongodb");

const cliente = new MongoClient(config.database.uri);

module.exports = cliente;