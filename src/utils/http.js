
class HttpUtil {

  constructor() { }

  /**
   * Build a generic http response
   * 
   * @param {*} reply 
   * @param {*} status 
   * @param {*} object 
   */
  static makeHttpResponse(reply, status, object) {
    reply.status(status).send({ ...object });
  }
}

module.exports = HttpUtil;