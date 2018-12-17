const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');
const fastCors = require('fastify-cors');
const fastifySwagger = require('fastify-swagger');

/**
 * Creates the server
 * 
 * @param {object} config 
 */
exports.create = (config) => {
  const { fastCorsOpt, swaggerOpt, env } = config;

  /*** Registering CORS */
  fastify.register(fastCors, fastCorsOpt.options);

  /*** Registering swagger */
  fastify.register(fastifySwagger, swaggerOpt.options);

  /*** Setting the env */
  fastify.use('env', env);

  /*** Connecting to Mongo */
  const { mongo: { hostname, database, port } } = config;
  const connectionString = `mongodb://${hostname}:${port}/${database}`;

  mongoose.connect(connectionString)
          .then(() => console.log(`Connected to database ${database}`))
          .catch(err => console.log(err));
};

/**
 * Starts the server
 */
exports.start = async () => {
  try {
    await fastify.listen(3000);
    fastify.swagger();
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
