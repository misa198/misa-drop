import socketIO, { Socket } from 'socket.io';
import { User } from '../../models/Room';
import { httpServer } from '../bootstrap';
import * as roomService from '../services/room';
import { authSocket } from './socketAuth';

export const io = new socketIO.Server();
io.attach(httpServer);

io.on('connection', (socket: Socket) => {
  socket.on('join-room', (user: User) => {
    try {
      const authUser = authSocket(socket);
      if (!authUser) return socket.emit('error', 'Unauthorized');
      roomService.addUserToRoom(authUser.ip, {
        ...user,
        id: authUser.id,
      });
      const room = roomService.findRoom(authUser.ip);
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

  socket.on('request-send-data', (payload: any) => {
    try {
      const authUser = authSocket(socket);
      if (!authUser) return socket.emit('error', 'Unauthorized');
      socket.to(payload.to).emit('request-send-data', payload);
    } catch (e) {
      socket.emit('error', e);
    }
  });

  socket.on('deny-receive-data', (payload: { from: string; to: string }) => {
    try {
      const authUser = authSocket(socket);
      if (!authUser) return socket.emit('error', 'Unauthorized');
      socket.to(payload.from).emit('deny-receive-data');
    } catch (e) {
      socket.emit('error', e);
    }
  });

  socket.on('cancel-transferring', (payload: { from: string; to: string }) => {
    try {
      const authUser = authSocket(socket);
      if (!authUser) return socket.emit('error', 'Unauthorized');
      socket
        .to(socket.id === payload.to ? payload.from : payload.to)
        .emit('cancel-transferring');
    } catch (e) {
      socket.emit('error', e);
    }
  });

  socket.on('accept-transfer', (payload: { from: string; to: string }) => {
    try {
      const authUser = authSocket(socket);
      if (!authUser) return socket.emit('error', 'Unauthorized');
      socket.to(payload.from).emit('accept-transfer');
    } catch (e) {
      socket.emit('error', e);
    }
  });

  socket.on('disconnect', () => {
    try {
      const authUser = authSocket(socket);
      if (!authUser) return socket.emit('error', 'Unauthorized');
      roomService.removeUserFromRoom(authUser.ip, socket.id);
      socket.to(authUser.ip).emit('user-left', {
        id: socket.id,
      });
    } catch (e) {
      socket.emit('error', e);
    }
  });
});
