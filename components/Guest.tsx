import prettyBytes from 'pretty-bytes';
import { FC, useRef } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../app/hooks/redux';
import { useSocket } from '../app/hooks/socket';
import { useTranslate } from '../app/hooks/translation';
import { transferActions } from '../app/store/slices/transfer.slice';
import { CHUNK_LENGTH } from '../constants/file';
import { User as UserModal } from '../models/Room';
import User from './User';

interface GuestProps {
  user: UserModal;
}

const Guest: FC<GuestProps> = ({ user }) => {
  const { name, color, id } = user;
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslate();
  const socket = useSocket();
  const dispatch = useAppDispatch();

  function onClickGuest() {
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
      inputFileRef.current.click();
    }
  }

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (result) {
          const _result = result.toString();
          dispatch(transferActions.setFileContent(_result));
          const payload = {
            from: socket?.id as string,
            to: id,
            fileName: file.name,
            fileSize: prettyBytes(file.size),
            numberOfPaths: Math.ceil(_result.length / CHUNK_LENGTH),
          };
          socket?.emit('request-send-data', payload);
          dispatch(transferActions.setNewRequest(payload));
        } else {
          toast.error(t('app.main.error-file'));
        }
      };
    }
  }

  return (
    <>
      <User name={name} color={color} onClick={onClickGuest} />
      <input
        ref={inputFileRef}
        type="file"
        className="hidden"
        onChange={onFileChange}
      />
    </>
  );
};

export default Guest;
