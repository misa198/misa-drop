import { NextPage } from 'next';
import Background from './components/Background';

const Home: NextPage = () => {
  return (
    <>
      <div className="w-screen min-h-screen"></div>
      <Background />
    </>
  );
};

export default Home;
