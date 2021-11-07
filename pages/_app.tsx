import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import { useInitSocket } from '../app/hooks/socket';
import { wrapper } from '../app/store';
import Background from '../components/Background';
import Header from '../components/Header';
import '../styles/global.css';

const Peer = dynamic(() => import('../components/Peer'), { ssr: false });
const Theme = dynamic(() => import('../components/Theme'), { ssr: false });

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  useInitSocket();

  return (
    <ThemeProvider attribute="class">
      <Peer />
      <Theme />
      <div className="flex flex-col w-full min-h-screen">
        <Header />
        <div className="w-full flex-grow flex">
          <Component {...pageProps} />
        </div>
        <ToastContainer
          position="top-center"
          limit={1}
          newestOnTop
          hideProgressBar
          draggable
          autoClose={2000}
        />
      </div>
      <Background />
    </ThemeProvider>
  );
};
export default wrapper.withRedux(MyApp);
