'use strict';
const secureKey = process.env.SECURE_KEY || 'securityKeyDevMode';

let localConfig = {
  serverPort: process.env.SERVER_PORT,
  mongo: {
    hostname: process.env.MONGO_HOSTNAME,
    port: process.env.MONGO_HOSTPORT,
    database: process.env.MONGO_DATABASE
  },
  secureKey: secureKey
};

module.exports = localConfig;