import classnames from 'classnames';
import dynamic from 'next/dynamic';
import { FC } from 'react';

const Animal = dynamic(() => import('react-animals'), { ssr: false });

interface UserProps {
  name: string;
  color: string;
  onClick?: () => any;
}

const User: FC<UserProps> = ({ name, color, onClick }) => {
  return (
    <div
      className="relative w-28 h-32"
      style={{
        animation: 'fadeIn 300ms',
      }}
    >
      <div className="w-full flex justify-center">
        <span
          className={classnames('', {
            'hover:scale-110 transform duration-200 cursor-pointer': onClick,
          })}
          onClick={onClick}
        >
          <Animal name={name} color={color} />
        </span>
      </div>
      <div className="absolute w-full mt-3 flex flex-col justify-center text-center font-bold capitalize text-gray-700 dark:text-white select-none">
        {name}
      </div>
    </div>
  );
};

export default User;
