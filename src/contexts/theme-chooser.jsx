import { THEME_TYPE, lightTheme } from '../constants/theme';
import { createContext, useContext, useMemo } from 'react';

import { useThemeToggle } from '../hooks/useThemeToggle';

export const ThemeChooser = createContext({
  theme: THEME_TYPE.light,
  themeConfig: lightTheme,
  toggle: () => {},
});

export const ThemeChooserProvider = ({ children }) => {
  const { theme, themeConfig, toggle } = useThemeToggle();

  const values = useMemo(
    () => ({
      theme,
      themeConfig,
      toggle,
    }),
    [theme, themeConfig, toggle],
  );

  return <ThemeChooser.Provider value={values}>{children}</ThemeChooser.Provider>;
};

export const useThemeChooser = () => {
  const value = useContext(ThemeChooser);
  if (value === null) {
    throw new Error('ThemeChooser Context is missing');
  }
  return value;
};
