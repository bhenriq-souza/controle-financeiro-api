const boom = require('boom');
const fastify = require('fastify')({ logger: true });

class MongooseConnection {

  /**
   * Initializes the Mongoose Connection Class
   * 
   * @param {*} mongoose 
   * @param {*} config 
   */
  constructor(mongoose, config) { 
    this.mongoose = mongoose; 
    this.config = config;
  }

  /**
   * Creates a Mongoose Connection
   * 
   */
  async connect() {
    try {
      const { mongo: { hostname, database, port } } = this.config;    
      const connectionString = `${hostname}:${port}/${database}`;
      const ret = await this.mongoose.connect(connectionString, { useNewUrlParser: true });
      fastify.log.info(`Connected to database ${ret.connection.db.databaseName}`);
    } catch(err) {
      throw boom.boomify(err);
    }
  }
};

module.exports = MongooseConnection;
