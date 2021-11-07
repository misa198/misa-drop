import socketIO, { Socket } from 'socket.io';
import { httpServer } from '../bootstrap';

export const io = new socketIO.Server();
io.attach(httpServer);

io.on('connection', (socket: Socket) => {
  console.log(socket.id);
});
