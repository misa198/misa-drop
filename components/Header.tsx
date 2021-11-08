import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { Info, Moon, Sun } from 'react-feather';
import { useAppDispatch } from '../app/hooks/redux';
import { useTranslate } from '../app/hooks/translation';
import { layoutActions } from '../app/store/slices/layout.slice';
import logoLight from '../public/logo-light.svg';
import logo from '../public/logo.svg';

const Tooltip = dynamic(() => import('react-tooltip'), {
  ssr: false,
});

const Header: FC = () => {
  const { t, locale } = useTranslate();
  const router = useRouter();
  const { pathname, query, asPath } = router;
  const dispatch = useAppDispatch();
  const otherLocale = locale === 'en' ? 'vi' : 'en';
  const { theme, setTheme } = useTheme();

  function onSwitchModal() {
    dispatch(layoutActions.switchModal());
  }

  function onChangeTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  function onChangeLocale() {
    router.push({ pathname, query }, asPath, { locale: otherLocale });
  }

  const navLinks = [
    {
      Icon: theme === 'dark' ? Sun : Moon,
      tooltip:
        theme === 'dark'
          ? t('app.header.light-mode')
          : t('app.header.dark-mode'),
      onClick: onChangeTheme,
    },
    {
      Icon: Info,
      tooltip: t('app.header.about'),
      onClick: onSwitchModal,
    },
  ];

  return (
    <header className="p-4 flex justify-between items-center">
      <Image
        src={theme === 'dark' ? logoLight : logo}
        width={153}
        height={50}
        alt="logo"
        className="pointer-events-none"
      />
      <div className="flex">
        <button
          className="uppercase text-xl outline-none ml-5 cursor-pointer select-none"
          data-for={`nav-link-${otherLocale}`}
          data-tip
          onClick={onChangeLocale}
        >
          {otherLocale}
          <Tooltip id={`nav-link-${otherLocale}`} type="info" effect="solid">
            <span>{t(`app.header.${otherLocale}`)}</span>
          </Tooltip>
        </button>
        {navLinks.map(({ Icon, tooltip, onClick }, index) => (
          <button
            key={index}
            data-for={`nav-link-${index}`}
            data-tip
            className="outline-none ml-5 cursor-pointer"
            onClick={onClick}
          >
            <Icon />
            <Tooltip id={`nav-link-${index}`} type="info" effect="solid">
              <span>{tooltip}</span>
            </Tooltip>
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
