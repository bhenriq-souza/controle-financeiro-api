'use strict';

const _ = require('lodash');
const env = process.env.SERVER_ENV || 'local';
const envConfig = require('./' + env);
const cors = require('./cors');
const swagger = require('./swagger');

let defaultConfig = { 
  env: env,
  fastCorsOpt: cors,
  swaggerOpt: swagger
};

module.exports = _.merge(defaultConfig, envConfig);