module.exports = function() {
    var server = require('./../../server');
    var port = require('./../config_test').testport;
    server.set('port', port);
    var httpServer = require('http').createServer(server);
    httpServer.listen(port);
    return httpServer;
};