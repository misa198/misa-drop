import { useTheme } from 'next-themes';
import { FC, useEffect } from 'react';

const Theme: FC = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === null || darkMode === undefined) {
      localStorage.setItem('darkMode', 'true');
      setTheme('dark');
    } else if (darkMode === 'true') {
      setTheme('dark');
    } else if (darkMode === 'false') {
      setTheme('light');
    }
  }, [setTheme]);

  useEffect(() => {
    localStorage.setItem('darkMode', theme === 'dark' ? 'true' : 'false');
  }, [theme]);

  return null;
};

export default Theme;
