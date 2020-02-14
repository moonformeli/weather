import Config from '@/config/Config';
import { LunaReq } from '@/models/common/interfaces/IServer';
import routes from '@/server/routes';
import debug from 'debug';
import express, { Request } from 'express';
import next from 'next';

const log = debug('luna:Application');

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = routes.getRequestHandler(app);

type TRequest = Request & Partial<LunaReq>;

app.prepare().then(() => {
  log('prepare');
  const server = express();

  routes['routes'].forEach(({ pattern, page }) => {
    server.get(pattern, (req: TRequest, res) => {
      log(pattern, page);
      req.Config = Config;
      app.render(req, res, page, { ...req.query, ...req.params });
    });
  });
  server.route('*').get((req, res) => handler(req, res));

  server.listen(port, err => {
    if (err) throw err;
    log(`> Ready on http://localhost:${port}`);
  });
});
