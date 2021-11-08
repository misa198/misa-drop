import { FC } from 'react';
import { useAppSelector } from '../app/hooks/redux';
import User from './User';
import styles from './Footer.module.css';

const Footer: FC = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <div className={`w-full flex justify-center ${styles.footer}`}>
      <User name={user.name} color={user.color} />
    </div>
  );
};

export default Footer;
