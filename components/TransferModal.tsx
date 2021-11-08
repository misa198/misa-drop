import classnames from 'classnames';
import { Line } from 'rc-progress';
import { FC, useContext, useEffect, useMemo } from 'react';
import { X } from 'react-feather';
import { SocketContext } from '../app/contexts/SocketContext';
import { useAppDispatch, useAppSelector } from '../app/hooks/redux';
import { useTranslate } from '../app/hooks/translation';
import { transferActions } from '../app/store/slices/transfer.slice';
import Button from './Button';

const Modal: FC = () => {
  const { t } = useTranslate();
  const transferState = useAppSelector((state) => state.transfer);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const socket = useContext(SocketContext);

  const from = useMemo(() => {
    if (transferState.fileContent) {
      return user.name;
    } else {
      return user.guests.find((guest) => guest.id === transferState.from)
        ?.name as string;
    }
  }, [transferState.fileContent, transferState.from, user.guests, user.name]);

  const to = useMemo(() => {
    if (transferState.fileContent) {
      return user.guests.find((guest) => guest.id === transferState.to)
        ?.name as string;
    } else {
      return user.name;
    }
  }, [transferState.fileContent, transferState.to, user.guests, user.name]);

  function onCloseModal() {
    dispatch(transferActions.resetTransferState());
    if (
      transferState.status !== 'denied' &&
      transferState.status !== 'completed'
    ) {
      socket?.emit('cancel-transferring', {
        from: transferState.from,
        to: transferState.to,
      });
      dispatch(transferActions.resetTransferState());
    }
  }

  function acceptTransfer() {
    socket?.emit('accept-transfer', {
      from: transferState.from,
      to: transferState.to,
    });
    dispatch(transferActions.setTransferStatus('transferring'));
  }

  useEffect(() => {
    if (
      transferState.status === 'completed' &&
      transferState.paths.length > 0 &&
      !transferState.fileContent
    ) {
      const save = document.createElement('a');
      const fileContent = transferState.paths?.join('') as string;
      save.href = fileContent;
      save.target = '_self';
      save.download = transferState.fileName as string;
      save.click();
      save.remove();
    }
  }, [
    transferState.fileContent,
    transferState.fileName,
    transferState.paths,
    transferState.status,
  ]);

  return (
    <div
      className={classnames(
        'fixed top-0 left-0 w-screen h-screen bg-gray-600 bg-opacity-80 flex justify-center items-center transition-all duration-300',
        {
          'opacity-0 invisible': !transferState.status,
        },
      )}
    >
      <div className="max-w-4xl w-full p-4">
        <div className="w-full shadow-md bg-white dark:bg-gray-800 rounded py-8 px-10 flex flex-col relative">
          <div className="flex justify-end absolute top-0 left-0 w-full p-6">
            <button className="cursor-pointer" onClick={onCloseModal}>
              <X />
            </button>
          </div>
          <div className="mb-2">
            <span className="font-bold">{t('app.modal.from')}: </span>
            <span className="capitalize">{from}</span>
          </div>
          <div className="mb-2">
            <span className="font-bold">{t('app.modal.to')}: </span>
            <span className="capitalize">{to}</span>
          </div>
          <div className="mb-2 overflow-hidden">
            <span className="font-bold">{t('app.modal.file-name')}: </span>
            <span className="overflow-ellipsis">{transferState.fileName}</span>
          </div>
          <div className="mb-4">
            <span className="font-bold">{t('app.modal.file-size')}: </span>
            <span className="capitalize">{transferState.fileSize}</span>
          </div>
          {(transferState.status === 'transferring' ||
            transferState.status === 'completed') && (
            <div className="mb-4">
              {Math.round(
                ((transferState.paths?.length || 0) /
                  (transferState.numberOfPaths || 1)) *
                  100,
              )}
              %
              <Line
                percent={Math.round(
                  ((transferState.paths?.length || 0) /
                    (transferState.numberOfPaths || 1)) *
                    100,
                )}
              />
            </div>
          )}
          <div className="flex justify-end">
            {transferState.fileContent && transferState.status === 'pending' && (
              <>
                <Button onClick={onCloseModal} className="mr-2" variant="error">
                  {t('app.modal.cancel')}
                </Button>
                <Button variant="info">{t('app.modal.pending')}</Button>
              </>
            )}
            {!transferState.fileContent && transferState.status === 'pending' && (
              <>
                <Button variant="error" className="mr-2" onClick={onCloseModal}>
                  {t('app.modal.deny')}
                </Button>
                <Button variant="success" onClick={acceptTransfer}>
                  {t('app.modal.accept')}
                </Button>
              </>
            )}
            {transferState.status === 'transferring' && (
              <>
                <Button onClick={onCloseModal} variant="error">
                  {t('app.modal.cancel')}
                </Button>
              </>
            )}
          </div>
          {transferState.status === 'canceled' && (
            <div className="flex justify-center">
              <Button variant="error">{t('app.modal.canceled')}</Button>
            </div>
          )}
          {transferState.status === 'completed' && (
            <div className="flex justify-center">
              <Button variant="success">{t('app.modal.completed')}</Button>
            </div>
          )}
          {transferState.status === 'denied' && (
            <div className="flex justify-center">
              <Button variant="error" onClick={onCloseModal}>
                {t('app.modal.denied')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
