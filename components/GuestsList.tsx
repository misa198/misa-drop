import { FC } from 'react';
import { useTranslate } from '../app/hooks/translation';
import { User as UserModel } from '../models/Room';
import Guest from './Guest';

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
            <Guest key={guest.id} user={guest} />
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
