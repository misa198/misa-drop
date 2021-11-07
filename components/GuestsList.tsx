import { FC } from 'react';
import { User as UserModel } from '../models/Room';
import User from './User';

interface GuestsListProps {
  guests: UserModel[];
}

const GuestsList: FC<GuestsListProps> = ({ guests }) => {
  return (
    <div className="w-full flex-grow flex flex-wrap justify-center items-center max-w-6xl m-auto px-4">
      {guests.map((guest) => (
        <User key={guest.id} name={guest.name} color={guest.color} />
      ))}
    </div>
  );
};

export default GuestsList;
