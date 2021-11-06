import { FC } from 'react';
import { useAppSelector } from '../app/hooks/redux';
import User from './User';

const Footer: FC = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <div className="w-full flex justify-center" style={{ height: '150px' }}>
      <User name={user.name} color={user.color} />
    </div>
  );
};

export default Footer;
