import express, { Request, Response } from 'express';
import log from 'fancy-log';
import http from 'http';
import next from 'next';
import requestIp from 'request-ip';
import { client } from './services/redis';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev });
const handler = app.getRequestHandler();
const server = express();
export const httpServer = http.createServer(server);

server.use(requestIp.mw());
server.use(express.json());

client.on('connect', async () => {
  log.info('> Redis connected');
  await app.prepare();

  server.all('*', (req: Request, res: Response) => handler(req, res));

  httpServer.listen(port, () => {
    log.info(`> Ready on http://localhost:${port}`);
  });
});
