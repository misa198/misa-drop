import classnames from 'classnames';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { GitHub, X } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../app/hooks/redux';
import { useTranslate } from '../app/hooks/translation';
import { layoutActions } from '../app/store/slices/layout.slice';
import logoLight from '../public/logo-light.svg';
import logo from '../public/logo.svg';

const Tooltip = dynamic(() => import('react-tooltip'), {
  ssr: false,
});

const Modal: FC = () => {
  const { t } = useTranslate();
  const isOpened = useAppSelector((state) => state.layout.isModalOpened);
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  function onSwitchModal() {
    dispatch(layoutActions.switchModal());
  }

  return (
    <div
      className={classnames(
        'fixed top-0 left-0 w-screen h-screen bg-gray-600 bg-opacity-80 flex justify-center items-center transition-all duration-300',
        {
          'opacity-0 invisible': !isOpened,
        },
      )}
    >
      <div className="max-w-4xl w-full p-4">
        <div className="w-full shadow-md bg-white dark:bg-gray-800 rounded py-4 px-10 flex flex-col relative">
          <div className="flex justify-end absolute top-0 left-0 w-full p-4">
            <button className="cursor-pointer" onClick={onSwitchModal}>
              <X />
            </button>
          </div>
          <div className="flex justify-center mb-8">
            <Image
              src={theme === 'dark' ? logoLight : logo}
              width={230}
              height={75}
              alt="logo"
              className="pointer-events-none"
            />
          </div>
          <h2 className="font-bold mb-2">{t('app.modal.description-title')}</h2>
          <p className="mb-8">{t('app.modal.description')}</p>
          <h2 className="font-bold mb-2">{t('app.modal.security-title')}</h2>
          <p className="mb-8">{t('app.modal.security')}</p>
          <div className="flex justify-center mb-3">
            <Link href="https://github.com/misa198/misadrop" passHref>
              <a target="_blank" data-for="github-link" data-tip>
                <GitHub size={30} />
              </a>
            </Link>
            <Tooltip id="github-link" type="info" effect="solid">
              <span>Github</span>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
