class Server {
  constructor(fastify, mongoose,  fastCors, fastifySwagger) {
    this.fastify = fastify;
    this.mongoose = mongoose;
    this.fastCors = fastCors;
    this.fastifySwagger = fastifySwagger;
  }

  /**
   * Creates the server
   * 
   * @param {object} config 
   */
  create(config) {
    const { fastCorsOpt, swaggerOpt, env, serverPort } = config;

    /*** Setting the server port */
    this.port = serverPort;

    /*** Registering CORS */
    this.fastify.register(this.fastCors, fastCorsOpt.options);

    /*** Registering swagger */
    this.fastify.register(this.fastifySwagger, swaggerOpt.options);

    /*** Setting the env */
    this.fastify.use('env', env);

    /*** Connecting to Mongo */
    const { mongo: { hostname, database, port } } = config;    
    const connectionString = `${hostname}:${port}/${database}`;

    this.mongoose.connect(connectionString, { useNewUrlParser: true })
      .then(() => console.log(`Connected to database ${database}`))
      .catch(err => console.log(err));
  }


  /**
   * Starts the server
   */
  async start() {
    try {
      await this.fastify.listen(this.port);
      this.fastify.swagger();
      this.fastify.log.info(`server listening on ${this.fastify.server.address().port}`)
    } catch (err) {
      this.fastify.log.error(err);
      process.exit(1);
    }
  };
}

module.exports = Server;
