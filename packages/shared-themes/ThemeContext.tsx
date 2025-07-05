// ThemeContext.tsx

import React, {createContext, useContext, useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';

export type ThemeType = Record<string, any>;

type ThemeContextType = {
  theme: ThemeType;
  mode: 'light' | 'dark';
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: {},
  mode: 'light',
  toggleTheme: () => {},
});

type ThemeProviderProps = {
  children: React.ReactNode;
  lightTheme: ThemeType;
  darkTheme: ThemeType;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  lightTheme,
  darkTheme,
}) => {
  const systemColorScheme = useColorScheme();
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (systemColorScheme) {
      setMode(systemColorScheme as 'light' | 'dark');
    }
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{theme, mode, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
