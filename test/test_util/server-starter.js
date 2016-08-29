var running = false;
var httpServer = null;

module.exports = function() {
    if(!running) {
        var server = require('./../../server');
        var port = require('./../config_test').testport;
        server.set('port', port);
        httpServer = require('http').createServer(server);
        httpServer.listen(port);

        running = true;
    }
    return httpServer;
};