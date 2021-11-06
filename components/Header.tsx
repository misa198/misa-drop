import Image from 'next/image';
import { FC } from 'react';
import { Info, Moon, Sun } from 'react-feather';
import Tooltip from 'react-tooltip';
import { useAppDispatch, useAppSelector } from '../app/hooks/redux';
import { themeActions } from '../app/store/slices/theme.slice';
import logoLight from '../public/logo-light.svg';
import logo from '../public/logo.svg';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  function onChangeTheme() {
    dispatch(themeActions.setTheme({ darkMode: !darkMode }));
    localStorage.setItem('darkMode', JSON.stringify(!darkMode));
  }

  const navLinks = [
    {
      Icon: darkMode ? Sun : Moon,
      tooltip: 'Change mode',
      onClick: onChangeTheme,
    },
    {
      Icon: Info,
      tooltip: 'About us',
    },
  ];

  return (
    <header className="p-4 flex justify-between items-center">
      <Image
        src={darkMode ? logoLight : logo}
        width={153}
        height={50}
        alt="logo"
        className="pointer-events-none"
      />
      <div className="flex">
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
