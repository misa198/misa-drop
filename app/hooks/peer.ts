import Peer from 'peerjs';
import { useEffect, useState } from 'react';
import { APP_NAME } from '../../constants/app';
import { useAppSelector } from './redux';

let initialPeer: Peer | null;

export const useInitPeer = (): void => {
  const user = useAppSelector((state) => state.user);
  const [peer, setPeer] = useState<Peer | null>(null);
  initialPeer = peer;

  useEffect(() => {
    if (user.id) {
      setPeer(new Peer(`${APP_NAME}-${user.id}`));
    } else {
      setPeer(null);
    }
  }, [user.id]);
};

export const usePeer = () => {
  return initialPeer;
};
