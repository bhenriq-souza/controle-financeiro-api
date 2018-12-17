const path = require('path');
const config = require('./config')
const server = require('./server');
require('dotenv').config({ path: path.join(__dirname, '.env') }); /** Requiring dotenv, as soon as possible **/

server.create(config);
server.start();


