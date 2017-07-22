import server from './server';
import next from 'next';

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
    console.log('> Ready on http://localhost:%s', port);
  })
});
