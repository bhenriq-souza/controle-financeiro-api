'use strict';

let localConfig = {
  serverPort: process.env.SERVER_PORT,
  mongo: {
    hostname: process.env.MONGO_HOSTNAME,
    port: process.env.MONGO_HOSTPORT,
    database: process.env.MONGO_DATABASE
  }
};

module.exports = localConfig;