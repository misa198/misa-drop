import { FC } from 'react';
import { getRandomAnimal } from '../utils/animals';
import User from './User';

const Main: FC = () => {
  return (
    <div className="w-full flex-grow flex flex-wrap justify-center items-center max-w-6xl m-auto px-4">
      <User {...getRandomAnimal()} />
      <User {...getRandomAnimal()} />
      <User {...getRandomAnimal()} />
      <User {...getRandomAnimal()} />
    </div>
  );
};

export default Main;
