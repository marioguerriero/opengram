import server from './server';
import next from 'next';

import { parse } from 'url';

import pathMatch from 'path-match';

let port = (process.env.PORT || 3000);

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: './client', dev });

const handle = app.getRequestHandler();

app.prepare()
.then(() => {
  server.get('*', (req, res) => {
    const route = pathMatch();
    const userMatch = route('/user/:username');
    const postMatch = route('/post/:id');

    const { pathname, query } = parse(req.url, true);
    let params = userMatch(pathname);
    if (params) {
      return app.render(req, res, '/user', Object.assign(params, query));
    }
    params = postMatch(pathname);
    if(params) {
      return app.render(req, res, '/post', Object.assign(params, query));
    }

    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:%s', port);
  })
});
