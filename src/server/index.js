const { MongoConnection } = require('../database');
const { registerRoute } = require('../utils');
const { routes } = require('../routes');

class Server {

  /**
   * Initialize the Server Class
   * 
   * @constructor
   * 
   * @param {*} fastify 
   * @param {*} mongoose 
   * @param {*} fastCors 
   * @param {*} fastifySwagger 
   */ 
  constructor(fastify, mongoose,  fastCors, fastifySwagger) {
    this.fastify = fastify;
    this.mongoose = mongoose;
    this.fastCors = fastCors;
    this.fastifySwagger = fastifySwagger;
  }

  /**
   * Creates the server
   * 
   * @param {Object} config 
   */
  async create(config) {
    const { fastCorsOpt, swaggerOpt, env, serverPort } = config;

    /*** Setting the server port */
    this.port = serverPort;

    /*** Registering CORS */
    this.fastify.register(this.fastCors, fastCorsOpt.options);

    /*** Registering swagger */
    this.fastify.register(this.fastifySwagger, swaggerOpt.options);

    /*** Registering routes */
    routes.forEach( route => registerRoute(route, this.fastify) );

    /*** Setting the env */
    this.fastify.use('env', env);

    /*** Setting mongoose's index creation as true */
    this.mongoose.set('useCreateIndex', true);

    /*** Connecting to Mongo */    
    const mongooseConn = new MongoConnection(this.mongoose, config);
    mongooseConn.connect();
  }

  /**
   * Starts the server
   */
  async start() {
    try {
      await this.fastify.listen(this.port);
      this.fastify.swagger();
      this.fastify.log.info(`server listening on ${this.fastify.server.address().port}`);
    } catch (err) {
      this.fastify.log.error(err);
      process.exit(1);
    }
  };
}

module.exports = Server;