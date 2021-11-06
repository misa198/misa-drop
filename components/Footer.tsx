import { FC } from 'react';
import { useAppSelector } from '../app/hooks/redux';
import User from './User';

const Footer: FC = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <div className="w-full absolute left-0 bottom-20 flex flex-col items-center">
      <User name={user.name} color={user.color} />
    </div>
  );
};

export default Footer;
