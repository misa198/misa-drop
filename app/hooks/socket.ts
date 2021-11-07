import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppSelector } from './redux';

let initialSocket: Socket | null = null;

export const useInitSocket = (): void => {
  const user = useAppSelector((state) => state.user);
  const [socket, setSocket] = useState<Socket | null>(null);

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

  useEffect((): any => {
    socket?.on('connect', () => {
      initialSocket = socket;
    });

    return () => socket?.off('connect');
  }, [socket]);

  useEffect((): any => {
    socket?.on('disconnected', () => {
      console.log('connected');
      initialSocket = null;
    });

    return () => socket?.off('disconnected');
  }, [socket]);
};

export const useSocket = () => {
  return initialSocket;
};
