module.exports = function() {
    var server = require('./../../server');
    var port = require('./../config_test').testport;
    server.set('port', port);
    require('http').createServer(server).listen(port);
};