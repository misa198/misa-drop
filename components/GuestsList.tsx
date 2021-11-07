import { FC } from 'react';
import { useTranslate } from '../app/hooks/translation';
import { User as UserModel } from '../models/Room';
import User from './User';

interface GuestsListProps {
  guests: UserModel[];
}

const GuestsList: FC<GuestsListProps> = ({ guests }) => {
  const { t } = useTranslate();

  return (
    <div className="w-full flex-grow flex flex-wrap justify-center items-center max-w-6xl m-auto px-4 transition-all duration-300">
      {guests.length > 0 ? (
        <>
          {guests.map((guest) => (
            <User key={guest.id} name={guest.name} color={guest.color} />
          ))}
        </>
      ) : (
        <h2
          className="text-xl font-medium"
          style={{
            animation: 'fadeIn 300ms',
          }}
        >
          {t('app.main.no-peer')}
        </h2>
      )}
    </div>
  );
};

export default GuestsList;
