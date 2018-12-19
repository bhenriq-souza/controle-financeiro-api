
class ServerUtil {
  
  constructor() { }

  /**
   * Registers routes dinamically
   * 
   * @param {*} route 
   * @param {*} server 
   */
  static registerRoute(route, server) {
     server.route(route);
  }
}

module.exports = ServerUtil;