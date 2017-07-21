import http from 'http';

import server from './../../server/server';
import config from './../config_test';

export default function() {
    var port = config.testport;
    return server.listen(port, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:%s', port);
    });
};
