// types.ts

export type ThemeMode = 'light' | 'dark';

export type ThemeType = {
  [key: string]: any;
};

export interface ThemeContextValue {
  theme: ThemeType;
  mode: ThemeMode;
  toggleTheme: () => void;
}
