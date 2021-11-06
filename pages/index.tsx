import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks/redux';
import { userActions } from '../app/store/slices/user.slice';
import Footer from '../components/Footer';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userActions.setUser());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Misadrop</title>
      </Head>
      <Footer />
    </>
  );
};

export default Home;
