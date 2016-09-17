import http from 'http';

import server from './../../server';
import config from './../config_test';

export default function() {
    var port = config.testport;
    server.set('port', port);
    var httpServer = http.createServer(server);
    httpServer.listen(port);
    return httpServer;
};