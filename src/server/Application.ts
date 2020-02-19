import Config from '@/config/Config';
import { TNext, TRequest, TResponse } from '@/models/common/interfaces/IServer';
import WeatherRoute from '@/server/router/WeatherRouter';
import routes from '@/server/routes';
import cors from 'cors';
import debug from 'debug';
import express from 'express';
import next from 'next';

const log = debug('Luna:Application');

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  log('prepare');
  const server = express().use(cors());

  server.use((req: TRequest, _, next: TNext) => {
    req.Config = Config;
    next();
  });

  routes['routes'].forEach(({ pattern, page }) => {
    server.get(pattern, (req: TRequest, res: TResponse) => {
      log(pattern, page);
      app.render(req, res, page, { ...req.query, ...req.params });
    });
  });
  server.use(new WeatherRoute().routes());

  server.route('*').get((req: TRequest, res: TResponse) => handler(req, res));

  server.listen(port, err => {
    if (err) throw err;
    log(`> Ready on http://localhost:${port}`);
  });
});
