import express, { Request, Response } from 'express';
import http from 'http';
import next from 'next';
import requestIp from 'request-ip';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev });
const handler = app.getRequestHandler();
const server = express();
server.use(requestIp.mw());
export const httpServer = http.createServer(server);

(async () => {
  await app.prepare();

  server.use(express.json());

  server.all('*', (req: Request, res: Response) => handler(req, res));

  httpServer.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
})();
