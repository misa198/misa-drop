import socketIO, { Socket } from 'socket.io';
import { User } from '../../models/Room';
import { httpServer } from '../bootstrap';
import * as roomService from '../services/room';
import { authSocket } from './socketAuth';

export const io = new socketIO.Server();
io.attach(httpServer);

io.on('connection', (socket: Socket) => {
  socket.on('join-room', async (user: User) => {
    try {
      const authUser = authSocket(socket);
      if (!authUser) return socket.emit('error', 'Unauthorized');
      await roomService.addUserToRoom(authUser.ip, {
        ...user,
        id: authUser.id,
      });
      const room = await roomService.findRoom(authUser.ip);
      socket.join(authUser.ip);
      socket.emit('join-room-successfully', { room });
      socket.to(authUser.ip).emit('new-user-joined', {
        user: {
          id: authUser.id,
          name: user.name,
          color: user.color,
        },
      });
    } catch (e) {
      socket.emit('error', e);
    }
  });

  socket.on('disconnect', async () => {
    try {
      const authUser = authSocket(socket);
      if (!authUser) return socket.emit('error', 'Unauthorized');
      await roomService.removeUserFromRoom(authUser.ip, socket.id);
      socket.to(authUser.ip).emit('user-left', {
        id: socket.id,
      });
    } catch (e) {
      socket.emit('error', e);
    }
  });
});
