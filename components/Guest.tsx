import { FC } from 'react';
import { User as UserModal } from '../models/Room';
import User from './User';

interface GuestProps {
  user: UserModal;
}

const Guest: FC<GuestProps> = ({ user }) => {
  const { name, color, id } = user;

  function onClickGuest() {
    alert(`${name} clicked!`);
  }

  return <User name={name} color={color} onClick={onClickGuest} />;
};

export default Guest;
