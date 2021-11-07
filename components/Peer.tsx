import { FC, useEffect } from 'react';
import { useInitPeer } from '../app/hooks/peer';
import { useAppDispatch, useAppSelector } from '../app/hooks/redux';
import { useSocket } from '../app/hooks/socket';
import { transferActions } from '../app/store/slices/transfer.slice';

const Peer: FC = () => {
  useInitPeer();

  const socket = useSocket();
  const dispatch = useAppDispatch();
  const transfer = useAppSelector((state) => state.transfer);

  useEffect((): any => {
    const message = 'request-send-data';
    socket?.on(
      message,
      (data: {
        from: string;
        to: string;
        fileName: string;
        fileSize: string;
        numberOfPaths: number;
      }) => {
        if (transfer.numberOfPaths) {
          socket?.emit('deny-receive-data', {
            from: data.from,
            to: data.to,
          });
        } else {
          dispatch(transferActions.setNewRequest(data));
        }
      },
    );

    return () => socket?.off(message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, socket]);

  useEffect((): any => {
    const message = 'deny-receive-data';
    socket?.on(message, () => {
      dispatch(transferActions.setTransferStatus('denied'));
    });

    return () => socket?.off(message);
  }, [dispatch, socket]);

  useEffect((): any => {
    const message = 'cancel-transferring';
    socket?.on(message, () => {
      if (transfer.status) {
        console.log('cancel');
        dispatch(transferActions.setTransferStatus('canceled'));
      }
    });

    return () => socket?.off(message);
  }, [dispatch, socket, transfer.status]);

  return null;
};

export default Peer;
