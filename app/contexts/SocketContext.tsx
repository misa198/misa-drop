import { createContext, FC, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppSelector } from '../hooks/redux';

export const SocketContext = createContext<Socket | null>(null);

const SocketProvider: FC = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const user = useAppSelector((state) => state.user);

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

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
