// types.ts

export type ThemeMode = 'light' | 'dark';

export type ThemeType = {
  primary: string;
  onPrimary: string;
  background: string;
  backgroundSecondary: string;
  surface: string;
  onSurface: string;
  secondary: string;
  onSecondary: string;
  error: string;
  onError: string;
  success: string;
  danger: string;
  text: string;
  divider: string;
  iconColor: string;
  buttonBackground: string;
  buttonText: string;
  buttonBorder: string;
  cell: string;
  selectedOverlayColor: string;
  sameValueOverlayColor: string;
  conflictOverlayColor: string;
  sameRowOrColumnOverlayColor: string;
  overlayColor: string;
  cellBorderColor: string;
  settingItemBackground: string;
  buttonBlue: string;
  selectedItemBackground: string;
  itemBorderColor: string;
  modalBg: string;
  inputBorder: string;
  placeholder: string;
  cancelButtonBg: string;
  selectedCardBg: string;
  card: string;
  howToPlayBg: string;
  cardBackground: string;
  cardText: string;
  cardSubtitle: string;
  cardCard: string;
  cardBorder: string;
  cardIcon: string;
};

export interface ThemeContextValue {
  theme: ThemeType;
  mode: ThemeMode;
  toggleTheme: () => void;
}
