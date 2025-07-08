// components.ts

import {RouteProp} from '@react-navigation/native';
import {AppEnv} from '@sudoku/shared-types/apps';
import {AD_TYPE} from '@sudoku/shared-utils';
import {ImageSourcePropType} from 'react-native';

export type RootStackParamList = {
  HomeTabs: undefined;
  Board: BoardParamProps;
  Options: undefined;
  Settings: SettingsParamProps;
  HowToPlay: undefined;
  AboutGame: undefined;
  Licenses: undefined;
  SkWebView: SkWebViewParamProps;
  Players: undefined;
};

export type BoardScreenRouteProp = RouteProp<RootStackParamList, 'Board'>;
export type SettingsScreenRouteProp = RouteProp<RootStackParamList, 'Settings'>;
export type SkWebViewScreenRouteProp = RouteProp<
  RootStackParamList,
  'SkWebView'
>;

export type BoardParamProps = {
  id: string;
  level: string;
  type: 'init' | 'saved';
};

/**
 * @description: showAdvancedSettings: '0' | '1'
 * 0: false, 1: true
 */
export type SettingsParamProps = {
  showAdvancedSettings?: '0' | '1';
};

export type SkWebViewParamProps = {
  title: string;
  type: SkWebViewType;
  needPadding?: string;
};

export type SkWebViewType = 'licenses' | 'privacy' | 'terms';

export type OptionMenuItem = {
  icon: string;
  label: string;
  screen?: string;
  onPress?: () => void;
};

export type StatsTab = {
  key: string;
  label: string;
  testID: string;
};

export type LeaderboardTab = {
  key: string;
  label: string;
  testID: string;
};

export type TimeFilter = 'all' | 'today' | 'week' | 'month' | 'year';

export type DailyBackgrounds = {
  light: UnsplashImageData | null;
  dark: UnsplashImageData | null;
  date?: string;
};

export type DailyQuotes = {
  q: string;
  a: string;
  h: string;
  date?: string;
};

export type ActionButtonProps = {
  id: string;
  label: string;
  icon: string[];
  iconChangeFlag?: boolean;
  showBadge?: boolean;
  badgeCount?: number;
  onPress?: () => void;
};

export type UnsplashImageData = {
  url: string | null;
  photographerName: string | null;
  photographerLink: string | null;
};

export type TutorialImage = {
  light: ImageSourcePropType;
  dark: ImageSourcePropType;
};

export type TutorialImageMap = Record<string, TutorialImage>;

export type TutorialSlideItem = {
  key: string;
  image: ImageSourcePropType;
  text: string;
};

export type AdType = (typeof AD_TYPE)[keyof typeof AD_TYPE];

export type GetAdUnit = (type: AdType, env: AppEnv | undefined) => string;

export type NativeAdSafeProps = {
  env: AppEnv;
};
