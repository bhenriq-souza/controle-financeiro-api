
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

  /**
   * Build JSON for returning service's result
   * 
   * @param {Number} httpStatus 
   * @param {Object} result 
   * 
   * @returns {Object} Return JSON
   */
  static makeJsonResult(httpStatus, result) {
    return {
      status: httpStatus,
      result: {
        ...result
      }
    };
  }
}

module.exports = HttpUtil;