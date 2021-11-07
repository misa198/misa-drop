import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../app/hooks/redux';
import { useSocket } from '../app/hooks/socket';
import { useTranslate } from '../app/hooks/translation';
import { userActions } from '../app/store/slices/user.slice';
import { fetchIpToken } from '../app/store/thunks/user.thunk';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import TransferModal from '../components/TransferModal';
import { Room, User } from '../models/Room';

const GuestsList = dynamic(() => import('../components/GuestsList'), {
  ssr: false,
});

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { t } = useTranslate();
  const socket = useSocket();

  useEffect(() => {
    dispatch(userActions.setUser());
    dispatch(fetchIpToken());
  }, [dispatch]);

  useEffect(() => {
    if (user.error) {
      toast.error(t('app.main.error-ip'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.error, user.token, socket]);

  useEffect(() => {
    if (user.token && socket) {
      const { name, color } = user;
      socket.emit('join-room', { name, color });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, user.token]);

  useEffect((): any => {
    const message = 'join-room-successfully';
    socket?.on(message, ({ room }: { room: Room }) => {
      dispatch(userActions.setGuests({ room, id: socket.id }));
    });

    return () => socket?.off(message);
  }, [dispatch, socket]);

  useEffect((): any => {
    const message = 'new-user-joined';
    socket?.on(message, (payload: { user: User }) => {
      dispatch(userActions.addGuest(payload.user));
    });

    return () => socket?.off(message);
  }, [dispatch, socket]);

  useEffect((): any => {
    const message = 'user-left';
    socket?.on(message, (payload: { id: string }) => {
      dispatch(userActions.removeGuest(payload.id));
    });

    return () => socket?.off(message);
  }, [dispatch, socket]);

  return (
    <>
      <Head>
        <title>Misadrop</title>
      </Head>
      <div className="flex flex-col flex-grow">
        <GuestsList guests={user.guests} />
        <Footer />
      </div>
      <Modal />
      <TransferModal />
    </>
  );
};

export default Home;
