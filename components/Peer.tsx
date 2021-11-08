import Peer from 'peerjs';
import { FC, useContext, useEffect } from 'react';
import { PeerContext } from '../app/contexts/PeerContext';
import { useAppDispatch, useAppSelector } from '../app/hooks/redux';
import { useSocket } from '../app/hooks/socket';
import { transferActions } from '../app/store/slices/transfer.slice';
import { APP_NAME } from '../constants/app';
import { CHUNK_LENGTH } from '../constants/file';

const PeerCom: FC = () => {
  const socket = useSocket();
  const dispatch = useAppDispatch();
  const transfer = useAppSelector((state) => state.transfer);
  const peer = useContext(PeerContext);

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
        if (transfer.status) {
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
  }, [dispatch, socket, transfer.status]);

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
    const data = remainData.slice(0, CHUNK_LENGTH);
    conn.send(data);
    dispatch(transferActions.addNewPath(data));
    if (remainData.length > CHUNK_LENGTH) {
      setTimeout(() => onChunkFile(remainData.slice(CHUNK_LENGTH), conn), 0);
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
  useEffect((): any => {
    peer?.on('connection', (conn) => {
      conn.on('data', (data: string) => {
        dispatch(transferActions.addNewPath(data));
      });
    });
  }, [dispatch, peer]);

  useEffect(() => {
    if (transfer.paths?.length === transfer.numberOfPaths && transfer.status) {
      dispatch(transferActions.setTransferStatus('completed'));
    }
  }, [
    dispatch,
    transfer.numberOfPaths,
    transfer.paths?.length,
    transfer.status,
  ]);

  return null;
};

export default PeerCom;
