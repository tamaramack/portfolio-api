/**
 * caller-ip js file created by Tamara G. Mack on 21-Oct-19 for portfolio-api
 */
module.exports = function getIpAddressFromRequest (request) {
  let ip = request.headers['x-forwarded-for'] ||
    request.connection.remoteAddress ||
    request.socket.remoteAddress ||
    request.connection.socket.remoteAddress;
  ip = ip.split(',')[0];
  ip = ip.split(':').slice(-1); //in case the ip returned in a format: "::ffff:146.xxx.xxx.xxx"
  return ip[0];
};
