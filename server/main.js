import server from './server';
import next from 'next';
import debug from 'debug';

let log = debug('opengram:server');
log.log = console.log.bind(console);
let err = debug('opengram:error');

let port = (process.env.PORT || 3000);

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: './client', dev });

const handle = app.getRequestHandler();

app.prepare()
.then(() => {
  server.get('*', (req, res) => {
    return handle(req, res)
  });

  server.listen(port, (err) => {
    if (err) throw err;
    log('> Ready on http://localhost:%s', port);
  })
});
