import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppSelector } from './redux';

let initialSocket: Socket | null = null;

export const useInitSocket = (): void => {
  const user = useAppSelector((state) => state.user);
  const [socket, setSocket] = useState<Socket | null>(null);
  initialSocket = socket;

  useEffect(() => {
    if (user.token) {
      setSocket(
        io('/', {
          query: {
            token: user.token,
          },
          transports: ['websocket'],
        }),
      );
    } else {
      setSocket(null);
    }
  }, [user.token]);
};

export const useSocket = () => {
  return initialSocket;
};
