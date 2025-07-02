import {SCREENS_CLASSIC} from '@/screensClassic';
import {SCREENS_KILLER} from '@/screensKiller';
import Constants from 'expo-constants';
import {Platform} from 'react-native';

const isExpo =
  Platform.OS === 'web' || Constants.expoConfig?.extra?.IS_EXPO_APP === true;
export const SCREENS = isExpo ? SCREENS_CLASSIC : SCREENS_KILLER;
