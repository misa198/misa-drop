import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../app/hooks/redux';
import { useTranslate } from '../app/hooks/translation';
import { userActions } from '../app/store/slices/user.slice';
import { fetchIpToken } from '../app/store/thunks/user.thunk';
import Footer from '../components/Footer';
import GuestsList from '../components/GuestsList';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { t } = useTranslate();

  useEffect(() => {
    dispatch(userActions.setUser());
    dispatch(fetchIpToken());
  }, [dispatch]);

  useEffect(() => {
    if (user.error) {
      toast.error(t('app.main.error-ip'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.error]);

  return (
    <>
      <Head>
        <title>Misadrop</title>
      </Head>
      <div className="flex flex-col flex-grow">
        <GuestsList />
        <Footer />
      </div>
    </>
  );
};

export default Home;
