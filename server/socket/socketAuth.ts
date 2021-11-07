import { Socket } from 'socket.io';
import { verifyToken } from '../services/jwt';

export const authSocket = (socket: Socket) => {
  if (socket.handshake.query) {
    if (socket.handshake.query.token) {
      const user = verifyToken(socket.handshake.query.token as string);
      if (user) {
        return {
          id: socket.id,
          ip: user.ip,
        };
      }
    }
  }
  return null;
};
