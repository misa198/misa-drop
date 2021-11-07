import express, { Request, Response } from 'express';
import log from 'fancy-log';
import http from 'http';
import next from 'next';
import requestIp from 'request-ip';
import { IS_DEV, PORT } from './configs/app';
import rootRoute from './routes';
require('./services/nedb');

const app = next({ dev: IS_DEV });
const handler = app.getRequestHandler();
const server = express();
export const httpServer = http.createServer(server);

server.use(requestIp.mw());
server.use(express.json());

export const bootstrap = async () => {
  log.info('> Redis connected');
  await app.prepare();

  server.use('/api/', rootRoute);

  server.all('*', (req: Request, res: Response) => handler(req, res));

  httpServer.listen(PORT, () => {
    log.info(`> Ready on http://localhost:${PORT}`);
  });
};
