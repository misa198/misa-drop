import Peer from 'peerjs';
import { createContext, FC, useEffect, useState } from 'react';
import { APP_NAME } from '../../constants/app';
import { useAppSelector } from '../hooks/redux';

export const PeerContext = createContext<Peer | null>(null);

const PeerProvider: FC = ({ children }) => {
  const [peerState, setPeerState] = useState<Peer | null>(null);
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user.id) {
      setPeerState(new Peer(`${APP_NAME}-${user.id}`));
    } else {
      setPeerState(null);
    }
  }, [user.id]);

  return (
    <PeerContext.Provider value={peerState}>{children}</PeerContext.Provider>
  );
};
export default PeerProvider;
