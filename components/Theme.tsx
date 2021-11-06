import { FC, useEffect } from 'react';
import { useAppDispatch } from '../app/hooks/redux';
import { themeActions } from '../app/store/slices/theme.slice';

const Theme: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === null || darkMode === undefined) {
      localStorage.setItem('darkMode', 'false');
      dispatch(themeActions.setTheme({ darkMode: false }));
    } else if (darkMode === 'true') {
      dispatch(themeActions.setTheme({ darkMode: true }));
    } else if (darkMode === 'false') {
      dispatch(themeActions.setTheme({ darkMode: false }));
    }
  }, [dispatch]);

  return null;
};

export default Theme;
