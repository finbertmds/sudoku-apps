// useRewardedAdSafe.ts

import {Platform} from 'react-native';

export const useRewardedAdSafe =
  Platform.OS === 'web'
    ? require('./useRewardedAdSafe.web').useRewardedAdSafe
    : require('./useRewardedAdSafe.native').useRewardedAdSafe;
