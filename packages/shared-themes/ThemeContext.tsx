// ThemeContext.tsx

import type {
  ThemeContextValue,
  ThemeMode,
  ThemeType,
} from '@sudoku/shared-themes/types';
import React, {createContext, useContext, useMemo, useState} from 'react';
import {Appearance} from 'react-native';

const ThemeContext = createContext<ThemeContextValue>({
  theme: {},
  mode: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

/**
 * App sẽ truyền lightTheme và darkTheme từ phía app riêng.
 */
export const ThemeProvider: React.FC<{
  children: React.ReactNode;
  lightTheme: ThemeType;
  darkTheme: ThemeType;
  setRootMode?: (mode: 'light' | 'dark') => void;
}> = ({children, lightTheme, darkTheme, setRootMode}) => {
  const colorScheme = Appearance.getColorScheme() as ThemeMode;
  const [mode, setMode] = useState<'light' | 'dark'>(
    colorScheme === 'dark' ? 'dark' : 'light',
  );

  const theme = useMemo(
    () => (mode === 'dark' ? darkTheme : lightTheme),
    [mode, darkTheme, lightTheme],
  );

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    if (setRootMode) {
      setRootMode(newMode);
    }
  };

  return (
    <ThemeContext.Provider value={{theme, mode, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
