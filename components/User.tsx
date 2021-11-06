import dynamic from 'next/dynamic';
import { FC } from 'react';

const Animal = dynamic(() => import('react-animals'), { ssr: false });

interface UserProps {
  name: string;
  color: string;
}

const User: FC<UserProps> = ({ name, color }) => {
  return (
    <div className="relative w-28 h-32">
      <div className="pointer-events-none w-full flex justify-center">
        <Animal name={name} color={color} />
      </div>
      <div className="absolute w-full mt-3 flex flex-col justify-center text-center font-bold capitalize text-gray-700 dark:text-white">
        {name}
      </div>
    </div>
  );
};

export default User;
