import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import { wrapper } from '../app/store';
import Background from '../components/Background';
import Header from '../components/Header';
import '../styles/global.css';

const Theme = dynamic(() => import('../components/Theme'), { ssr: false });

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Theme />
      <Header />
      <Component {...pageProps} />
      <Background />
    </>
  );
};
export default wrapper.withRedux(MyApp);
