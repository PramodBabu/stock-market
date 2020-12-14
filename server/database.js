
const Client = require('pg').Client;
const credentials = require('./credentials');

const db = new Client({
    user: credentials.username,
    database: credentials.database,
    password: credentials.password,
    host: credentials.server, 
    port: credentials.port, 
  });

  module.exports = db;