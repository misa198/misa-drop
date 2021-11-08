import { FC } from 'react';
import { usePeer } from '../app/hooks/peer';
import { useAppTheme } from '../app/hooks/theme';

const NoSSR: FC = ({ children }) => {
  usePeer();
  useAppTheme();

  return <>{children}</>;
};

export default NoSSR;
