const path = require('path');
const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');
const fastCors = require('fastify-cors');
const fastifySwagger = require('fastify-swagger');

/** Requiring dotenv, as soon as possible **/
require('dotenv').config({ path: path.join(__dirname, '.env') }); 

const config = require('./src/config');
const Server = require('./src/server');
const serverObj = new Server(fastify, mongoose, fastCors, fastifySwagger);

serverObj.create(config);
serverObj.start();
