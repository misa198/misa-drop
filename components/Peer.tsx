import Peer from 'peerjs';
import { FC, useEffect } from 'react';
import { useInitPeer, usePeer } from '../app/hooks/peer';
import { useAppDispatch, useAppSelector } from '../app/hooks/redux';
import { useSocket } from '../app/hooks/socket';
import { transferActions } from '../app/store/slices/transfer.slice';
import { APP_NAME } from '../constants/app';
import { CHUNK_LENGTH } from '../constants/file';

const PeerCom: FC = () => {
  useInitPeer();

  const socket = useSocket();
  const dispatch = useAppDispatch();
  const transfer = useAppSelector((state) => state.transfer);
  const peer = usePeer();

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
      if (transfer.status !== 'completed' && transfer.status) {
        dispatch(transferActions.setTransferStatus('canceled'));
      }
    });

    return () => socket?.off(message);
  }, [dispatch, socket, transfer.status]);

  // Send file
  function onChunkFile(remainData: string, conn: Peer.DataConnection) {
    let data: string;
    if (remainData.length > CHUNK_LENGTH) {
      data = remainData.slice(0, CHUNK_LENGTH);
      conn.send(data);
      dispatch(transferActions.addNewPath(data));
      onChunkFile(remainData.slice(CHUNK_LENGTH), conn);
    } else {
      data = remainData;
      dispatch(transferActions.addNewPath(data));
      conn.send(data);
    }
  }

  useEffect((): any => {
    const message = 'accept-transfer';
    socket?.on(message, () => {
      dispatch(transferActions.setTransferStatus('transferring'));
      if (transfer.fileContent) {
        const conn = peer?.connect(`${APP_NAME}-${transfer.to}`);
        const _fileContent = transfer.fileContent;
        if (conn) {
          conn.on('open', () => {
            onChunkFile(_fileContent, conn);
          });
        }
      }
    });
    return () => socket?.off(message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, peer, socket, transfer.fileContent, transfer.to]);

  // Receive file
  useEffect(() => {
    if (transfer.status === 'transferring' && !transfer.fileContent) {
      peer?.on('connection', (conn) => {
        conn.on('data', (data: string) => {
          dispatch(transferActions.addNewPath(data));
        });
      });
    }
  }, [dispatch, peer, transfer.fileContent, transfer.status]);

  useEffect(() => {
    if (transfer.paths?.length === transfer.numberOfPaths && transfer.paths) {
      dispatch(transferActions.setTransferStatus('completed'));
    }
  }, [
    dispatch,
    transfer.numberOfPaths,
    transfer.paths,
    transfer.paths?.length,
  ]);

  return null;
};

export default PeerCom;
